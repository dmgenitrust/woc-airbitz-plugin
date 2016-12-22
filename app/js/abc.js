window.Airbitz = {
    core: {
        writeData: function(key, val){ localStorage.setItem(key, val) },
        readData: function(key){ return localStorage.getItem(key) },
        getSelectedWallet: getSelectedWallet,
        createReceiveRequest: createReceiveRequest
    }
}

function createReceiveRequest(wallet, post){
    post.success({address:"1BYHX3gzBtmHcVQk3r6Ldu7afzi1tRUX5R"});
    return;
}

function getSelectedWallet(cb){
    var walletObj = {
        id: "abc123",
        name: "My Wallet",
        currency: "USD",
        currencyCode: "1",
        balance: "0"
    }
    cb(walletObj);
    return;
}
