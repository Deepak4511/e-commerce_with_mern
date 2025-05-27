import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;
  return (
    <div>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => <UserCartItemsContent cartItems={item} />)
            : null}
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between ">
            <span className="font-bold"> Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
        </div>
        <Button>Checkout</Button>
      </SheetContent>
    </div>
  );
};

export default UserCartWrapper;
