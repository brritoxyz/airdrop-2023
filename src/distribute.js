require("dotenv").config();

const { encodeFunctionData } = require("viem");
const { publicClient, walletClient } = require("./viem");
const { BRR, MULTICALL, FILEPATHS } = require("./constants");
const brrAirdropAmounts = require("./data/airdropAmounts/brr.json");
const brrETHAirdropAmounts = require("./data/airdropAmounts/brrETH.json");
const erc20Abi = require("./abi/erc20.json");
const multicallAbi = require("./abi/multicall.json");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

const distributeAirdrops = async (airdropAmounts) => {
    try {
        const recipients = Object.keys(airdropAmounts);
        const { request } = await publicClient.simulateContract({
            account: walletClient.account,
            address: MULTICALL,
            abi: multicallAbi,
            functionName: "aggregate",
            args: [
                recipients.map((recipient) => [
                    BRR,
                    encodeFunctionData({
                        abi: erc20Abi,
                        functionName: "transferFrom",
                        args: [
                            walletClient.account.address,
                            recipient,
                            BigInt(airdropAmounts[recipient]),
                        ],
                    }),
                ]),
            ],
        });

        return walletClient.writeContract(request);
    } catch (err) {
        console.error(err);
    }
};

const executeDistribution = async () => {
    try {
        const brr = await distributeAirdrops(brrAirdropAmounts);
        const brrETH = await distributeAirdrops(brrETHAirdropAmounts);

        await fsWriteFileSyncJSON(FILEPATHS.DISTRIBUTION_TX_HASHES, {
            brr,
            brrETH,
        });
    } catch (err) {
        console.error(err);
    }
};

executeDistribution();
