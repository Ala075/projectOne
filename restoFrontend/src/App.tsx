import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import RequireAuth from "./auth/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import SearchProducts from "./pages/SearchProducts";
import PreventAuth from "./auth/PreventAuth";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import MainDashboard from "./pages/MainDashboard";
import Restaurants from "./pages/Restaurants";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Items from "./pages/Items";
import Sales from "./pages/Sales";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/menu" element={<SearchProducts />} />
        <Route path="/cart" element={<Cart />} />

        {/* Auth routes */}
        <Route element={<PreventAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<RequireAuth allowedRole={[4000, 5000, 7000, 9000]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<MainDashboard />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="categories" element={<Categories />} />
            <Route path="menu-item" element={<Items />} />
            <Route path="sales" element={<Sales />} />

            {/* Protect Route Admin Only */}
            <Route element={<RequireAuth allowedRole={[7000, 9000]} />}>
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
