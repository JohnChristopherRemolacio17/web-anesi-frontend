import React from "react";

const TopSelling = () => {
  const topSellingProducts = [
    { name: "Iced Coffee Latte", quantity: 30, price: 130 },
    { name: "Anesi Iced Coffee", quantity: 21, price: 100 },
    { name: "Snickers Iced Coffee", quantity: 19, price: 130 },
  ];

  return (
    <div className="mt-5">
      <h4>Top Selling Product</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sold Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {topSellingProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSelling;
