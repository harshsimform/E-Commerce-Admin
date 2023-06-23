import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
const LazyHome = lazy(() => import("./components/pages/Home"));
const LazyRoot = lazy(() => import("./components/pages/Root"));
const LazyAddProduct = lazy(() => import("./components/pages/AddProduct"));
const LazyProductManagement = lazy(
  () => import("./components/pages/ProductsManagement")
);
const LazyOrderManagement = lazy(
  () => import("./components/pages/OrderManagement")
);
const LazyOrderDetails = lazy(
  () => import("./components/pages/orderPage/OrderDetails")
);
const LazyNavbarManagement = lazy(
  () => import("./components/pages/NavbarManagement")
);

const LazyLogin = lazy(() => import("./components/pages/authentication/Login"));
const LazyPageNotFound = lazy(() => import("./components/pages/PageNotFound"));

import "./App.css";
import SuspenseLoading from "./components/pages/SuspenseLoading";
import { useAppSelector } from "./redux/store";
import { selectIsLoggedIn } from "./redux/authSlice/authSlice";

const ProtectedRoute = ({
  component: Component,
}: {
  component: JSX.Element;
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : Component;
};

const ProtectedRouteTwo = ({
  component: Component,
}: {
  component: JSX.Element;
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to="/login" />;
};

const mainRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<SuspenseLoading />}>
        <ProtectedRouteTwo component={<LazyRoot />} />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <ProtectedRouteTwo component={<LazyHome />} />,
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyPageNotFound />
          </Suspense>
        ),
      },
      {
        path: "/add-product",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyAddProduct />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyProductManagement />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyOrderManagement />
          </Suspense>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyOrderDetails />
          </Suspense>
        ),
      },
      {
        path: "/nav-management",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyNavbarManagement />
          </Suspense>
        ),
      },
    ],
  },
];

const authRoutes = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<SuspenseLoading />}>
        <ProtectedRoute component={<LazyLogin />} />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter([...mainRoutes, ...authRoutes]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
