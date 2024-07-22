import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem, getCurrentQuantityById } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemByQuantity from "./UpdateItemByQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemByQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
