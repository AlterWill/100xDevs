import { useState } from "react";

type orderType = {
  item: string;
  price: number;
  imageUrl: string;
  count: number;
};

function App() {
  const [itemNo, setItemNo] = useState<number>(0);
  const [order, setOrder] = useState<orderType[]>([
    {
      item: "Mango",
      price: 30,
      imageUrl:
        "https://imgs.search.brave.com/VdDlQbU6-Pd1YK4D10Gs9ghJFeXJBggvSnmRv4c3Z40/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NDgzMzUzOC9waG90/by9tYW5nby10cm9w/aWNhbC1mcnVpdC1v/bi10YWJsZS13aXRo/LWdyZWVuLW5hdHVy/ZS1iYWNrZ3JvdW5k/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1fZ3hwWkxaeXFW/NFVlNnhRYUdrQjJz/YjhwcG9ReDNwXy1w/aDBONlZKeHRZPQ",
      count: 1,
    },
    { item: "Apple", price: 40, imageUrl: "", count: 4 },
    { item: "Water", price: 50, imageUrl: "", count: 5 },
  ]);

  function totalPrice(): number {
    return Object.values(order).reduce((acc, val) => acc + val.price, 0);
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
            Total number of items:{itemNo}
          </div>
          <div className="border border-white flex-1 flex flex-row">
            {order.map((item) => {
              return (
                <div className="border border-white wrap gap h-52 m-3 rounded">
                  <img src={item.imageUrl} height={150} width={150}></img>
                  <div>item:{item.item}</div>
                  <div>Price:{item.price}</div>
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
              {order.map((item) => {
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
