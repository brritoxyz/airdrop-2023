require("dotenv").config();

const client = require("./viem");
const {
    BRR,
    BRR_DEPLOYMENT_BLOCK,
    STAKED_BRR,
    STAKED_BRR_DEPLOYMENT_BLOCK,
    BRR_ETH,
    BRR_ETH_DEPLOYMENT_BLOCK,
    SNAPSHOT_BLOCK,
    ZERO_ADDRESS,
} = require("./constants");
const erc20Abi = require("./abi/erc20.json");
const excludedAddresses = require("./excludedAddresses");

const computeAccountBalances = (logs) => {
    return logs.reduce((acc, { args: { from, to, amount } }) => {
        // Exclude the zero address, and project and advisor contract addresses.
        if (from !== ZERO_ADDRESS && !excludedAddresses[from]) {
            // `from` should always have a balance since we're accruing from the deployment block.
            acc[from] -= amount;

            // If the token sender no longer has a balance, remove them.
            if (acc[from] === BigInt(0)) delete acc[from];
        }

        if (to !== ZERO_ADDRESS && !excludedAddresses[to]) {
            // Assign the account balance to zero if it doesn't exist.
            if (acc[to] === undefined) acc[to] = BigInt(0);

            acc[to] += amount;
        }

        return acc;
    }, {});
};

const getTransferLogs = async () => {
    try {
        const brr = await client.getContractEvents({
            address: BRR,
            abi: erc20Abi,
            eventName: "Transfer",
            fromBlock: BRR_DEPLOYMENT_BLOCK,
            toBlock: SNAPSHOT_BLOCK ?? 0,
            strict: true,
        });
        const stakedBRR = await client.getContractEvents({
            address: STAKED_BRR,
            abi: erc20Abi,
            eventName: "Transfer",
            fromBlock: STAKED_BRR_DEPLOYMENT_BLOCK,
            toBlock: SNAPSHOT_BLOCK ?? 0,
            strict: true,
        });
        const brrETH = await client.getContractEvents({
            address: BRR_ETH,
            abi: erc20Abi,
            eventName: "Transfer",
            fromBlock: BRR_ETH_DEPLOYMENT_BLOCK,
            toBlock: SNAPSHOT_BLOCK ?? 0,
            strict: true,
        });

        return {
            brr,
            stakedBRR,
            brrETH,
        };
    } catch (err) {
        console.error(err);
    }
};
