const { ethers, deployments } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async function () {
    const [signer] = await ethers.getSigners()

    const usdcToken = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
    const compoundUSDCToken = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
    const fauceteer = "0x68793eA49297eB75DFB4610B68e076D2A5c7646C"

    const _args = [usdcToken, compoundUSDCToken, fauceteer]

    const swapTestnetUSDC = await deployments.deploy("SwapTestnetUSDC", {
        from: signer.address,
        log: true,
        args: _args
    })

    // verify(swapTestnetUSDC.address, _args)
}

module.exports.tags = ["all", "sepolia"]