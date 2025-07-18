"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FilterState } from "@/lib/types";
import { assets, chains, protocols } from "@/lib/mock-data";

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterSection({
  filters,
  onFiltersChange,
}: FilterSectionProps) {
  const presetAmounts = ["1K", "10K", "100K", "1M"];

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Asset Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Asset</label>
            <Select
              value={filters.asset}
              onValueChange={(value) => updateFilter("asset", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {assets.map((asset) => (
                  <SelectItem key={asset} value={asset}>
                    {asset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Chain Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Chain</label>
            <Select
              value={filters.chain}
              onValueChange={(value) => updateFilter("chain", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain} value={chain}>
                    {chain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Protocol Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Protocol
            </label>
            <Select
              value={filters.protocol}
              onValueChange={(value) => updateFilter("protocol", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select protocol" />
              </SelectTrigger>
              <SelectContent>
                {protocols.map((protocol) => (
                  <SelectItem key={protocol} value={protocol}>
                    {protocol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Supply/Borrow Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Mode</label>
            <ToggleGroup
              type="single"
              value={filters.mode}
              onValueChange={(value) => value && updateFilter("mode", value)}
              className="grid grid-cols-2"
            >
              <ToggleGroupItem value="supply" className="text-sm">
                Supply
              </ToggleGroupItem>
              <ToggleGroupItem value="borrow" className="text-sm">
                Borrow
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Amount</label>
            <Input
              type="text"
              placeholder="Enter amount"
              value={filters.amount}
              onChange={(e) => updateFilter("amount", e.target.value)}
            />
          </div>

          {/* Preset Amounts */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Quick Select
            </label>
            <div className="grid grid-cols-2 gap-1">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => updateFilter("amount", amount)}
                  className="text-xs"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
