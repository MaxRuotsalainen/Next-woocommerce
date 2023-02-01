import Link from 'next/link';
import Router from 'next/router';

const ProductCard = ({ product }) => (
  <>

  <div className="card">
    <div className="card" onClick={() => Router.replace(`/product/${product.slug}`)}>
    <img className="card-img-top" src={product.images[0].src} alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
            </div>
            
    </div>
  </div>
  </>
);

export default ProductCard;
