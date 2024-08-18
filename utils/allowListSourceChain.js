
async function _allowListSourceChain(Contarct, _sourceChainSelector) {
    const txResponse = await Contarct.allowlistSourceChain(_sourceChainSelector, true)
    const txReceipt = await txResponse.wait();
    console.log("Approved Source Chain on Receiver contract...")

}

module.exports = { _allowListSourceChain }