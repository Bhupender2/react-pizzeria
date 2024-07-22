import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);

  const navigation = useNavigation();
  
  const isSubmitting = navigation.state === "submitting"; //to see if the form is submitting or not

  const formErrors = useActionData(); // now we have connected the action function to the route we can get access to the data return from the action to this component using useActionData(getting errors is the most common useCase)

  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />; //if there is no items in cart we should display the empty cart component

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="order/new"> dont need to specify the action where the submission should be submitted the react-router is smart enough  */}
      <Form method="POST">
        {/* to make it work nicely with react router we use Form and we can give post , patch , delete request but not get request Form component is primarily designed to handle form submission via the POST method */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />

            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/*we can pass data into the action without being a form field and we can only have string so we need to convert it */}
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "placing order..." : "order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// step 1- once the form is submitted it will send a request and that request is intercepted by the action function (if the action function is connected to that particular route)

export async function action({ request }) {
  const formData = await request.formData(); // this is the regular web api provided by the browser

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart), // converted back to an  array
    priority: data.priority === "on",
  }; // now we have data now in the shape we wanted it to be now we can use it to create new order
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please provide valid phone number we might need it to call you";

  if (Object.keys(errors).length > 0) return errors; //Object.keys() will give an array of the name of the properties

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
// step-2 now it need to the connect the action to the route

export default CreateOrder;
