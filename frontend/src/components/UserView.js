import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import SearchByPrice from "./SearchByPrice";
import ActiveProducts from "./ActiveProducts";

export default function UserView({ productsData }) {
    const [products, setProducts] = useState(productsData);
    const [selectedOption, setSelectedOption] = useState("allActive");

    useEffect(() => {
        console.log(productsData);

        const productsArr = products.map(product => {
            if (product.isActive === true) {
                return <ProductCard productProp={product} key={product._id} />;
            } else {
                return null;
            }
        });

        setProducts(productsArr);
    }, [products, productsData]);

    const handleOptionChange = e => {
        setSelectedOption(e.target.value);
    };

    const renderSelectedComponent = () => {
        switch (selectedOption) {
            case "allActive":
                return <ActiveProducts />;
            case "byName":
                return <ProductSearch />;
            case "byPriceRange":
                return <SearchByPrice />;
            default:
                return null;
        }
    };

    return (
        <>
            {<h1>User Products Catalog</h1>}
            <select name="searchOption" id="searchOption" onChange={handleOptionChange}>
                <option value="allActive">Active Products</option>
                <option value="byName">Name</option>
                <option value="byPriceRange">Price Range</option>
            </select>

            {renderSelectedComponent()}
        </>
    );
}
