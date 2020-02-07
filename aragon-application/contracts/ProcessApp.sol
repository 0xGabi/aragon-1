pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract ProcessApp is AragonApp {
    // Events
    event Created(address owner, address appAddress,address appImplementationAddress, string eventName, string url);
    event Desactivated(address owner, uint256 index);

    struct Process {
        uint256 createdAt;
        address owner;
        address appAddress;
        address appImplementationAddress;
        string eventName;
        string url;
        bool active;
    }

    // State
    Process[] process;

    /// ACL
    bytes32 public constant PUBLISH_ROLE = keccak256("PUBLISH_ROLE");
    bytes32 public constant DESACTIVATE_ROLE = keccak256("DESACTIVATE_ROLE");

    function initialize() public onlyInit {
        initialized();
    }

    /**
     * @notice Create a process on the MESG Network
     */
    function create(address appAddress,address appImplementationAddress, string eventName, string url) external auth(PUBLISH_ROLE) {
        process.push(
            Process({createdAt: block.timestamp, owner: msg.sender, appAddress: appAddress, appImplementationAddress: appImplementationAddress, eventName: eventName, url: url, active: true}));
        emit Created(msg.sender, appAddress, appImplementationAddress, eventName, url);
    }

    /**
     * @notice Desactivate a process
     */
    function desactivate(uint256 index) external auth(DESACTIVATE_ROLE) {
        process[index].active = false;
        emit Desactivated(msg.sender, index);
    }

    function getProcess(uint256 index)
        public
        view
        returns (uint256 createdAt, address owner, address appAddress, string eventName, string url, bool active)
    {
        return (
            process[index].createdAt,
            process[index].owner,
            process[index].appAddress,
            process[index].eventName,
            process[index].url,
            process[index].active
        );
    }

    function size() public view returns (uint256) {
        return process.length;
    }

}
