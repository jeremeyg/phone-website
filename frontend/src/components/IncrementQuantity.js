export default function IncrementQuantity({ productId, quantity, stock, fetchCartInfo, userId }) {
  const handleIncrement = () => {

    if(stock > quantity) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/updateQuantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify([{ userId: userId, productId, quantity: quantity + 1 }]),
    })
      .then((res) => res.json())
      .then(() => {
        // Fetch updated cart information after successful update
        fetchCartInfo();
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
    }
  };

  return (
    <button className="btn btn-secondary" onClick={handleIncrement}>
      +
    </button>
  );
}