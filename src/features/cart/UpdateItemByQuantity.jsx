import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemByQuantity({pizzaId}) {
  const dispatch=useDispatch()

  return (
    <div className="flex gap-1 item-center md:gap-3">
      <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
      <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
    </div>
  );
}

export default UpdateItemByQuantity;
