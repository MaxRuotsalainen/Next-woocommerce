import Head from "next/head";

import { getFeaturedProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Link from "next/link";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const wcUrl = "https://shop-interview.acrowd.se/wp-json/wc/v3/";
    const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
    const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;
   
  
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        new Buffer.from(consumerKey + ":" + consumerSecret).toString("base64"),
    };

    fetch(wcUrl + "products", { headers })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        console.log(data);
      });
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleCategoryFilter = (event) => {
    const category = event.currentTarget.innerText;
    setFilteredProducts(
      products.filter((product) =>
        product.categories.some((cat) => cat.name === category)
      )
    );
  };

  const handleRemoveFilter = () => {
    setFilteredProducts(products);
  };
  return (
    <>
 
      <a href="./" className="navBut" onClick={handleRemoveFilter}>
        <h1 className="text">Shop</h1>
      </a>
     
      <nav className="navbar">
        <Link legacyBehavior href="/[category]" as={`/accessories`}>
          <a className="navBut">Accessories</a>
        </Link>
        <Link legacyBehavior href="/[category]" as={`/men`}>
          <a className="navBut">Men</a>
        </Link>
        <Link legacyBehavior href="/[category]" as={`/women`}>
          <a className="navBut">Women</a>
        </Link>
      </nav>
      <div className="card-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
export default Home;

