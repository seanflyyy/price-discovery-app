"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  name: string;
  price: number;
}

export function ProductCard({ name, price }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const getPriceCategory = (price: number) => {
    if (price < 50) return { label: 'Budget', color: 'bg-green-100 text-green-800' };
    if (price < 200) return { label: 'Mid-Range', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Premium', color: 'bg-purple-100 text-purple-800' };
  };

  const category = getPriceCategory(price);

  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-medium text-sm line-clamp-2 flex-1">{name}</h3>
          <Badge variant="secondary" className={`${category.color} whitespace-nowrap`}>
            {category.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-green-600">
          {formatPrice(price)}
        </p>
      </CardContent>
    </Card>
  );
}
