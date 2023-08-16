import React, { useState, useEffect, useReducer } from "react";
//import data from "../data";
import { Link } from "react-router-dom";
import axios from "axios";





const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>List products</h1>

      <div className="products">
        {
        
        loading ? (
          <div>Loading</div>
        ) : error ? (
          <div> {error}</div>
        ): (
         products.map(
            (
              product //change the <a/> to Link and the href to 'to' beacause we dont want to reload the page we want SPA page
            ) => (
              <div className="product" key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>${product.price}</strong>
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            )
          )

        )




        }
       
      </div>
    </div>
  );
}

export default HomeScreen;
