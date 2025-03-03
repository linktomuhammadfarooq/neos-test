import MoverImg from "../../assets/images/Fidelity-2.png";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ClientRow } from "./ClientRow";
// Sample data for biggest movers
const biggestMovers = [
  {
    id: "US",
    name: "Rockefeller",
    location: "New York, NY",
    isNew: true,
    status: "pay" as const,
    aum: "$11.0M AUM",
    change: { value: "$2.3M", trend: "up" as const },
  },
  {
    id: "FI",
    name: "Fidelity",
    location: "San Francisco, CA",
    status: "do not pay" as const,
    aum: "$26.7M AUM",
    change: { value: "$1.5M", trend: "down" as const },
    imgUrl: MoverImg,
  },
  {
    id: "US",
    name: "US Capital",
    location: "Austin, TX",
    isNew: true,
    status: "needs classification" as const,
    aum: "$12.0M AUM",
    change: { value: "$0.3M", trend: "up" as const },
  },
  {
    id: "SO",
    name: "Some Capital Partners",
    location: "Seattle, WA",
    status: "pay" as const,
    aum: "$8.1M AUM",
    change: { value: "$2.3M", trend: "up" as const },
  },
  {
    id: "HE",
    name: "Health Horizons",
    location: "Boston, MA",
    status: "pay" as const,
    aum: "$19.2M AUM",
    change: { value: "$2.3M", trend: "up" as const },
  },
];
export const BiggestMover = () => {
  return (
    <Card className="bg-white gap-2">
      <CardHeader className="">
        <CardTitle className="text-card-foreground font-semibold text-base">
          Biggest Movers
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-3">
        {biggestMovers.map((client) => (
          <ClientRow {...client} key={client.name} />
        ))}
      </CardContent>
    </Card>
  );
};
