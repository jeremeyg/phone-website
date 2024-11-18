export const addToCart = (productId, quantity) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/addToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add product to cart");
      }
      return res.json();
    })
    .then((data) => {
      return data.cart;
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      throw error;
    });
};


// CHANGE PRODUCT QUANTITIES
export const changeProductQuantities = (productId, quantity) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/updateQuantity`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error updating cart");
      }
      return res.json();
    })
    .then((data) => {
      return { message: "Cart updated successfully", cart: data.cart };
    })
    .catch((error) => {
      console.error("Error updating cart:", error);
      throw error;
    });
};

// REMOVE PRODUCT FROM CART
export const removeProductFromCart = (productId) => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/remove/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error removing product from cart");
      }
      return res.json();
    })
    .then((data) => {
      return {
        message: "Product removed from cart successfully",
        cart: data.cart,
      };
    })
    .catch((error) => {
      console.error("Error removing product from cart:", error);
      throw error;
    });
};

// CLEAR AND DELETE CART
export const clearAndDeleteCart = () => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-and-delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error clearing and deleting cart");
      }
      return res.json();
    })
    .then((data) => {
      return { message: "Cart cleared and deleted successfully" };
    })
    .catch((error) => {
      console.error("Error clearing and deleting cart:", error);
      throw error;
    });
};
