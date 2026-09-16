import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./productcard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">

      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-card-body">

        <h2 className="product-title">
          {product.title}
        </h2>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-price">
          ${product.price}
        </p>

        <button
          className="product-cart-button"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;
