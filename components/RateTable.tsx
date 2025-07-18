"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import type { RateData, FilterState } from "@/lib/types";

interface RateTableProps {
  rates: RateData[];
  filters: FilterState;
}

type SortField =
  | "protocol"
  | "chain"
  | "supplyRate"
  | "borrowRate"
  | "tvl"
  | "riskScore";
type SortDirection = "asc" | "desc";

export function RateTable({ rates, filters }: RateTableProps) {
  const [sortField, setSortField] = useState<SortField>("supplyRate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAndSortedRates = useMemo(() => {
    const filtered = rates.filter((rate) => {
      if (filters.asset !== "All" && rate.asset !== filters.asset) return false;
      if (filters.chain !== "All" && rate.chain !== filters.chain) return false;
      if (filters.protocol !== "All" && rate.protocol !== filters.protocol)
        return false;
      return true;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "tvl") {
        aValue = Number.parseFloat(aValue.replace(/[$BM]/g, ""));
        bValue = Number.parseFloat(bValue.replace(/[$BM]/g, ""));
      }

      if (typeof aValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [rates, filters, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getRateColor = (rate: number, isSupply = true) => {
    if (isSupply) {
      if (rate >= 4.5) return "text-green-600";
      if (rate >= 3.5) return "text-orange-600";
      return "text-red-600";
    } else {
      if (rate <= 4.0) return "text-green-600";
      if (rate <= 6.0) return "text-orange-600";
      return "text-red-600";
    }
  };

  const getChainBadgeColor = (chain: string) => {
    const colors: Record<string, string> = {
      Ethereum: "bg-blue-100 text-blue-800",
      Polygon: "bg-purple-100 text-purple-800",
      Arbitrum: "bg-cyan-100 text-cyan-800",
      Optimism: "bg-red-100 text-red-800",
    };
    return colors[chain] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardContent className="p-0">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("protocol")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Protocol</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("chain")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Chain</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Asset</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("supplyRate")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Supply Rate</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("borrowRate")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Borrow Rate</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("tvl")}
                >
                  <div className="flex items-center space-x-1">
                    <span>TVL</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("riskScore")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Risk Score</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedRates.map((rate, index) => (
                <TableRow key={index} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{rate.protocol}</TableCell>
                  <TableCell>
                    <Badge className={getChainBadgeColor(rate.chain)}>
                      {rate.chain}
                    </Badge>
                  </TableCell>
                  <TableCell>{rate.asset}</TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${getRateColor(
                        rate.supplyRate,
                        true
                      )}`}
                    >
                      {rate.supplyRate}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${getRateColor(
                        rate.borrowRate,
                        false
                      )}`}
                    >
                      {rate.borrowRate}%
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{rate.tvl}</TableCell>
                  <TableCell>
                    <span className="font-medium text-slate-600">
                      {rate.riskScore}/10
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredAndSortedRates.map((rate, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{rate.protocol}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getChainBadgeColor(rate.chain)}>
                        {rate.chain}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        {rate.asset}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Risk Score</div>
                    <div className="font-medium">{rate.riskScore}/10</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-600">Supply Rate</div>
                    <div
                      className={`text-lg font-semibold ${getRateColor(
                        rate.supplyRate,
                        true
                      )}`}
                    >
                      {rate.supplyRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Borrow Rate</div>
                    <div
                      className={`text-lg font-semibold ${getRateColor(
                        rate.borrowRate,
                        false
                      )}`}
                    >
                      {rate.borrowRate}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-slate-600">TVL</div>
                    <div className="font-medium">{rate.tvl}</div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
