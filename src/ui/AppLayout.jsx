import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation(); // making an instance so that we can use loading state provided by useNavigation hook

  const isLoading = navigation.state === "loading"; // this laoding indicator is universal to whole app so it any page that is still loading it will be loading unless all the pages are render
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto my-8 max-w-6xl overflow-hidden">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}
