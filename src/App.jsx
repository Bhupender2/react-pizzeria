import React from "react";
import Home from "./ui/Home";
import CreateOrder from "./features/order/CreateOrder";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);
// we put the error element on the parent route coz all the error will get bubbles up unless it was handled individually inside the nested route

//error in the nested routes will actually bubbles up to the parent route unless they are handled individually in the nested route using errorElement property.

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
