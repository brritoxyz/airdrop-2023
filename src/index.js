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
    FILEPATHS,
} = require("./constants");
const erc20Abi = require("./abi/erc20.json");
const excludedAddresses = require("./excludedAddresses");
const fsWriteFileSyncJSON = require("./utils/fsWriteFileSyncJSON");

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json.
BigInt.prototype.toJSON = function () {
    return this.toString();
};

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

const calculateAirdropAmounts = async () => {
    const { brr, stakedBRR, brrETH } = await getTransferLogs();
    const brrBalances = computeAccountBalances([...brr, ...stakedBRR]);
    const brrETHBalances = computeAccountBalances(brrETH);

    // Store the transfer logs and token balances for reviewal purposes.
    await fsWriteFileSyncJSON(FILEPATHS.BRR_TRANSFER_LOGS, brr);
    await fsWriteFileSyncJSON(FILEPATHS.STAKED_BRR_TRANSFER_LOGS, stakedBRR);
    await fsWriteFileSyncJSON(FILEPATHS.BRR_ETH_TRANSFER_LOGS, brrETH);
    await fsWriteFileSyncJSON(FILEPATHS.BRR_TOKEN_BALANCES, brrBalances);
    await fsWriteFileSyncJSON(FILEPATHS.BRR_ETH_TOKEN_BALANCES, brrETHBalances);

    const totalBrrBalances = Object.values(brrBalances).reduce(
        (acc, balance) => acc + balance,
        BigInt(0)
    );
    const totalBrrETHBalances = Object.values(brrETHBalances).reduce(
        (acc, balance) => acc + balance,
        BigInt(0)
    );
};

calculateAirdropAmounts();
