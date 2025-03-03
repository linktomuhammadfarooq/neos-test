import { ProductAumItem } from "@/components/dashboard/ProductAumItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Sample data for product AUM
const productAumData = [
  { product: "SPYI", value: 15230, percentage: 85 },
  { product: "QOQI", value: 12450, percentage: 75 },
  { product: "IWMI", value: 9870, percentage: 65 },
  { product: "NUSI", value: 7540, percentage: 55 },
];

export const ProductAum = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product AUM</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {productAumData.map((item, index) => (
            <ProductAumItem
              key={index}
              name={item.product}
              value={item.value}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
