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
        string serviceName,
        string data
    );
    event Deactivated(uint256 index);

    struct Process {
        uint256 createdAt;
        address appAddress;
        string ipfsHash;
        string eventName;
        string serviceName;
        string data;
        bool active;
    }

    // State
    Process[] process;

    /// ACL
    bytes32 public constant PUBLISH_ROLE = keccak256("PUBLISH_ROLE");
    bytes32 public constant DEACTIVATE_ROLE = keccak256("DEACTIVATE_ROLE");

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
        string serviceName,
        string data
    ) external isInitialized auth(PUBLISH_ROLE) {
        process.push(
            Process({
                createdAt: block.timestamp,
                appAddress: appAddress,
                ipfsHash: ipfsHash,
                eventName: eventName,
                serviceName: serviceName,
                data: data,
                active: true
            })
        );
        emit MESGProcessCreate(ipfsHash);
        emit Created(
            appAddress,
            ipfsHash,
            eventName,
            serviceName,
            data
        );
    }

    /**
     * @notice Desactivate a process
     */
    function deacivate(uint256 index) external auth(DEACTIVATE_ROLE) {
        process[index].active = false;
        emit MESGProcessDelete(process[index].ipfsHash);
        emit Deactivated(index);
    }

    function getProcess(uint256 index)
        public
        view
        returns (
            uint256 createdAt,
            address appAddress,
            string ipfsHash,
            string eventName,
            string serviceName,
            string data,
            bool active
        )
    {
        return (
            process[index].createdAt,
            process[index].appAddress,
            process[index].ipfsHash,
            process[index].eventName,
            process[index].serviceName,
            process[index].data,
            process[index].active
        );
    }

    function size() public view returns (uint256) {
        return process.length;
    }

}
