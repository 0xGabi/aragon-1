pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract ProcessApp is AragonApp {
    event MESGProcessCreate(string ipfsHash);
    event MESGProcessDelete(string ipfsHash);
    // Events
    event Created(
        address appAddress,
        string ipfsHash,
        string eventName,
        string url
    );
    event Desactivated(uint256 index);

    struct Process {
        uint256 createdAt;
        address appAddress;
        string ipfsHash;
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
    function create(
        address appAddress,
        string ipfsHash,
        string eventName,
        string url
    ) external isInitialized auth(PUBLISH_ROLE) {
        process.push(
            Process({
                createdAt: block.timestamp,
                appAddress: appAddress,
                ipfsHash: ipfsHash,
                eventName: eventName,
                url: url,
                active: true
            })
        );
        emit MESGProcessCreate(ipfsHash);
        emit Created(
            appAddress,
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
        emit MESGProcessDelete(process[index].ipfsHash);
        emit Desactivated(index);
    }

    function getProcess(uint256 index)
        public
        view
        returns (
            uint256 createdAt,
            address appAddress,
            string ipfsHash,
            string eventName,
            string url,
            bool active
        )
    {
        return (
            process[index].createdAt,
            process[index].appAddress,
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
