// https://github.com/brritoxyz/token?tab=readme-ov-file#contract-deployments.
const BRR = "0x6d80d90ce251985bF41A98c6FDd6b7b975Fff884";

// https://github.com/brritoxyz/fee-distribution-contracts?tab=readme-ov-file#contract-deployments.
const STAKED_BRR = "0x9A2a2E71071Caff506050bE6747B4E1369964933";

// https://github.com/brritoxyz/brr-eth?tab=readme-ov-file#contract-deployments.
const BRR_ETH = "0xf1288441F094d0D73bcA4E57dDd07829B34de681";

// https://basescan.org/tx/0x5bd49dda046772037792e7de9cd8981f291bf0c4c75f079f26760966089438f9.
const BRR_DEPLOYMENT_BLOCK = 5723920n;

// https://basescan.org/tx/0x0544d1484029a9debb28c32f74a038bf6a319eed64deb115d4955ca5b58e34e4.
const STAKED_BRR_DEPLOYMENT_BLOCK = 7756737n;

// https://basescan.org/tx/0x290db9109fe03745ffeba27eba0df25695012eadb427799f14155f9e2be6f55e.
const BRR_ETH_DEPLOYMENT_BLOCK = 7540709n;

const SNAPSHOT_BLOCK = 8239469n;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// BRR and stakedBRR token holders split ~80% of the total airdrop amount.
const BRR_AIRDROP_AMOUNT = 904820327999999999999999n;

// brrETH token holders split ~20% of the total airdrop amount.
const BRR_ETH_AIRDROP_AMOUNT = 226205081999999999999999n;

const MULTICALL = "0xca11bde05977b3631167028862be2a173976ca11";

const FILEPATHS = {
    BRR_TRANSFER_LOGS: `${__dirname}/data/transferLogs/brr.json`,
    STAKED_BRR_TRANSFER_LOGS: `${__dirname}/data/transferLogs/stakedBRR.json`,
    BRR_ETH_TRANSFER_LOGS: `${__dirname}/data/transferLogs/brrETH.json`,
    BRR_TOKEN_BALANCES: `${__dirname}/data/tokenBalances/brr.json`,
    BRR_ETH_TOKEN_BALANCES: `${__dirname}/data/tokenBalances/brrETH.json`,
    BRR_AIRDROP_AMOUNTS: `${__dirname}/data/airdropAmounts/brr.json`,
    BRR_ETH_AIRDROP_AMOUNTS: `${__dirname}/data/airdropAmounts/brrETH.json`,
    DISTRIBUTION_TX_HASHES: `${__dirname}/data/distribution/transactions.json`,
};

module.exports = {
    BRR,
    STAKED_BRR,
    BRR_ETH,
    BRR_DEPLOYMENT_BLOCK,
    STAKED_BRR_DEPLOYMENT_BLOCK,
    BRR_ETH_DEPLOYMENT_BLOCK,
    SNAPSHOT_BLOCK,
    ZERO_ADDRESS,
    BRR_AIRDROP_AMOUNT,
    BRR_ETH_AIRDROP_AMOUNT,
    FILEPATHS,
    MULTICALL,
};
