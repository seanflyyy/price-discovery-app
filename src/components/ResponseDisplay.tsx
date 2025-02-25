"use client";

import { Card, CardContent } from './ui/card';
import { ProductGrid } from './ProductGrid';
import { Badge } from './ui/badge';

interface Product {
  product_name: string;
  product_price: number;
}

interface ApiResponse {
  data: {
    products: Product[];
  };
  metadata: {
    request_id: string;
  };
}

interface ResponseDisplayProps {
  response: ApiResponse;
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  const products = response?.data?.products || [];
  const requestId = response?.metadata?.request_id;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products ({products.length})</h2>
        {requestId && (
          <Badge variant="outline" className="font-mono">
            ID: {requestId.slice(0, 8)}
          </Badge>
        )}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">No products found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
