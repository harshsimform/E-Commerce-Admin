import Root from "./components/pages/Root";
import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import ProductManagement from "./components/pages/ProductsManagement";
import OrderManagement from "./components/pages/OrderManagement";
import UserManagement from "./components/pages/UserManagement";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-management",
        element: <ProductManagement />,
      },
      {
        path: "/order-management",
        element: <OrderManagement />,
      },
      {
        path: "/user-management",
        element: <UserManagement />,
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
