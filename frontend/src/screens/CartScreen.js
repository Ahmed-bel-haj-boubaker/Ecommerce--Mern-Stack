import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Alert from "../Components/Alert";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Shopping cart</title>
      </Helmet>
      <h1>Shopping cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert>
              cart is empty . <Link to="/"> Go Shopping</Link>
            </Alert>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                console.log(cartItems),
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>
                      {"  "}
                      {"  "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      {"  "}
                      <Button disabled={item.quantity === item.countInStock}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
