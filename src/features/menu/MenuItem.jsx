import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemByQuantity from "../cart/UpdateItemByQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0; // if the item is in the cart or not

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    console.log(newItem);
    dispatch(addItem(newItem));
  }

  return (
    <li className="overflow-hidden rounded-xl bg-white shadow-xl transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
      <img
        src={imageUrl}
        alt={name}
        className={`h-60 w-full object-cover ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="p-4 space-y-2">
        <p className="font-semibold text-xl">{name}</p>
        <p className="text-sm italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {!soldOut ? (
            <p className="font-bold text-lg">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-2 sm:gap-8">
              <UpdateItemByQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {/*id is getting by destructure*/}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;