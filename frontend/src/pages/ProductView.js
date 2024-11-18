import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductView() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); 
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { productId } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setStock(data.product.inventoryStock);
      });
  }, []);

  const incrementQuantity = () => {
    if(stock > quantity)
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    if (user && user.isAdmin) {
      Swal.fire({
        title: "Admin Error",
        text: "Admins cannot add products to the cart.",
        icon: "error"
      });
    } else {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.message === 'Product added to cart successfully') {
            Swal.fire({
              title: "Added to cart",
              icon: "success"
            });
          } else if (data.message === 'Product not found or inactive') {
            Swal.fire({
              title: "Product Unavailable at the moment",
              icon: "error"
            });
          }
        });
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={6}>
          {/*<Image src="https://placehold.co/600x400/png" rounded />*/}
          <img src={require(`../images/${productId}.jpg`)} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}/>
        </Col>
        <Col xs={12} md={6}>
          <h3>{name}</h3>
          <h5>{description}</h5>
          <h3>&#8369;{price}</h3>
          <h3>Stock: {stock}</h3>
          <br />
          <button className="btn btn-secondary" onClick={decrementQuantity}>-</button>
          <span className="px-2 border">{quantity}</span>
          <button className="btn btn-secondary" onClick={incrementQuantity}>+</button>
          <br />
          {quantity < 1 ? (
            <Button variant="primary" size="lg" className="mt-5" disabled>
              Add to Cart
            </Button>
          ) : (
            <Button variant="primary" size="lg" className="mt-5" onClick={addToCart}>
              Add to Cart
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}