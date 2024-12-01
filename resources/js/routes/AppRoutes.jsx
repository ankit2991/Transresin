import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const AdminLayout = lazy(() => import("../admin/layouts/AdminLayout"));
const Dashboard = lazy(() => import("../admin/screens/Dashboard"));
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import CareerScreen from "../web/screens/CareerScreen";
import BecomeDealerScreen from "../web/screens/BecomeDealerScreen";
import SitemapScreen from "../web/screens/SitemapScreen";
import Video from "../admin/screens/VideoScreen/Video";
import TestimonialScreen from "../admin/screens/Testimonial/TestimonialScreen";
import CheckoutScreen from "../web/screens/CheckoutScreen";
import OrderConfirmationScreen from "../web/screens/OrderConfirmationScreen";
import OrderScreen from "../admin/screens/OrderScreen/OrderScreen";
import AccountLayout from "../web/layouts/AccountLayout";
import MyProfile from "../web/screens/account/MyProfile";
import EditProfile from "../web/screens/account/EditProfile";
import MyOrders from "../web/screens/account/MyOrders";
import Wishlist from "../web/screens/account/Wishlist";
import ChangePassword from "../web/screens/account/ChangePassword";
import OrderDetail from "../web/screens/account/OrderDetail";
import ContactEnquiryScreen from "../admin/screens/ContactEnquiry/ContactEnquiryScreen";
import DealerEnquiryScreen from "../admin/screens/DealerEnquiry/DealerEnquiryScreen";
import NewsletterEmailScreen from "../admin/screens/NewsletterEmailScreen";
import Slider from "../admin/screens/SliderScreen/SliderScreen";

const UserScreen = lazy(() => import("../admin/screens/UserScreen/UserScreen"));
const PageScreen = lazy(() => import("../admin/screens/PageScreen/PageScreen"));
const MobileLayout = lazy(() => import("../mobile/layouts/MobileLayout"));
const ProductScreen = lazy(() =>
  import("../web/screens/ProductScreen/ProductScreen")
);
const MaterialScreen = lazy(() =>
  import("../admin/screens/MaterialScreen/MaterialScreen")
);
const FeatureScreen = lazy(() =>
  import("../admin/screens/FeatureScreen/FeatureScreen")
);

const WebLayout = lazy(() => import("../web/layouts/WebLayout"));
const WebPageScreen = lazy(() => import("../web/screens/PageScreen"));
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
            />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="page" element={<PageScreen />} />
            <Route path="user" element={<UserScreen />} />
            <Route path="contact-enquiry" element={<ContactEnquiryScreen />} />
            <Route path="dealer-enquiry" element={<DealerEnquiryScreen />} />
            <Route path="order" element={<OrderScreen />} />
            <Route path="newsletter" element={<NewsletterEmailScreen />} />
            <Route path="feature" element={<FeatureScreen />} />
            <Route path="material" element={<MaterialScreen />} />
            <Route path="hsn-code" element={<HsnCodeScreen />} />
            <Route path="video" element={<Video />} />
            <Route path="testimonial" element={<TestimonialScreen />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="slider" element={<Slider />} />
            <Route path="add-product" element={<AddProductPage />} />
          </Route>

          <Route path="/" element={isMobile ? <MobileLayout /> : <WebLayout />}>
            <Route index element={<HomeScreen />} />
            <Route path="product" element={<ProductScreen />} />
            <Route
              path="application/:application/:sub_application?"
              element={<ProductScreen />}
            />
            <Route path="category/:category" element={<ProductScreen />} />
            <Route path="category/:category" element={<ProductScreen />} />
            <Route
              path="industry-category/:industryCategory"
              element={<ProductScreen />}
            />
            <Route path="brand/:brand" element={<ProductScreen />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="checkout" element={<CheckoutScreen />} />

            <Route
              path="/order-confirmation/:token"
              element={<OrderConfirmationScreen />}
            />
            <Route path="login" element={<LoginScreen />} />
            <Route path="signup" element={<SignUpScreen />} />
            <Route path="account" element={<AccountLayout />}>
              <Route index element={<MyProfile />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="my-orders/:token" element={<OrderDetail />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
            <Route path="contact" element={<ContactUsScreen />} />
            <Route path="career" element={<CareerScreen />} />
            <Route path="become-our-dealer" element={<BecomeDealerScreen />} />
            <Route path="sitemap" element={<SitemapScreen />} />
            <Route path="page/:slug" element={<WebPageScreen />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
