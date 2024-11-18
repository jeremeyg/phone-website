import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Checkout from '../components/Checkout';
import DecrementQuantity from '../components/DecrementQuantity';
import IncrementQuantity from '../components/IncrementQuantity';
import RemoveFromCart from '../components/RemoveFromCart';
import UserContext from '../UserContext';


export default function Cart() {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCartInfo();
  }, []);
 

  const fetchProductInfo = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`);
      const data = await response.json();
      return {
        name: data.product.name,
        price: data.product.price,
        stock: data.product.inventoryStock
      };
    } catch (error) {
      console.error("Error fetching product info:", error);
      return null;
    }
  };

  const fetchCartInfo = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const cartItems = data.userCart.cartItems;

      console.log(data);

      Promise.all(cartItems.map(async cartItem => {
        const productInfo = await fetchProductInfo(cartItem.productId);
        return {
          productId: cartItem.productId,
          name: productInfo.name,
          quantity: cartItem.quantity,
          price: productInfo.price,
          stock: productInfo.stock
        };
      }))
      .then(updatedCart => {
        setCart(updatedCart);
      });
    })
    .catch(error => {
      console.error("Error fetching cart data:", error);
    });
  };

  return (
    <Container>
      {cart.length === 0 ? (
        <div>Cart is currently empty</div>
      ) : (
        <>
        {cart.map(cartItem => (
          <Container key={cartItem.productId}>
            <Row className="justify-content-md-center m-5 p-5 border">
              <Col><img src={require(`../images/${cartItem.productId}.jpg`)} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}/></Col>
              <Col>{cartItem.name}</Col>
              <Col>
                <DecrementQuantity
                  productId={cartItem.productId}
                  quantity={cartItem.quantity}
                  stock={cartItem.stock}
                  userId={user.id}
                  fetchCartInfo={fetchCartInfo}
                />
                <span className="px-2 border">{cartItem.quantity}</span>
                <IncrementQuantity
                  productId={cartItem.productId}
                  quantity={cartItem.quantity}
                  stock={cartItem.stock}
                  userId={user.id}
                  fetchCartInfo={fetchCartInfo} 
                />
              </Col>
              <Col md="auto">Price: &#8369;{cartItem.price}</Col>
              <Col md="auto">Stock: {cartItem.stock}</Col>
              <Col md="auto">
                <RemoveFromCart
                  productId={cartItem.productId}
                  userId={user.id}
                  fetchCartInfo={fetchCartInfo} 
                />
              </Col>
            </Row>
          </Container>
        ))}
        <Container>
        <Checkout userId={user.id} fetchCartInfo={fetchCartInfo} />
      </Container>
      </>
      )}

    </Container>
  );
}
