import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { collection, onSnapshot } from "firebase/firestore"; 

const InventoryTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Process Firestore data into the products array
  const processInventoryData = (docs) => {
    const inventoryData = docs.map((doc) => {
      const data = doc.data();
      return {
        name: doc.id, // Use document ID as product name
        threshold: `${data.stock} ml`, // Adjust the unit of measurement as needed
        status: data.stock > 0 ? "In-stock" : "Out of stock", // Set status based on stock
      };
    });

    setProducts(inventoryData);
    setLoading(false);
  };

  useEffect(() => {
    const inventoryCollection = collection(db, "inventory");

    // Set up Firestore real-time listener
    const unsubscribe = onSnapshot(
      inventoryCollection,
      (snapshot) => {
        const docs = snapshot.docs;
        processInventoryData(docs); // Process the documents into inventory data
      },
      (error) => {
        console.error("Error fetching real-time inventory data: ", error);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to get the appropriate status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case "In-stock":
        return "text-success";
      case "Out of stock":
        return "text-danger";
      case "Low stock":
        return "text-warning";
      default:
        return "";
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container mt-4">
        <h4 className="mb-3 text-center">Products</h4>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Products</th>
                <th>Quantity</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.threshold}</td>
                  <td className={getStatusClass(product.status)}>{product.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-between">
          <button className="btn btn-light">Previous</button>
          <span>Page 1 of 2</span>
          <button className="btn btn-light">Next</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
