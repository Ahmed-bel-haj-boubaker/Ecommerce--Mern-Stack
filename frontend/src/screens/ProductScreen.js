import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../Components/Rating";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/esm/Button";
import '../index.css'
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import Alert from "../Components/Alert";
import getError from "../utils";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const navigate=useNavigate();
  const params = useParams(); //to extact the parameter from the route in the home Screen component
  const { slug } = params; // slug est le parameter
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload:getError(error) });
      }
    };
    fetchData();
  }, [slug]);
  const {state,dispatch:ctxDispatch} = useContext(Store);
  const {cart}=state;

  const addToCartHandler = async ()=>{
     const existItem = cart.cartItems.find((x)=>x._id = product._id);
     const quantity = existItem ? existItem.quantity +1 : 1;

     const { data } = await axios.get(`/api/products/${product._id}`);
   
     if(data.countInStock < quantity){
     window.alert('sorry product is out of stock');
     return;
    }

    ctxDispatch({
    type:'CART_ADD_ITEM',
    payload:{...product,quantity},
  })
  navigate('/cart');
  console.log(product._id)
  console.log(quantity)
}
  return (
    <div>
      {loading ? (
       <LoadingBox/>
      ) : error ? (
        <Alert variant="danger" >{error}</Alert>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              ></img>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                  <title>{product.name}</title>
                  </Helmet>
                  
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && ( //&& is AND operation and in this context it seems like rendering the button if the previous condition is TRUE
                    <ListGroup.Item>
                      <div className="d-grid buttonAdd">
                        <Button onClick={addToCartHandler}>Add to cart</Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
