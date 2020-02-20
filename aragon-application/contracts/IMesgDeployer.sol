pragma solidity ^0.5.0;

contract IMESGProcess {
    function create(uint256 index, string definition) public;
    function destroy(uint256 index) public;
}
