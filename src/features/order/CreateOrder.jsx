import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"; //to see if the form is submitting or not

  const formErrors = useActionData(); // now we have connected the action function to the route we can get access to the data return from the action to this component using useActionData(getting errors is the most common useCase)

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="order/new"> dont need to specify the action where the submission should be submitted the react-router is smart enough  */}
      <Form method="POST">
        {/* to make it work nicely with react router we use Form and we can give post , patch , delete request but not get request Form component is primarily designed to handle form submission via the POST method */}
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required  className="input"/>
        </div>
        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input" />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>
        <div>
          <label>Address</label>
          <div>
            <input
              className="input"
              type="text"
              name="address"
              required
            />
          </div>
        </div>
        <div>
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/*we can pass data into the action without being a form field and we can only have string so we need to convert it */}
          <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "placing order......" : "order now"}
          </button>
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
