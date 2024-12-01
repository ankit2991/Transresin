import React from "react";

const Wishlist = () => {
  const items = [
    { name: "Wishlist Item 1", price: "$100" },
    { name: "Wishlist Item 2", price: "$150" },
  ];

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <ul className="bg-white shadow-md rounded-lg">
        {items.map((item, index) => (
          <li key={index} className="p-4 border-b last:border-none">
            <p>
              <strong>{item.name}</strong> - {item.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
