const { ethers, deployments } = require("hardhat");
const { verify } = require("../utils/verify");
const { _allowListSourceChain } = require("../utils/allowListSourceChain");
const { _allowListSender } = require("../utils/allowListSender");
const { deployContract } = require("@nomicfoundation/hardhat-ethers/types");

module.exports = async function () {
    const [signer] = await ethers.getSigners();

    const ccipRouterAddress = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"
    const cometAddress = "0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e"
    const sourceChainSelector = "14767482510784806043"
    const TransferUSDCAddress = "0x3AA082885fe02F66375f3464965Fd545acD990B2"

    const swapTestnetUSDCDeployments = await deployments.get("SwapTestnetUSDC")
    const swapTestnetUSDC = await ethers.getContractAt(
        swapTestnetUSDCDeployments.abi,
        swapTestnetUSDCDeployments.address,
        signer
    )

    const _args = [ccipRouterAddress, cometAddress, swapTestnetUSDC.target]

    const crossChainReceiverDeployment = await deployments.deploy("CrossChainReceiver", {
        from: signer.address,
        log: true,
        args: _args
    })

    const crossChainReceiver = await ethers.getContractAt(crossChainReceiverDeployment.abi, crossChainReceiverDeployment.address, signer)



    // await verify(crossChainReceiver.address, _args)

    await _allowListSourceChain(crossChainReceiver, sourceChainSelector)
    await _allowListSender(crossChainReceiver, TransferUSDCAddress)
}

module.exports.tags = ["all", "sepolia"]