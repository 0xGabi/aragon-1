pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract MESGProcess {
    event Created(uint256 index, address owner, string definition);
    event Destroyed(uint256 index, string definition);

    function create(uint256 index, string memory definition) public;
    function destroy(uint256 index) public;
}

contract ProcessApp is AragonApp {
    // Events
    event Created(
        address appAddress,
        address appImplementationAddress,
        string ipfsHash,
        string eventName,
        string url
    );
    event Desactivated(uint256 index);

    struct Process {
        uint256 createdAt;
        address appAddress;
        address appImplementationAddress;
        string ipfsHash;
        string eventName;
        string url;
        bool active;
    }

    // State
    Process[] process;

    IMESGProcess processDeployer;

    /// ACL
    bytes32 public constant PUBLISH_ROLE = keccak256("PUBLISH_ROLE");
    bytes32 public constant DESACTIVATE_ROLE = keccak256("DESACTIVATE_ROLE");

    function initialize() public onlyInit {
        initialized();
        processDeployer = IMESGProcess(0xCfEB869F69431e42cdB54A4F4f105C19C080A601)
    }

    /**
     * @notice Create a process on the MESG Network
     */
    function create(
        address appAddress,
        address appImplementationAddress,
        string ipfsHash,
        string eventName,
        string url
    ) external isInitialized auth(PUBLISH_ROLE) {
        processDeployer.create(0, ipfsHash);
        process.push(
            Process({
                createdAt: block.timestamp,
                appAddress: appAddress,
                appImplementationAddress: appImplementationAddress,
                ipfsHash: ipfsHash,
                eventName: eventName,
                url: url,
                active: true
            })
        );
        emit Created(
            appAddress,
            appImplementationAddress,
            ipfsHash,
            eventName,
            url
        );
    }

    /**
     * @notice Desactivate a process
     */
    function desactivate(uint256 index) external auth(DESACTIVATE_ROLE) {
        process[index].active = false;
        MESGProcess(0xCfEB869F69431e42cdB54A4F4f105C19C080A601).destroy(0, process[index].ipfsHash);
        emit Desactivated(index);
    }

    function getProcess(uint256 index)
        public
        view
        returns (
            uint256 createdAt,
            address appAddress,
            address appImplementationAddress,
            string ipfsHash,
            string eventName,
            string url,
            bool active
        )
    {
        return (
            process[index].createdAt,
            process[index].appAddress,
            process[index].appImplementationAddress,
            process[index].ipfsHash,
            process[index].eventName,
            process[index].url,
            process[index].active
        );
    }

    function size() public view returns (uint256) {
        return process.length;
    }

}
