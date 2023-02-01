import { useEffect, useState } from "react";
import { getProduct, getCategories, getFeaturedProducts } from "../../lib/api";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";

const Product = ({ productSlug }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const product = await getProduct(productSlug);
      setProduct(product);
      const categories = await getCategories(productSlug);
      const relatedProducts = await getFeaturedProducts(categories);
      setRelatedProducts(relatedProducts);
      setLoading(false);
    }
    fetchData();
  }, [productSlug]);

  if (loading) {
    return <Loader />;
  }

  const addToCart = (product, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.product[0].id === product[0].id
    );

    if (existingProduct) {
      existingProduct.quantity += parseInt(quantity);
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${quantity} x ${product[0].name} has been added to your cart`);
    console.log(cart);
    router.push("/cart");
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="parent">
        <div className="div1">
          {" "}
          <img
            className="prodImg"
            src={product[0].images[0].src}
            alt={product[0].name}
          />
        </div>
        <div className="div2">
          {" "}
          <h3 className="productTitle">{product[0].name}</h3>
          <div>
            {product[0].categories.length >= 2 ? (
              <h4>
                {product[0].categories[1].name}/{product[0].categories[0].name}
              </h4>
            ) : product[0].categories.length === 1 ? (
              <h4>{product[0].categories[0].name}</h4>
            ) : null}
          </div>
          <div className="product">
            <div dangerouslySetInnerHTML={{ __html: product[0].price_html }} />
          </div>
          <div
            className="productDescription"
            dangerouslySetInnerHTML={{ __html: product[0].short_description }}
          />
          <div className="addToCart">
            <div className="number">
              <span className="minus" onClick={decrementQuantity}>
                -
              </span>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <span className="plus" onClick={incrementQuantity}>
                +
              </span>
            </div>

            <div className="add">
              <button
                className="addButton"
                onClick={() => addToCart(product, quantity)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="div3"> </div>
      </div>
      <div className="related-products-container">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style jsx>{`
        .related-products-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .related-products-container > div {
          width: calc(25% - 10px);
        }
      `}</style>
    </>
  );
};

Product.getInitialProps = async ({ query }) => {
  return { productSlug: query.slug };
};

export default Product;
