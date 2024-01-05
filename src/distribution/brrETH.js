require("dotenv").config();

const { encodeFunctionData, encodePacked } = require("viem");
const client = require("../viem");
const { BRR } = require("../constants");
const brrETHAirdropAmounts = require("../data/airdropAmounts/brrETH.json");
const erc20Abi = require("../abi/erc20.json");

const distributeBrrETHAirdrop = async () => {
    try {
        const recipients = Object.keys(brrETHAirdropAmounts);

        // Multicall contract `calls` argument.
        const aggregateCalldata = recipients.map((recipient) => [
            BRR,
            encodeFunctionData({
                abi: erc20Abi,
                functionName: "transferFrom",
                args: [
                    client.account.address,
                    recipient,
                    BigInt(brrETHAirdropAmounts[recipient]),
                ],
            }),
        ]);
    } catch (err) {
        console.error(err);
    }
};

distributeBrrETHAirdrop();
