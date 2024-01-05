const { createPublicClient, createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { base } = require("viem/chains");

module.exports = process.env.TOKEN_DISTRIBUTOR_PK
    ? createWalletClient({
          account: privateKeyToAccount(process.env.TOKEN_DISTRIBUTOR_PK),
          chain: base,
          transport: http(process.env.RPC_URL ?? ""),
      })
    : createPublicClient({
          chain: base,
          transport: http(process.env.RPC_URL ?? ""),
      });
