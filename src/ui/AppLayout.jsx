import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

export default function AppLayout(){
  return <div>
    <Header/>
    <main>
      <h1>Content..</h1>

    </main>

    <CartOverview/>
  </div>
}