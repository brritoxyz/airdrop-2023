const { createPublicClient, createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { base } = require("viem/chains");

module.exports = {
    publicClient: createPublicClient({
        chain: base,
        transport: http(process.env.RPC_URL ?? ""),
    }),
    walletClient: process.env.TOKEN_DISTRIBUTOR_PK
        ? createWalletClient({
              account: privateKeyToAccount(process.env.TOKEN_DISTRIBUTOR_PK),
              chain: base,
              transport: http(process.env.RPC_URL ?? ""),
          })
        : null,
};
