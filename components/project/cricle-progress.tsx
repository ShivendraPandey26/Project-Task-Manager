import React from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

type VariantType = "default" | "success" | "warning" | "inProgress";

interface CricleProgressProps {
  title: string;
  value: number;
  subTitle: string;
  variant: VariantType;
}

const variantStyles = {
  default: "text-blue-500",
  success: "text-green-600",
  warning: "text-red-600",
  inProgress: "text-yellow-600",
};

const CricleProgress = ({
  title,
  subTitle,
  value,
  variant,
}: CricleProgressProps) => {
  return (
    <div className="flex flex-col items-center p-0">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </h3>

      <div className="relative w-20 h-[7rem]">
        <Progress
          value={value}
          className={cn(`h-20 w-20 rotate-[-90deg] ${variantStyles[variant]}`)}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(`text-xl font-semibold ${variantStyles[variant]}`)}
          >{`${Math.round(value || 0)}%`}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{subTitle}</p>
      </div>
    </div>
  );
};

export default CricleProgress;
