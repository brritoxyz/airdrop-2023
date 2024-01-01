const { createPublicClient, http } = require("viem");
const { base } = require("viem/chains");

module.exports = createPublicClient({
    chain: base,
    transport: http(process.env.RPC_URL ?? ""),
});
