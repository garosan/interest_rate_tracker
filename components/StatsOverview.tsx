import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Shield, DollarSign } from "lucide-react";
import type { StatsData } from "@/lib/types";

interface StatsOverviewProps {
  stats: StatsData;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statsCards = [
    {
      title: "Best Supply Rate",
      value: `${stats.bestSupplyRate}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Best Borrow Rate",
      value: `${stats.bestBorrowRate}%`,
      icon: TrendingDown,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Protocols Tracked",
      value: stats.protocolsTracked.toString(),
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total TVL",
      value: stats.totalTVL,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
