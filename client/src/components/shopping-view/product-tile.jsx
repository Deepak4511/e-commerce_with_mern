import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const ShoppingProductTile = (product) => {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
            {product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
                Sale
              </Badge>
            ) : null}
          </div>
          <CardContent className='p-4'>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">{product?.category}</span>
            <span className="text-sm text-muted-foreground">{product?.brand}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>{product?.price}</span>
            {
                product?.salePrice > 0 ?
                 <span className="text-lg font-semibold text-primary">{product?.brand}</span> : null
            }
           
          </div>

          </CardContent>
          <CardFooter>
            <Button className='w-full'>Add to Cart</Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingProductTile;
