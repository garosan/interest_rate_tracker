import type { RateData, StatsData } from "./types";

export const mockRates: RateData[] = [
  {
    protocol: "Aave V3",
    chain: "Ethereum",
    asset: "USDC",
    supplyRate: 4.25,
    borrowRate: 5.8,
    tvl: "$1.2B",
    riskScore: 9.5,
  },
  {
    protocol: "Compound V3",
    chain: "Ethereum",
    asset: "USDC",
    supplyRate: 3.95,
    borrowRate: 6.1,
    tvl: "$890M",
    riskScore: 9.2,
  },
  {
    protocol: "Morpho",
    chain: "Ethereum",
    asset: "USDC",
    supplyRate: 4.45,
    borrowRate: 5.65,
    tvl: "$450M",
    riskScore: 8.8,
  },
  {
    protocol: "Venus",
    chain: "Polygon",
    asset: "USDC",
    supplyRate: 5.2,
    borrowRate: 7.3,
    tvl: "$320M",
    riskScore: 8.5,
  },
  {
    protocol: "Aave V3",
    chain: "Arbitrum",
    asset: "USDT",
    supplyRate: 4.1,
    borrowRate: 5.95,
    tvl: "$680M",
    riskScore: 9.3,
  },
  {
    protocol: "Compound V3",
    chain: "Polygon",
    asset: "DAI",
    supplyRate: 3.75,
    borrowRate: 6.25,
    tvl: "$420M",
    riskScore: 9.0,
  },
  {
    protocol: "Morpho",
    chain: "Optimism",
    asset: "WETH",
    supplyRate: 2.85,
    borrowRate: 4.2,
    tvl: "$290M",
    riskScore: 8.7,
  },
  {
    protocol: "Aave V3",
    chain: "Polygon",
    asset: "WBTC",
    supplyRate: 1.95,
    borrowRate: 3.4,
    tvl: "$180M",
    riskScore: 9.1,
  },
];

export const mockStats: StatsData = {
  bestSupplyRate: 5.2,
  bestBorrowRate: 3.4,
  protocolsTracked: 4,
  totalTVL: "$4.43B",
};

export const assets = ["All", "USDC", "USDT", "DAI", "WETH", "WBTC"];
export const chains = ["All", "Ethereum", "Polygon", "Arbitrum", "Optimism"];
export const protocols = ["All", "Aave V3", "Compound V3", "Morpho", "Venus"];
