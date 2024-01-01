import { BRR, STAKED_BRR, BRR_ETH } from "./constants";

const BRRITO_TEAM = [
    "0x8Fcc36CCa8dE6E5d6c44d4de5F8fbCa86742e0af",
    "0x6CD1D5A560Aa5f2dFa571cd2DFa0B5a165362331",
];

// https://github.com/brritoxyz/token-distribution-contracts?tab=readme-ov-file#contract-deployments.
const INITIAL_TOKEN_DISTRIBUTION_CONTRACTS = [
    "0x487311f7BC5bE2796d86C206024B818b1cff21d2",
    "0xAa444b0753Ea62Ee6bBb836176d56d2968235f53",
    "0xF5891cded27C5e53221180F5F86dbAC7C53b099A",
    "0x837cb4b066F58c46B46BE7B4a432d42cca28FBD7",
];

// https://docs.google.com/spreadsheets/u/3/d/1HEKMYYa_LeYzG87Li8gEu_-cR9mY9pTpoqe8MIhvU68/edit#gid=1253912565.
const ADVISOR_VESTING_WALLET_CONTRACTS = [
    "0x93CB350a74cD68C5722D8a80f6887a53112e3245",
    "0x7d930E069EB35831Aa069580c6791Ca0b98f6AF2",
    "0xb308BA5c5DC2DB5574F57cCDca2B36f87ccCa435",
    "0xF8C81ea9637C72Df96436C2050B0C0cCFb350567",
    "0xfA06c92bd4E2748c55aBdcE33cF3FE575Fa53036",
    "0x4659101c4D922fd7De74aA9e8Fc26ee643684BBd",
    "0xcF676aB2606076B63B13127B6C94735621625040",
    "0x8EccCe57c3B1b6Cc6C40C2A1B5047309802eaf94",
    "0x19a6fba891DA84Eea81d29262617905AC6fC52Ca",
    "0x1c3602a008557462b2F97CF1f06F30966D75A513",
    "0x07726eC8B0BDE32552C8CB0b80F6625760eF662c",
    "0xDDc8D52b7427dD29F60d0ab187C3b3D203D51017",
    "0xd5C24B1Ca91605C1887753ed754607C32ba36723",
    "0x522DE4EEf513124514684395dC403AC6786B85Fe",
    "0x40675516EfD1bDbf7da0A2Ff9041350465d257C0",
    "0xd40449E827c15a7fBdeB0ef044F3fe7C72c1a5DF",
    "0x1027C7f257c7c9e84F693e3D423a8983afd2F571",
    "0x2F239240E1AB686b5623f05E91bbc7Cdf11B17B7",
];

export default [
    BRRITO_TEAM,
    BRR,
    STAKED_BRR,
    BRR_ETH,
    ...INITIAL_TOKEN_DISTRIBUTION_CONTRACTS,
    ...ADVISOR_VESTING_WALLET_CONTRACTS,
];
