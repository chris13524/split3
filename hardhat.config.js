require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.4",
    networks: {
        mumbai: {
            url: "https://rpc.valist.io/mumbai",
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
