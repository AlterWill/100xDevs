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
    {
      item: "Apple",
      price: 40,
      imageUrl:
        "https://imgs.search.brave.com/gDbaVzizz7tsiGW5S_WLLcpeBEa4qfiZ4edpXejg69k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtdmVjdG9y/L3JlYWxpc3RpYy1m/cnVpdHMtY29tcG9z/aXRpb24td2l0aC1p/bWFnZXMtd2hvbGUt/c2xpY2VkLWFwcGxl/LWZydWl0LWJsYW5r/LWJhY2tncm91bmQt/dmVjdG9yLWlsbHVz/dHJhdGlvbl8xMjg0/LTY2MDMyLmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA",
    },
    {
      item: "Water",
      price: 50,
      imageUrl:
        "https://imgs.search.brave.com/l9mQuleeDrdPBXO_m0cuGFYPf0pBS6olGi10YUu-e6g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/MzAxMjI1MS9waG90/by9hLWdsYXNzLXdp/dGgtY2xlYW4tY2xl/YXItd2F0ZXItYW5k/LXNoYXJwLXNoYWRv/d3Mtc3RhbmRzLW9u/LWEtd2hpdGUtdGFi/bGUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVRYSlh6YTJ0/RXdvQW1CTXpwSUR4/ZE5xZ2JBQzhzTTVI/amNldDZKRldMZ0E9",
    },
    {
      item: "WaterMelon",
      price: 90,
      imageUrl:
        "https://imgs.search.brave.com/OoMvCzR8m2gwkzC2rAsX5o6uHV-Mt6DKIBAMToWgbYM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/ODcwNDkzNTI4NDYt/NGEyMjJlNzg0ZDM4/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1ueDhkMkYwWlhK/dFpXeHZibnhsYm53/d2ZId3dmSHg4TUE9/PQ",
    },
    {
      item: "Chocolate",
      price: 10,
      imageUrl:
        "https://imgs.search.brave.com/8QBDvcAOrV5dMOiRHDaMmNSRL42X-pCKM-o7IE1ZuEw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/OTc5LzE1OC9zbWFs/bC9pbmR1bGdlbnQt/ZGFyay1jaG9jb2xh/dGUtdHJ1ZmZsZS1z/dGFjay1vbi10YWJs/ZS1nZW5lcmF0ZWQt/YnktYWktZnJlZS1w/aG90by5qcGc",
    },
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
            <div className="text-center border border-white h-6 w-22 rounded px-1">
              About us
            </div>
            <div className="text-center border border-white h-6 w-22 rounded px-1">
              contact
            </div>
            <div className="text-center border border-white h-6 w-22 rounded px-1">
              Signup
            </div>
            <div className="text-center border border-white h-6 w-22 rounded px-1">
              Signin
            </div>
          </div>
        </div>
        {/* content */}
        <div className="m-3 flex flex-row">
          <div className="m-3 h-screen max-w-40 w-4/12">
            Total number of items:{totalNoOfItem()}
          </div>
          <div className="border-x-2 border-white flex-1 flex flex-row">
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
          <div className="p-3 max-w-90 w-4/12">
            <div className="border-b-2 border-white flex flex-row justify-between">
              <div>Cart</div>
              <div>Added Item:{Object.keys(cart).length}</div>
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
