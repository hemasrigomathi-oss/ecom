import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "../redux/orderSlice";
import "./history.css";

function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* =========================
            HEADING
        ========================== */}

        <div className="orders-heading">
          <p>YOUR PURCHASES</p>
          <h1>Order History</h1>
        </div>

        {/* =========================
            NO ORDERS
        ========================== */}

        {orders.length === 0 ? (
          <div className="empty-orders">

            <div className="empty-orders-icon">
              ◌
            </div>

            <h2>No Orders Yet</h2>

            <p>
              Your order history will appear here.
            </p>

          </div>
        ) : (
          <>

            {/* =========================
                CLEAR ORDERS
            ========================== */}

            <div className="orders-actions">

              <button
                className="clear-orders-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear your order history?"
                    )
                  ) {
                    dispatch(clearOrders());
                  }
                }}
              >
                Clear Order History
              </button>

            </div>

            {/* =========================
                ORDERS LIST
            ========================== */}

            <div className="orders-list">

              {orders.map((order, index) => {

                /* =========================
                   SAFE DATA
                ========================== */

                const payment =
                  order.payment || {};

                const customer =
                  order.customerDetails || {};

                const priceDetails =
                  order.priceDetails || {};

                const products =
                  order.products || [];

                /* =========================
                   ORDER ID
                ========================== */

                const orderId =
                  order.orderId ||
                  order.id ||
                  index + 1;

                /* =========================
                   TOTAL ITEMS
                ========================== */

                const totalItems =
                  products.reduce(
                    (total, product) =>
                      total +
                      Number(
                        product.quantity || 0
                      ),
                    0
                  );

                /* =========================
                   SUBTOTAL
                ========================== */

                const subtotal =
                  priceDetails.subtotal ??
                  products.reduce(
                    (total, product) =>
                      total +
                      Number(
                        product.price || 0
                      ) *
                        Number(
                          product.quantity || 0
                        ),
                    0
                  );

                /* =========================
                   TOTAL AMOUNT
                ========================== */

                const totalAmount =
                  priceDetails.totalAmount ??
                  order.totalAmount ??
                  subtotal;

                /* =========================
                   PAYMENT METHOD
                ========================== */

                const paymentMethod =
                  payment.method ||
                  order.paymentMethod ||
                  "Razorpay";

                /* =========================
                   PAYMENT TYPE
                   PREPAID
                ========================== */

                const paymentType =
                  payment.type ||
                  order.paymentType ||
                  "Prepaid";

                /* =========================
                   PAYMENT STATUS
                ========================== */

                const paymentStatus =
                  payment.status ||
                  order.paymentStatus ||
                  "Paid";

                /* =========================
                   TRANSACTION ID
                ========================== */

                const transactionId =
                  payment.transactionId ||
                  payment.paymentId ||
                  order.paymentId ||
                  "N/A";

                /* =========================
                   RAZORPAY ORDER ID
                ========================== */

                const razorpayOrderId =
                  payment.orderId ||
                  payment.razorpayOrderId ||
                  order.razorpayOrderId ||
                  "N/A";

                /* =========================
                   EXPANDED
                ========================== */

                const isExpanded =
                  expandedOrder === orderId;

                return (
                  <div
                    className={`order-card ${
                      isExpanded
                        ? "order-card-expanded"
                        : ""
                    }`}
                    key={orderId}
                  >

                    {/* =========================
                        COMPACT ORDER HEADER
                    ========================== */}

                    <div className="compact-order">

                      <div className="compact-order-left">

                        {/* ORDER NUMBER */}

                        <div className="compact-order-number">

                          <span>
                            ORDER
                          </span>

                          <h2>
                            #{orderId}
                          </h2>

                        </div>

                        {/* DATE */}

                        <div className="compact-order-date">

                          <span>
                            DATE
                          </span>

                          <strong>
                            {order.orderDate
                              ? new Date(
                                  order.orderDate
                                ).toLocaleDateString(
                                  "en-IN"
                                )
                              : "N/A"}
                          </strong>

                        </div>

                      </div>

                      <div className="compact-order-right">

                        {/* ITEMS */}

                        <div className="compact-items">

                          <span>
                            ITEMS
                          </span>

                          <strong>
                            {totalItems}
                          </strong>

                        </div>

                        {/* PAYMENT */}

                        <div className="compact-payment">

                          <span>
                            PAYMENT
                          </span>

                          <strong>
                            {paymentMethod}
                          </strong>

                        </div>

                        {/* TOTAL */}

                        <div className="compact-total">

                          <span>
                            TOTAL
                          </span>

                          <strong>
                            ₹
                            {Number(
                              totalAmount
                            ).toFixed(2)}
                          </strong>

                        </div>

                        {/* STATUS */}

                        <span className="compact-status">
                          {order.orderStatus ||
                            paymentStatus}
                        </span>

                      </div>

                    </div>

                    {/* =========================
                        VIEW DETAILS
                    ========================== */}

                    <div className="order-view-bar">

                      <button
                        className="view-details-btn"
                        onClick={() =>
                          toggleDetails(
                            orderId
                          )
                        }
                      >

                        {isExpanded
                          ? "Hide Details"
                          : "View Details"}

                        <span
                          className={
                            isExpanded
                              ? "arrow rotate"
                              : "arrow"
                          }
                        >
                          ↓
                        </span>

                      </button>

                    </div>

                    {/* =========================
                        FULL DETAILS
                    ========================== */}

                    {isExpanded && (
                      <div className="order-details">

                        {/* =========================
                            CUSTOMER
                        ========================== */}

                        <div className="order-section">

                          <h3>
                            Customer Information
                          </h3>

                          <div className="details-grid">

                            <div>

                              <span>
                                Name
                              </span>

                              <strong>
                                {customer.name ||
                                  "N/A"}
                              </strong>

                            </div>

                            <div>

                              <span>
                                Email
                              </span>

                              <strong>
                                {customer.email ||
                                  "N/A"}
                              </strong>

                            </div>

                            <div>

                              <span>
                                Phone
                              </span>

                              <strong>
                                {customer.phone ||
                                  "N/A"}
                              </strong>

                            </div>

                            <div>

                              <span>
                                Total Items
                              </span>

                              <strong>
                                {totalItems}
                              </strong>

                            </div>

                          </div>

                        </div>

                        {/* =========================
                            ADDRESS
                        ========================== */}

                        <div className="order-section">

                          <h3>
                            Delivery Address
                          </h3>

                          <div className="address-box">

                            <p>
                              {customer.address ||
                                "N/A"}
                            </p>

                            {(customer.city ||
                              customer.state) && (
                              <p>

                                {customer.city
                                  ? `${customer.city}, `
                                  : ""}

                                {customer.state ||
                                  ""}

                              </p>
                            )}

                            {(customer.country ||
                              customer.pincode) && (
                              <p>

                                {customer.country ||
                                  ""}

                                {customer.pincode
                                  ? ` - ${customer.pincode}`
                                  : ""}

                              </p>
                            )}

                          </div>

                        </div>

                        {/* =========================
                            PRODUCTS
                        ========================== */}

                        <div className="order-section">

                          <h3>
                            Order Items
                          </h3>

                          <div className="products-table">

                            <div className="products-header">

                              <span>
                                Product
                              </span>

                              <span>
                                Qty
                              </span>

                              <span>
                                Price
                              </span>

                              <span>
                                Total
                              </span>

                            </div>

                            {products.length === 0 ? (
                              <div className="no-products">
                                No products found
                              </div>
                            ) : (
                              products.map(
                                (
                                  product,
                                  productIndex
                                ) => {

                                  const quantity =
                                    Number(
                                      product.quantity ||
                                        0
                                    );

                                  const price =
                                    Number(
                                      product.price ||
                                        0
                                    );

                                  return (
                                    <div
                                      className="product-row"
                                      key={
                                        product.id ||
                                        productIndex
                                      }
                                    >

                                      <span>
                                        {product.title ||
                                          "Product"}
                                      </span>

                                      <span>
                                        {quantity}
                                      </span>

                                      <span>
                                        ₹
                                        {price.toFixed(
                                          2
                                        )}
                                      </span>

                                      <span>
                                        ₹
                                        {(
                                          price *
                                          quantity
                                        ).toFixed(
                                          2
                                        )}
                                      </span>

                                    </div>
                                  );
                                }
                              )
                            )}

                          </div>

                        </div>

                        {/* =========================
                            PAYMENT INFORMATION
                        ========================== */}

                        <div className="order-section">

                          <h3>
                            Payment Information
                          </h3>

                          <div className="payment-grid">

                            {/* PAYMENT METHOD */}

                            <div>

                              <span>
                                Payment Method
                              </span>

                              <strong>
                                {paymentMethod}
                              </strong>

                            </div>

                            {/* PAYMENT TYPE */}

                            <div>

                              <span>
                                Payment Type
                              </span>

                              <strong>
                                {paymentType}
                              </strong>

                            </div>

                            {/* PAYMENT STATUS */}

                            <div>

                              <span>
                                Payment Status
                              </span>

                              <strong className="paid-text">
                                {paymentStatus}
                              </strong>

                            </div>

                            {/* TRANSACTION ID */}

                            <div>

                              <span>
                                Transaction ID
                              </span>

                              <strong>
                                {transactionId}
                              </strong>

                            </div>

                            {/* RAZORPAY ORDER ID */}

                            <div>

                              <span>
                                Razorpay Order ID
                              </span>

                              <strong>
                                {razorpayOrderId}
                              </strong>

                            </div>

                          </div>

                        </div>

                        {/* =========================
                            PRICE SUMMARY
                        ========================== */}

                        <div className="order-section">

                          <h3>
                            Price Summary
                          </h3>

                          <div className="price-summary">

                            <div>

                              <span>
                                Subtotal
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  subtotal
                                ).toFixed(2)}
                              </strong>

                            </div>

                            <div>

                              <span>
                                Delivery
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  priceDetails.deliveryCharge ||
                                    0
                                ).toFixed(2)}
                              </strong>

                            </div>

                            <div>

                              <span>
                                Discount
                              </span>

                              <strong>
                                -₹
                                {Number(
                                  priceDetails.discount ||
                                    0
                                ).toFixed(2)}
                              </strong>

                            </div>

                            <div>

                              <span>
                                Tax
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  priceDetails.tax ||
                                    0
                                ).toFixed(2)}
                              </strong>

                            </div>

                            <div className="grand-total">

                              <span>
                                Grand Total
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  totalAmount
                                ).toFixed(2)}
                              </strong>

                            </div>

                          </div>

                        </div>

                        {/* =========================
                            ORDER TIMELINE
                        ========================== */}

                        <div className="order-timeline">

                          <div className="timeline-step active">

                            <span>
                              01
                            </span>

                            <p>
                              Order Placed
                            </p>

                          </div>

                          <div className="timeline-line"></div>

                          <div className="timeline-step">

                            <span>
                              02
                            </span>

                            <p>
                              Processing
                            </p>

                          </div>

                          <div className="timeline-line"></div>

                          <div className="timeline-step">

                            <span>
                              03
                            </span>

                            <p>
                              Shipped
                            </p>

                          </div>

                          <div className="timeline-line"></div>

                          <div className="timeline-step">

                            <span>
                              04
                            </span>

                            <p>
                              Delivered
                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default Orders;