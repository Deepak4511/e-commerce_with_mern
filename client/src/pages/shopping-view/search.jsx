import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
  import { toast } from "sonner";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productDetails } = useSelector((state) => state.shopProducts);



  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast(`Only ${getQuantity} Quantity can be added for this item`);
          return;
        }
      }
    }
    

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Added to cart");
      }
    });
  }

   function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
   }

  useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

  return (
    <div className="container mx-auto md:px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            placeholder="Search Products..."
            className="py-6"
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No Result Found</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {searchResults.map((item) => (
          <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={item}  handleAddtoCart={handleAddtoCart}/>
        ))}
      </div>
       <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;
