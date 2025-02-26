"use client";

import {PricingData} from "@/types";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";

interface PriceDataDisplayProps {
  pricingData: PricingData[];
}

export const PriceDataDisplay = ({pricingData}: PriceDataDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
      {pricingData.map((item, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold truncate">
              {item.product_name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold text-green-600">
                ${item.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Source: {item.website}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
