export interface RateData {
  protocol: string;
  chain: string;
  asset: string;
  supplyRate: number;
  borrowRate: number;
  tvl: string;
  riskScore: number;
  logo?: string;
}

export interface FilterState {
  asset: string;
  chain: string;
  protocol: string;
  mode: "supply" | "borrow";
  amount: string;
}

export interface StatsData {
  bestSupplyRate: number;
  bestBorrowRate: number;
  protocolsTracked: number;
  totalTVL: string;
}
