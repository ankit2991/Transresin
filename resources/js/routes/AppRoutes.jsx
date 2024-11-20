import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../admin/layouts/AdminLayout";
import Dashboard from "../admin/screens/Dashboard";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import MobileLayout from "../mobile/layouts/MobileLayout";

const WebLayout = lazy(() => import("../web/layouts/WebLayout"));
const HomeScreen = lazy(() => import("../web/screens/HomeScreen"));
const ProductDetail = lazy(() => import("../web/screens/ProductDetail"));
const CartScreen = lazy(() => import("../web/screens/CartScreen"));
const LoginScreen = lazy(() => import("../web/screens/LoginScreen"));
const SignUpScreen = lazy(() => import("../web/screens/SignUpScreen"));
const ContactUsScreen = lazy(() => import("../web/screens/ContactUsScreen"));

const AdminLoginScreen = lazy(() =>
  import("../admin/screens/auth/LoginScreen")
);
const ProductCategoryPage = lazy(() =>
  import("../admin/screens/ProductCategoryScreen/ProductCategory")
);
const ProductApplicationPage = lazy(() =>
  import("../admin/screens/ProductApplicationScreen/ProductApplication")
);
const IndustryCategoryPage = lazy(() =>
  import("../admin/screens/IndustryCategoryScreen/IndustryCategory")
);
const BrandsPage = lazy(() =>
  import("../admin/screens/BrandsScreen/BrandScreen")
);
const ProductsPage = lazy(() =>
  import("../admin/screens/ProductScreen/ProductScreen")
);
const AddProductPage = lazy(() =>
  import("../admin/screens/ProductScreen/AddProduct")
);
const HsnCodeScreen = lazy(() =>
  import("../admin/screens/hsnCode/HsnCodeScreen")
);

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state?.auth);

  const ProtectedRoute = ({ component: Component }) => {
    return isLoggedIn ? <Component /> : <AdminLoginScreen />;
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route
            path="/transresin-panel"
            element={<ProtectedRoute component={AdminLayout} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="product-category" element={<ProductCategoryPage />} />
            <Route
              path="product-application"
              element={<ProductApplicationPage />}
            />
            <Route
              path="industry-category"
              element={<IndustryCategoryPage />}
            ></Route>
            <Route path="brands" element={<BrandsPage />}></Route>
            <Route path="hsn-code" element={<HsnCodeScreen />}></Route>
            <Route path="products" element={<ProductsPage />}></Route>
            <Route path="add-product" element={<AddProductPage />} />
          </Route>
          {isMobile ? (
            <Route path="/" element={<MobileLayout />}>
              <Route index element={<HomeScreen />} />
              <Route path="product" element={<ProductDetail />} />
              <Route path="cart" element={<CartScreen />} />
              <Route path="login" element={<LoginScreen />} />
              <Route path="signup" element={<SignUpScreen />} />
              <Route path="contact" element={<ContactUsScreen />} />
            </Route>
          ) : (
            <Route path="/" element={<WebLayout />}>
              <Route index element={<HomeScreen />} />
              <Route path="product" element={<ProductDetail />} />
              <Route path="cart" element={<CartScreen />} />
              <Route path="login" element={<LoginScreen />} />
              <Route path="signup" element={<SignUpScreen />} />
              <Route path="contact" element={<ContactUsScreen />} />
            </Route>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
