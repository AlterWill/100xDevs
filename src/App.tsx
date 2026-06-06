import { useState } from "react";

type orderType = {
  item: string;
  price: number;
  imageUrl: string;
};

function App() {
  const [cart, setCart] = useState<orderType[]>([]);
  const [order, setOrder] = useState<orderType[]>([
    {
      item: "Mango",
      price: 30,
      imageUrl:
        "https://imgs.search.brave.com/VdDlQbU6-Pd1YK4D10Gs9ghJFeXJBggvSnmRv4c3Z40/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NDgzMzUzOC9waG90/by9tYW5nby10cm9w/aWNhbC1mcnVpdC1v/bi10YWJsZS13aXRo/LWdyZWVuLW5hdHVy/ZS1iYWNrZ3JvdW5k/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1fZ3hwWkxaeXFW/NFVlNnhRYUdrQjJz/YjhwcG9ReDNwXy1w/aDBONlZKeHRZPQ",
    },
    { item: "Apple", price: 40, imageUrl: "" },
    { item: "Water", price: 50, imageUrl: "" },
  ]);

  function totalNoOfItem(): number {
    return Object.values(order).reduce((acc, val) => acc + 1, 0);
  }

  function totalPrice(): number {
    return Object.values(cart).reduce((acc, val) => acc + val.price, 0);
  }
  return (
    <div className="bg-black text-white h-screen w-screen flex flex-col ">
      <div className="h-12 w-screen flex flex-col">
        {/* nav bar */}
        <div className="h-12 border border-white rounded flex flex-row justify-between p-3 mx-3">
          <div>LOGO</div>
          <input
            placeholder="search bar"
            className="border border-white rounded p-3 h-5 w-7/12"
          ></input>
          <div className="flex flex-row gap-2">
            <div>About us </div>
            <div>contact</div>
            <div>Signup</div>
            <div>Signin</div>
          </div>
        </div>
        {/* content */}
        <div className="border border-white m-3 flex flex-row">
          <div className="m-3 border border-white h-screen max-w-40 w-4/12">
            Total number of items:{totalNoOfItem()}
          </div>
          <div className="border border-white flex-1 flex flex-row">
            {order.map((item) => {
              return (
                <div className="border border-white flex flex-col justify-between wrap gap h-52 m-3 rounded">
                  <img className="w-36 h-30" src={item.imageUrl}></img>
                  <div>item:{item.item}</div>
                  <div>Price:{item.price}</div>
                  <button
                    className="bg-white text-black border border-cyan-400 w-36 rounded-b-l h-5"
                    onClick={() => {
                      setCart((current) => [...current, item]);
                      setOrder((current) =>
                        current.filter((obj) => obj !== item),
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
          <div className="border border-white p-3 max-w-90 w-4/12">
            <div className="border-b-2 border-white flex flex-row justify-between">
              <div>Cart</div>
              <div>Added Item:{Object.keys(order).length}</div>
            </div>
            <div>Item List</div>
            <div className="ml-2">
              {cart.map((item) => {
                return (
                  <div>
                    {item.item}:{item.price}
                  </div>
                );
              })}
            </div>
            <div>Total Price:{totalPrice()}</div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
