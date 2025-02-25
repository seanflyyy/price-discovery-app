"use client";

import { ProductCard } from "./ProductCard";

interface Product {
  product_name: string;
  product_price: number;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.product_name}-${index}`}
          name={product.product_name}
          price={product.product_price}
        />
      ))}
    </div>
  );
}
