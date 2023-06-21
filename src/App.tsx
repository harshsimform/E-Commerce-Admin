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
const LazyUserManagement = lazy(
  () => import("./components/pages/UserManagement")
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
        path: "/product-management",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyProductManagement />
          </Suspense>
        ),
      },
      {
        path: "/order-management",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyOrderManagement />
          </Suspense>
        ),
      },
      {
        path: "/user-management",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyUserManagement />
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
