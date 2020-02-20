pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "./IMesgDeployer.sol";

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

    IMesgDeployer mesgDeployer = 0xTO_CHANGE;

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
        address appImplementationAddress,
        string ipfsHash,
        string eventName,
        string url
    ) external auth(PUBLISH_ROLE) {
        IMesgDeployer(mesgDeployer).create(keccak256(appAddress, ipfsHash), ipfsHash);
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
        IMesgDeployer(mesgDeployer).destroy(keccak256(process[index].appAddress, process[index].ipfsHash));
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
