import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const LazyHome = lazy(() => import("./components/pages/Home"));
const LazyRoot = lazy(() => import("./components/pages/Root"));
const LazyProductManagement = lazy(
  () => import("./components/pages/ProductsManagement")
);
const LazyOrderManagement = lazy(
  () => import("./components/pages/OrderManagement")
);
const LazyUserManagement = lazy(
  () => import("./components/pages/UserManagement")
);

const LazySignup = lazy(
  () => import("./components/pages/authentication/Signup")
);
const LazyLogin = lazy(() => import("./components/pages/authentication/Login"));
const LazyPageNotFound = lazy(() => import("./components/pages/PageNotFound"));

import "./App.css";
import SuspenseLoading from "./components/pages/SuspenseLoading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyRoot />,
    errorElement: <LazyPageNotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyHome />
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
      {
        path: "/signup",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazySignup />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <LazyLogin />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
