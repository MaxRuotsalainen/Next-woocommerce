import Head from "next/head";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import Link from "next/link";
import { getFeaturedProducts } from "../../lib/api";
import React, { useState, useEffect } from "react";

const SubCategory = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
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
        setLoading(false);
        console.log(data);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const filteredProducts = products.filter((product) =>
    product.categories.some(
      (category) =>
        category.slug.toLowerCase() === router.query.subcategory.toLowerCase()
    )
  );

  console.log(filteredProducts);
  return (
    <>
      <Head>
        <title>{router.query.subcategory}</title>
      </Head>
      <Link href="/">
        <h1 className="text">{router.query.subcategory}</h1>
      </Link>
      <div className="card-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SubCategory;
