pragma solidity ^0.5.0;

contract MESGProcess {
    event Created(uint256 index, address owner, string definition);
    event Destroyed(uint256 index, string definition);

    mapping(uint256 => address) private _processOwner;
    mapping(uint256 => string) private _definitions;

    function create(uint256 index, string memory definition) public {
        require(_processOwner[index] == address(0), "process already exists");
        _processOwner[index] = msg.sender;
        _definitions[index] = definition;
        emit Created(index, msg.sender, definition);
    }

    function destroy(uint256 index) public {
        require(
            _processOwner[index] != address(0),
            "process doesn't exists or already destroyed"
        );
        require(
            _processOwner[index] == msg.sender,
            "unauthorized, you are not the owner"
        );
        _processOwner[index] = address(0);
        emit Destroyed(index, _definitions[index]);
    }
}
