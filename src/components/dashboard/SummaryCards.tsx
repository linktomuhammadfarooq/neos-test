import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import {
  ArrowUp,
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total AUM",
    amount: "$45,231.89M",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    direction: "+20.1% from last month",
  },
  {
    title: "Total Firms",
    amount: "+573",
    icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
    direction: "+7.1% from last month",
  },
  {
    title: "New Clients",
    amount: "+8",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    direction: "+4% from last month",
  },
  {
    title: "New Firms",
    amount: "+8",
    icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
    direction: "+4% from last month",
  },
  {
    title: "Most Recent Data",
    date: "January 15, 2024",
    amount: null,
    icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    direction: null,
    lastUpdated: "19 days ago",
  },
];
export const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {summaryCards.map((card) => (
        <Card
          className="bg-summary-gray shadow-none border-none gap-2"
          key={card.title}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-small font-medium text-card-foreground leading-normal">
              {card.title}
            </CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div
              className={clsx(
                card.date
                  ? "text-2xl text-card-foreground leading-normal [text-shadow:_0px_6px_5px_#00000040] -tracking-widest font-black"
                  : "text-2xl font-bold leading-normal text-card-foreground"
              )}
            >
              {card.amount && card.amount}
              {card.date && card.date}
            </div>
            <div className="flex items-center mt-1 text-xs">
              {card.direction && (
                <>
                  <ArrowUp className="h-3 w-3 text-dark-green mr-1" />
                  <span className="text-dark-green font-base text-xs ">
                    {card.direction}
                  </span>
                </>
              )}
              {card.lastUpdated && (
                <div className="text-xs text-muted-foreground mt-1">
                  Last Updated: {card.lastUpdated}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
