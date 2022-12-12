import { useState } from "react";
import axios from "../helpers/axios";

export default function useProducts() {
  const [error, setError] = useState(null);

  //get products
  const getProducts = async () => {
    axios
      .get(`/products`)
      .then((products) => {
        return products.data;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  return {
    getProducts,
    error,
  };
}
