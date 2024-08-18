async function _allowListSender(Contract, _spender) {
    const txResponse = await Contract.allowlistSender(_spender, true)
    await txResponse.wait(1)
}

module.exports = { _allowListSender }