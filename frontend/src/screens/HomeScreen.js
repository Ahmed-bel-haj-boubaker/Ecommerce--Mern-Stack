import React, { useEffect, useReducer } from "react";

import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from "../Components/Product";
import LoadingBox from "../Components/LoadingBox";
import Alert from "../Components/Alert";
import getError from "../utils";



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
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
       <LoadingBox/>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
    <div>
      <h1>List products</h1>

      <div className="products">
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div> {error}</div>
        ) : (
          <Row>


     
       {   products.map(
            (
              product //change the <a/> to Link and the href to 'to' beacause we dont want to reload the page we want SPA page
            ) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
             
              </Col>
            )
          )}
          </Row>
        )}
      </div>
    </div>
    ) }
    </div>
  );

}

export default HomeScreen;
