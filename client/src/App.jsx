import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Authlogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import Adminlayout from "./components/admin-view/layout";
import Admindashboard from "./pages/admin-view/dashboard";
import Adminproducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import Adminfeatures from "./pages/admin-view/features";
import NotFound from "./pages/not-found";
import ShoppingLayout from "./components/shopping-view/layout";
import Shoppinghome from "./pages/shopping-view/home";
import Shopinglisting from "./pages/shopping-view/listing";
import Shoppingcheckout from "./pages/shopping-view/checkout";
import Shoppingaccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

function App() {

  const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(checkAuth())
  },[dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
       Loading...
      </div>
    );
  }

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Adminlayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="products" element={<Adminproducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<Adminfeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Shoppinghome />} />
          <Route path="listing" element={<Shopinglisting />} />
          <Route path="checkout" element={<Shoppingcheckout />} />
          <Route path="account" element={<Shoppingaccount />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage/>}/> 
      </Routes>
    </div>
  );
}

export default App;
