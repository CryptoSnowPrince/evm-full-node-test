import Web3 from 'web3'
import dotenv from 'dotenv'
dotenv.config()

export const web3Wss = new Web3(new Web3.providers.WebsocketProvider(process.env.WSS))
export const web3Https = new Web3(new Web3.providers.HttpProvider(process.env.HTTPS))

var subscription = web3Wss.eth.subscribe('newBlockHeaders', function(error, result){
    console.log("result", result);

    console.log("error", error);
})
.on("connected", function(subscriptionId){
    console.log("subscriptionId", subscriptionId);
})
.on("data", function(blockHeader){
    console.log("blockHeader", blockHeader);
})
.on("error", console.error);

// unsubscribes the subscription
subscription.unsubscribe(function(error, success){
    if(success)
        console.log('Successfully unsubscribed!');
});

const balance = await web3Https.eth.getBalance("0x4A30AC460b0128F78066a5c9844EbCDCC884232f")

console.log("web3Https: ", balance)