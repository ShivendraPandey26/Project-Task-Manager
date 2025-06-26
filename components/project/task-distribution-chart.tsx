"use client";

import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Pie, PieChart, Label } from "recharts";

interface TaskDistributionProps {
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
  },
  overdue: {
    label: "Overdue",
  },
  todo: {
    label: "To Do",
  },
} satisfies ChartConfig;

const TaskDistributionChart = ({ tasks }: TaskDistributionProps) => {
  const data = [
    {
      name: "Completed",
      value: tasks.completed,
      fill: "#22c55e",
    },
    {
      name: "In Progress",
      value: tasks.inProgress,
      fill: "#f59e0b",
    },
    {
      name: "Overdue",
      value: tasks.overdue,
      fill: "red",
    },
    {
      name: "Todo",
      value: tasks.total - (tasks.completed + tasks.inProgress + tasks.overdue),
      fill: "#3b82f6",
    },
  ].filter((item) => item.value > 0);
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">
          Task Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={data}
              dataKey={"value"}
              nameKey={"name"}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {tasks.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        <div className="w-full flex items-center justify-center">
          <p>Showing total task count for the project</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskDistributionChart;
