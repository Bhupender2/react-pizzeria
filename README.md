Here’s a detailed GitHub README for your **React Pizzeria** project:

---

# React Pizzeria 🍕
A simple, fast, and responsive pizza ordering app built using **ReactJS**, **Tailwind CSS**, and **Redux Toolkit**. With features like real-time menu loading from an API, GPS-based delivery location, and priority order functionality, **React Pizzeria** makes ordering pizza a breeze!

![React Pizzeria Demo](https://github.com/Bhupender2/react-pizzeria/blob/main/src/assets/demo1.png)

## 🚀 Features
- 📜 **Dynamic Pizza Menu**: The menu is loaded from an API, ensuring up-to-date selections.
- 🛒 **Cart Functionality**: Users can easily add multiple pizzas to the cart before placing their order.
- 📍 **Geolocation Support**: Uses the **Geolocation API** to fetch the user's GPS location and fill in their address details based on latitude and longitude.
- 🎯 **Priority Orders**: Users can mark their order as "Priority" for a faster delivery at an additional cost (20% of the cart value).
- 🆔 **Unique Order ID**: Every order is assigned a unique ID, allowing users to track their orders.
- 🛠 **Payments on Delivery**: No online payment processing—orders are paid upon delivery.
- 🌍 **Responsive Design**: Built with **Tailwind CSS**, ensuring a seamless experience across all devices, whether mobile or desktop.

![React Pizzeria Demo](https://github.com/Bhupender2/react-pizzeria/blob/main/src/assets/demo2.png)

## 🛠 Tech Stack
- **ReactJS**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for creating custom designs quickly
- **Redux Toolkit**: Simplified state management for global states and asynchronous data fetching
- **Redux Thunk**: Middleware for handling async logic in Redux
- **Geolocation API**: For retrieving user's current location based on GPS coordinates
- **API Integration**: Pizza menu is dynamically fetched from an external API

## 📸 Demo Screenshots
Here are a few screenshots of the app in action:

1. Menu Screen:
   ![Menu Screen](https://github.com/Bhupender2/react-pizzeria/blob/main/src/assets/demo1.png)
   
2. Cart Screen:
   ![Cart Screen](https://github.com/Bhupender2/react-pizzeria/blob/main/src/assets/demo2.png)
   
3. Order Confirmation Screen:
   ![Order Confirmation Screen](https://github.com/Bhupender2/react-pizzeria/blob/main/src/assets/demo2.png)

## 📦 Installation

To run the app locally:

1. Clone the repository:

```bash
git clone https://github.com/Bhupender2/react-pizzeria.git
cd react-pizzeria
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and visit: `http://localhost:3000`

## 🌐 API Integration

The app dynamically fetches the pizza menu from an external API. Ensure the API is running and available for fetching the latest pizza options.

## 🎯 Geolocation Feature

The app uses the **Geolocation API** to get the user's current location. Ensure location permissions are enabled in the browser for a smooth ordering experience.

## 🤝 Contributing

Feel free to submit a pull request if you find any bugs or want to improve the app!

## 📝 License

This project is licensed under the MIT License.
