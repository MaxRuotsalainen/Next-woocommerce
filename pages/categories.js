import Head from 'next/head';
import { useRouter } from 'next/router';
import { getFeaturedProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import React, { useState, useEffect } from "react";
import Loader from '../components/Loader';

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wcUrl = "https://shop-interview.acrowd.se/wp-json/wc/v3/";
    const consumerKey = "ck_4c0d8a4f83c78831c200e39d1f371e92d419d863";
    const consumerSecret = "cs_1eb6c96b9a32942b52a868da3ad28698b15873ff";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        new Buffer.from(consumerKey + ":" + consumerSecret).toString("base64")
    };

    fetch(wcUrl + "products", { headers })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data.filter((product) =>
          product.categories.some((cat) => cat.name === category)
        ));
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <Loader />;
  }

  const handleSubcategoryFilter = (event) => {
    const subcategory = event.currentTarget.innerText;
    setFilteredProducts(
      products.filter((product) =>
        product.tags.some((tag) => tag.name === subcategory)
      )
    );
  };

  const handleRemoveFilter = () => {
    setFilteredProducts(products);
  };
  return (
    <>
      
    <a href="#" className="navBut" onClick={handleRemoveFilter}>
<h1 className="text">Shop</h1>
</a>
<nav className="navbar">
<Link href="/category/accessories" as={`/accessories`}>
  <a className="navBut">Accessories</a>
</Link>
<Link href="/category/men" as={`/men`}>
  <a className="navBut">Men</a>
</Link>
<Link href="/category/women" as={`/women`}>
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
}

export default Category;
