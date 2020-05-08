pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract ProcessApp is AragonApp {
    event MESGProcessCreate(string processUrl, address projectName);
    event MESGProcessDelete(string processUrl, address projectName);
    // Events
    event Created(
        address appAddress,
        string processUrl,
        string eventName,
        string serviceName,
        string data
    );
    event Deactivated(uint256 index);

    struct Process {
        uint256 createdAt;
        address appAddress;
        string processUrl;
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
        string processUrl,
        string eventName,
        string serviceName,
        string data,
        address projectName
    ) external isInitialized auth(PUBLISH_ROLE) {
        process.push(
            Process({
                createdAt: block.timestamp,
                appAddress: appAddress,
                processUrl: processUrl,
                eventName: eventName,
                serviceName: serviceName,
                data: data,
                active: true
            })
        );
        emit MESGProcessCreate(processUrl, projectName);
        emit Created(
            appAddress,
            processUrl,
            eventName,
            serviceName,
            data
        );
    }

    /**
     * @notice Deactivate a process
     */
    function deactivate(uint256 index, address projectName) external auth(DEACTIVATE_ROLE) {
        process[index].active = false;
        emit MESGProcessDelete(process[index].processUrl, projectName);
        emit Deactivated(index);
    }

    function getProcess(uint256 index)
        public
        view
        returns (
            uint256 createdAt,
            address appAddress,
            string processUrl,
            string eventName,
            string serviceName,
            string data,
            bool active
        )
    {
        return (
            process[index].createdAt,
            process[index].appAddress,
            process[index].processUrl,
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
