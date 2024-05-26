import React from "react";
import Home from "./ui/Home";
import CreateOrder from "./features/order/CreateOrder";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";

import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import Order from "./features/order/Order";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/menu",
    element: <Menu />,
  },
  { path: "/cart", element: <Cart /> },
  { path: "/order/new", element: <CreateOrder /> },
  { path: "/order/:orderId", element: <Order /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
