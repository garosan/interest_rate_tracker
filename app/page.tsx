"use client";

import { useState, useEffect } from "react";
import { FilterSection } from "@/components/FilterSection";
import { StatsOverview } from "@/components/StatsOverview";
import { RateTable } from "@/components/RateTable";
import { mockRates, mockStats } from "@/lib/mock-data";
import type { FilterState } from "@/lib/types";

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    asset: "All",
    chain: "All",
    protocol: "All",
    mode: "supply",
    amount: "",
  });

  const [rates, setRates] = useState(mockRates);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRates((prevRates) =>
        prevRates.map((rate) => ({
          ...rate,
          supplyRate: Number(
            (rate.supplyRate + (Math.random() - 0.5) * 0.1).toFixed(2)
          ),
          borrowRate: Number(
            (rate.borrowRate + (Math.random() - 0.5) * 0.1).toFixed(2)
          ),
        }))
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          DeFi Interest Rates
        </h1>
        <p className="text-xl text-slate-600">
          Compare lending and borrowing rates across multiple DeFi protocols and
          chains
        </p>
      </div>

      <FilterSection filters={filters} onFiltersChange={setFilters} />

      <StatsOverview stats={stats} />

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Rate Comparison
        </h2>
        <p className="text-sm text-slate-600">
          Showing {filters.mode === "supply" ? "supply" : "borrowing"} rates
          {filters.asset !== "All" && ` for ${filters.asset}`}
          {filters.chain !== "All" && ` on ${filters.chain}`}
        </p>
      </div>

      <RateTable rates={rates} filters={filters} />

      <div className="mt-8 text-center text-sm text-slate-500">
        <p>
          Rates update every 10 seconds • Last updated:{" "}
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
