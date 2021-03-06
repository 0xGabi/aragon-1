pragma solidity 0.4.24;

import "@aragon/templates-shared/contracts/TokenCache.sol";
import "@aragon/templates-shared/contracts/BaseTemplate.sol";

import "./ProcessApp.sol";


contract Template is BaseTemplate, TokenCache {
    string private constant ERROR_EMPTY_HOLDERS = "TEMPLATE_EMPTY_HOLDERS";
    string private constant ERROR_BAD_HOLDERS_STAKES_LEN = "TEMPLATE_BAD_HOLDERS_STAKES_LEN";
    string private constant ERROR_BAD_VOTE_SETTINGS = "TEMPLATE_BAD_VOTE_SETTINGS";

    address private constant ANY_ENTITY = address(-1);
    bool private constant TOKEN_TRANSFERABLE = true;
    uint8 private constant TOKEN_DECIMALS = uint8(18);
    uint256 private constant TOKEN_MAX_PER_ACCOUNT = uint256(0);

    constructor(DAOFactory _daoFactory, ENS _ens, MiniMeTokenFactory _miniMeFactory, IFIFSResolvingRegistrar _aragonID)
        public
        BaseTemplate(_daoFactory, _ens, _miniMeFactory, _aragonID)
    {
        _ensureAragonIdIsValid(_aragonID);
        _ensureMiniMeFactoryIsValid(_miniMeFactory);
    }

    /**
    * @dev Create a new MiniMe token and deploy a Template DAO.
    * @param _tokenName String with the name for the token used by share holders in the organization
    * @param _tokenSymbol String with the symbol for the token used by share holders in the organization
    * @param _holders Array of token holder addresses
    * @param _stakes Array of token stakes for holders (token has 18 decimals, multiply token amount `* 10^18`)
    * @param _votingSettings Array of [supportRequired, minAcceptanceQuorum, voteDuration] to set up the voting app of the organization
    */
    function newTokenAndInstance(string _tokenName, string _tokenSymbol, address[] _holders, uint256[] _stakes, uint64[3] _votingSettings) external {
        newToken(_tokenName, _tokenSymbol);
        newInstance(_holders, _stakes, _votingSettings);
    }

    /**
    * @dev Create a new MiniMe token and cache it for the user
    * @param _name String with the name for the token used by share holders in the organization
    * @param _symbol String with the symbol for the token used by share holders in the organization
    */
    function newToken(string memory _name, string memory _symbol) public returns (MiniMeToken) {
        MiniMeToken token = _createToken(_name, _symbol, TOKEN_DECIMALS);
        _cacheToken(token, msg.sender);
        return token;
    }

    /**
    * @dev Deploy a Template DAO using a previously cached MiniMe token
    * @param _holders Array of token holder addresses
    * @param _stakes Array of token stakes for holders (token has 18 decimals, multiply token amount `* 10^18`)
    * @param _votingSettings Array of [supportRequired, minAcceptanceQuorum, voteDuration] to set up the voting app of the organization
    */
    function newInstance(address[] memory _holders, uint256[] memory _stakes, uint64[3] memory _votingSettings) public {
        _ensureTemplateSettings(_holders, _stakes, _votingSettings);

        (Kernel dao, ACL acl) = _createDAO();
        Voting voting = _setupBaseApps(dao, acl, _holders, _stakes, _votingSettings);
        // Setup mesg app
        _setupCustomApp(dao, acl, voting);
        _transferRootPermissionsFromTemplateAndFinalizeDAO(dao, voting);
    }

    function _setupBaseApps(Kernel _dao, ACL _acl, address[] memory _holders, uint256[] memory _stakes, uint64[3] memory _votingSettings)
        internal
        returns (Voting)
    {
        MiniMeToken token = _popTokenCache(msg.sender);
        TokenManager tokenManager = _installTokenManagerApp(_dao, token, TOKEN_TRANSFERABLE, TOKEN_MAX_PER_ACCOUNT);
        Voting voting = _installVotingApp(_dao, token, _votingSettings);

        _mintTokens(_acl, tokenManager, _holders, _stakes);
        _setupBasePermissions(_acl, voting, tokenManager);

        return (voting);
    }

    function _setupBasePermissions(ACL _acl, Voting _voting, TokenManager _tokenManager) internal {
        _createEvmScriptsRegistryPermissions(_acl, _voting, _voting);
        _createVotingPermissions(_acl, _voting, _voting, _tokenManager, _voting);
        _createTokenManagerPermissions(_acl, _tokenManager, _voting, _voting);
    }

    // Next we install and create permissions for the mesg app
    //--------------------------------------------------------------//
    function _setupCustomApp(Kernel _dao, ACL _acl, Voting _voting) internal {
        ProcessApp app = _installProcessApp(_dao);
        _createProcessAppPermissions(_acl, app, _voting, _voting);
    }

    function _installProcessApp(Kernel _dao) internal returns (ProcessApp) {
        bytes32 _appId = keccak256(abi.encodePacked(apmNamehash("open"), keccak256("mesg")));
        bytes memory initializeData = abi.encodeWithSelector(ProcessApp(0).initialize.selector);
        return ProcessApp(_installDefaultApp(_dao, _appId, initializeData));
    }

    function _createProcessAppPermissions(ACL _acl, ProcessApp _app, address _grantee, address _manager) internal {
        _acl.createPermission(_grantee, _app, _app.PUBLISH_ROLE(), _manager);
        _acl.createPermission(_grantee, _app, _app.DEACTIVATE_ROLE(), _manager);
    }

    //--------------------------------------------------------------//

    function _ensureTemplateSettings(address[] memory _holders, uint256[] memory _stakes, uint64[3] memory _votingSettings) private pure {
        require(_holders.length > 0, ERROR_EMPTY_HOLDERS);
        require(_holders.length == _stakes.length, ERROR_BAD_HOLDERS_STAKES_LEN);
        require(_votingSettings.length == 3, ERROR_BAD_VOTE_SETTINGS);
    }
}
