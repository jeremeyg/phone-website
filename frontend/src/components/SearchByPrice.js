import React, { useState } from 'react';
import ProductCard from './ProductCard';

const SearchByPrice = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleMinPriceChange = e => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = e => {
    setMaxPrice(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByPrice`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ minPrice, maxPrice })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(
          data.products.filter(product =>
            isPriceInRange(product.price)
          )
        );
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isPriceInRange = price => {
    return (
      (minPrice === '' || parseFloat(price) >= parseFloat(minPrice)) &&
      (maxPrice === '' || parseFloat(price) <= parseFloat(maxPrice))
    );
  };

  return (
    <div>
      <h2>Search Products by Price Range</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='minPrice' className='form-label'>
            Min Price:
          </label>
          <input
            type='number'
            className='form-control'
            id='minPrice'
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='maxPrice' className='form-label'>
            Max Price:
          </label>
          <input
            type='number'
            className='form-control'
            id='maxPrice'
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Search
        </button>
      </form>
      <h3>Search Results:</h3>
      <ul>
        {products.map((product, index) => (
          <ProductCard productProp={product} key={product._id} />
        ))}
      </ul>
    </div>
  );
};

export default SearchByPrice;