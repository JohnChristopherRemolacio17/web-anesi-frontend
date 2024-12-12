import React, { useState, useEffect } from "react";
import { db } from "../../firebase.config"; // Import your Firestore instance
import { collection, query, onSnapshot } from "firebase/firestore";
import { Table } from "react-bootstrap";

const TopSelling = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    // Set up the real-time listener for the 'orders' collection
    const ordersCollectionRef = collection(db, "orders");
    const q = query(ordersCollectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const aggregatedData = {};

      querySnapshot.forEach((doc) => {
        const { name, price } = doc.data(); // Extract 'name' and 'price'
        
        if (aggregatedData[name]) {
          // If product exists, increment the count and accumulate sales
          aggregatedData[name].quantity += 1;
          aggregatedData[name].totalSales += price;
        } else {
          // Add a new entry for the product
          aggregatedData[name] = {
            name,
            quantity: 1,
            totalSales: price,
          };
        }
      });

      // Convert aggregated data to an array and sort by quantity
      const sortedData = Object.values(aggregatedData).sort(
        (a, b) => b.quantity - a.quantity
      );

      setTopSellingProducts(sortedData);
    });

    // Cleanup listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-5">
      <h4>Top Selling Products</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sold Quantity</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {topSellingProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>₱{product.totalSales.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TopSelling;
