import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

import "./cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    navigate("/order", {
      state: {
        cartItems: cartItems,
        cartTotal: cartTotal,
      },
    });
  };

  return (
    <div className="cart-page">

      <div className="cart-container">

        <div className="cart-heading">
          <p>YOUR SHOPPING BAG</p>
          <h1>Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">♡</div>
            <h2>Your Cart is Empty</h2>
            <p>
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
        ) : (
          <>

            <div className="cart-table-wrapper">

              <table className="cart-table">

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => {

                    const subtotal =
                      Number(item.price) * item.quantity;

                    return (
                      <tr key={item.id}>

                        <td className="cart-product">
                          <span>{item.title}</span>
                        </td>

                        <td className="cart-price">
                          ₹{Number(item.price).toFixed(2)}
                        </td>

                        <td>
                          <div className="quantity-control">

                            <button
                              className="quantity-btn"
                              onClick={() =>
                                dispatch(
                                  decreaseQuantity(item.id)
                                )
                              }
                            >
                              −
                            </button>

                            <span className="quantity-number">
                              {item.quantity}
                            </span>

                            <button
                              className="quantity-btn"
                              onClick={() =>
                                dispatch(
                                  increaseQuantity(item.id)
                                )
                              }
                            >
                              +
                            </button>

                          </div>
                        </td>

                        <td className="cart-subtotal">
                          ₹{subtotal.toFixed(2)}
                        </td>

                        <td>
                          <button
                            className="remove-btn"
                            onClick={() =>
                              dispatch(
                                removeFromCart(item.id)
                              )
                            }
                          >
                            Remove
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>

            <div className="cart-summary">

              <div className="cart-total">
                <span>Grand Total</span>
                <strong>
                  ₹{cartTotal.toFixed(2)}
                </strong>
              </div>

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
              >
                Place Order
                <span>→</span>
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default Cart;
