import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashbord from "./dashboard/Dashbord";
import Orders from "./dashboard/orders/Orders";
import RequireAuth from "./auth/RequireAuth";
import PreventAuth from "./auth/PreventAuth";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Users from "./dashboard/user/Users";
import User from "./dashboard/user/User";
import CustomUser from "./dashboard/custom/CustomUser";
import Profil from "./components/profile/Profil";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";
import CustomOrder from "./dashboard/custom/CustomOrder";
import CustomCategory from "./dashboard/custom/CustomCategory";
import CustomProduct from "./dashboard/custom/CustomProduct";
import Category from "./components/categories/Category";
import Product from "./components/products/Product";
import Order from "./dashboard/orders/Order";
import Sales from "./dashboard/sales/Sales";
import Basket from "./pages/Basket";
import ProductInfo from "./components/products/ProductInfo";
import MainDashboard from "./dashboard/MainDashboard";
import Restaurants from "./pages/Restaurants";

//import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} exact />
      <Route path="/basket" element={<Basket />} />
      <Route path="/Product/:id" element={<ProductInfo />} />
      <Route path="/*" element={<ErrorPage />} />

      <Route element={<PreventAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="/Profil" element={<Profil />} />

      <Route element={<RequireAuth allowedRole={[4000, 5000, 7000, 9000]} />}>
        <Route path="/Dashboard" element={<Dashbord />}>

          <Route path="" element={<MainDashboard />} />
          <Route path="restaurants" element={<Restaurants />} />

          {/* Protect Route Admin Only */}
          <Route element={<RequireAuth allowedRole={[7000, 9000]} />}>
            <Route path="Users" element={<Users />} />
            <Route path="Users/:id" element={<User />} />
          </Route>

          <Route path="Sales" element={<Sales />} />  

          <Route path="Orders" element={<Orders />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="Products" element={<Products />} />

          <Route path="Orders/Order" element={<CustomOrder />} />
          <Route path="Orders/:id" element={<Order />} />

          <Route path="Categories/Category" element={<CustomCategory />} />
          <Route path="Categories/:id" element={<Category />} />

          <Route path="Products/Product" element={<CustomProduct />} />
          <Route path="Products/:id" element={<Product />} />

          <Route path="Profil" element={<Profil />} />
          <Route path="User" element={<CustomUser />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
