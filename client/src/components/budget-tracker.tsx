import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { DinnerHistory } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";

interface BudgetTrackerProps {
  weeklyBudget?: number;
  className?: string;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function getWeekEnd(date: Date): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return end;
}

export default function BudgetTracker({
  weeklyBudget,
  className = "",
}: BudgetTrackerProps) {
  const {
    data: history,
    isLoading,
  } = useQuery<DinnerHistory[] | null>({
    queryKey: ["/api/user/history"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  if (history === null) {
    return null;
  }

  const weekStart = getWeekStart(new Date());
  const weekEnd = getWeekEnd(new Date());

  const weeklySpending = (history || []).reduce((total, item) => {
    if (!item.cookedAt || !item.cost) {
      return total;
    }
    const itemDate = new Date(item.cookedAt);
    if (itemDate >= weekStart && itemDate <= weekEnd) {
      return total + parseFloat(String(item.cost));
    }
    return total;
  }, 0);

  if (!weeklyBudget) {
    return (
      <div
        className={`bg-stone-800/50 rounded-lg p-4 border border-stone-700 ${className}`}
        data-testid="budget-tracker-no-budget"
      >
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-stone-300" />
          <p className="text-sm text-stone-300" data-testid="text-set-budget">
            Set your weekly budget in preferences to get started
          </p>
        </div>
      </div>
    );
  }

  const percentageUsed = (weeklySpending / weeklyBudget) * 100;
  let progressColor = "bg-amber-500";
  if (percentageUsed >= 80) {
    progressColor = "bg-red-500";
  } else if (percentageUsed >= 50) {
    progressColor = "bg-amber-400";
  }

  return (
    <div
      className={`bg-stone-800/50 rounded-lg p-4 border border-stone-700 ${className}`}
      data-testid="budget-tracker-container"
    >
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-4 h-4 text-amber-400" />
        <h3 className="text-white font-semibold" data-testid="text-budget-title">
          Weekly Budget
        </h3>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-baseline mb-2">
          <span
            className="text-sm text-stone-300"
            data-testid="text-budget-spent"
          >
            Week Budget: ${weeklySpending.toFixed(2)} / ${weeklyBudget.toFixed(2)} spent
          </span>
          <span
            className="text-xs text-stone-400"
            data-testid="text-budget-percentage"
          >
            {Math.round(percentageUsed)}%
          </span>
        </div>
        <Progress
          value={Math.min(percentageUsed, 100)}
          className="h-2"
          data-testid="progress-budget"
        />
      </div>

      {isLoading ? (
        <p className="text-xs text-stone-500" data-testid="text-loading">
          Loading spending data...
        </p>
      ) : weeklySpending > weeklyBudget ? (
        <p
          className="text-xs text-red-400"
          data-testid="text-budget-exceeded"
        >
          Budget exceeded by ${(weeklySpending - weeklyBudget).toFixed(2)}
        </p>
      ) : (
        <p
          className="text-xs text-stone-400"
          data-testid="text-budget-remaining"
        >
          ${(weeklyBudget - weeklySpending).toFixed(2)} remaining
        </p>
      )}
    </div>
  );
}
