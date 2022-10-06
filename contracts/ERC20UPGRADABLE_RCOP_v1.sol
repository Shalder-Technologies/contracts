// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract RCOPv1 is Initializable, OwnableUpgradeable, ERC20Upgradeable, ERC20BurnableUpgradeable, UUPSUpgradeable {

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint _amount) initializer public {
        __ERC20_init( "RCOP", "RCOP");
        __ERC20Burnable_init();
        __UUPSUpgradeable_init();
        __Ownable_init();
        _mint(msg.sender, _amount * 10 ** decimals());
    }


    function mint(address to, uint256 _amount) public onlyOwner {
        _mint(to, _amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}






//owner = msg.sender (0X00000000000)