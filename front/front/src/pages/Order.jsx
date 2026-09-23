// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import "./order.css";

// import { clearCart } from "../redux/cartSlice";
// import { addOrder } from "../redux/orderSlice";

// function Order() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cartItems = location.state?.cartItems || [];
//   const cartTotal = Number(location.state?.cartTotal || 0);

//   const addresses = useSelector(
//     (state) => state.addresses.addresses
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     country: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleAddressSelect = (e) => {
//     const selectedId = Number(e.target.value);

//     const selectedAddress = addresses.find(
//       (item) => item.id === selectedId
//     );

//     if (selectedAddress) {
//       setFormData({
//         ...formData,
//         name: selectedAddress.name,
//         address: selectedAddress.address,
//         country: selectedAddress.country,
//         phone: selectedAddress.phone,
//       });

//       setErrors({});
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [name]: "",
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (formData.name.trim().length < 3) {
//       newErrors.name = "Name must be at least 3 characters";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     ) {
//       newErrors.email = "Enter a valid email address";
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     if (!formData.country) {
//       newErrors.country = "Country is required";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone =
//         "Phone number must contain exactly 10 digits";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//       navigate("/cart");
//       return;
//     }

//     if (cartTotal <= 0) {
//       alert("Invalid order amount.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:5500/api/payment/create-order",
//         {
//           amount: cartTotal,
//         }
//       );

//       console.log("Create Order Response:", response.data);

//       if (!response.data.success) {
//         throw new Error("Razorpay order creation failed");
//       }

//       const razorpayOrder = response.data.order;

//       console.log("Razorpay Order:", razorpayOrder);

//       const razorpayKey =
//         process.env.REACT_APP_RAZORPAY_KEY_ID;

//       console.log("Razorpay Key:", razorpayKey);

//       if (!razorpayKey) {
//         alert(
//           "Razorpay Key ID is missing. Check your .env file."
//         );

//         setLoading(false);
//         return;
//       }

//       console.log("Razorpay SDK:", window.Razorpay);

//       if (!window.Razorpay) {
//         alert(
//           "Razorpay SDK is not loaded. Check public/index.html."
//         );

//         setLoading(false);
//         return;
//       }

//       const options = {
//         key: razorpayKey,

//         amount: razorpayOrder.amount,

//         currency: razorpayOrder.currency,

//         name: "My Ecommerce",

//         description: "Ecommerce Order",

//         order_id: razorpayOrder.id,

//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },

//         notes: {
//           address: formData.address,
//           country: formData.country,
//         },

//         method: {
//           upi: true,
//           card: true,
//           netbanking: true,
//           wallet: true,
//           emi: true,
//           paylater: true,
//         },

//         theme: {
//           color: "#198754",
//         },

//         handler: async function (paymentResponse) {
//           console.log(
//             "Payment Response:",
//             paymentResponse
//           );

//           try {
//             const verifyResponse = await axios.post(
//               "http://localhost:5500/api/payment/verify",
//               {
//                 razorpay_order_id:
//                   paymentResponse.razorpay_order_id,

//                 razorpay_payment_id:
//                   paymentResponse.razorpay_payment_id,

//                 razorpay_signature:
//                   paymentResponse.razorpay_signature,
//               }
//             );

//             console.log(
//               "Verification Response:",
//               verifyResponse.data
//             );

//             if (verifyResponse.data.success) {
//               const orderData = {
//                 id: Date.now(),

//                 customerDetails: {
//                   ...formData,
//                 },

//                 products: cartItems,

//                 totalAmount: cartTotal,

//                 orderDate: new Date().toISOString(),

//                 payment: {
//                   method: "Razorpay",

//                   type: "Prepaid",

//                   status: "Paid",

//                   transactionId:
//                     paymentResponse.razorpay_payment_id,

//                   orderId:
//                     paymentResponse.razorpay_order_id,
//                 },
//               };

//               console.log(
//                 "Order Saved:",
//                 orderData
//               );

//               dispatch(addOrder(orderData));

//               dispatch(clearCart());

//               setLoading(false);

//               alert(
//                 "Payment successful! Order placed successfully."
//               );

//               navigate("/orders");
//             } else {
//               setLoading(false);

//               alert(
//                 "Payment verification failed."
//               );
//             }
//           } catch (error) {
//             console.error(
//               "Payment verification error:",
//               error
//             );

//             console.error(
//               "Server Response:",
//               error.response?.data
//             );

//             setLoading(false);

//             alert(
//               error.response?.data?.message ||
//                 "Payment verification failed."
//             );
//           }
//         },

//         modal: {
//           ondismiss: function () {
//             console.log(
//               "Razorpay payment window closed."
//             );

//             setLoading(false);
//           },
//         },
//       };

//       console.log(
//         "Razorpay Checkout Options:",
//         options
//       );

//       const razorpay =
//         new window.Razorpay(options);

//       razorpay.on(
//         "payment.failed",
//         function (response) {
//           console.error(
//             "Payment Failed:",
//             response.error
//           );

//           setLoading(false);

//           alert(
//             response.error?.description ||
//               "Payment failed."
//           );
//         }
//       );

//       razorpay.open();
//     } catch (error) {
//       console.error(
//         "Payment Error:",
//         error
//       );

//       console.error(
//         "Server Response:",
//         error.response?.data
//       );

//       setLoading(false);

//       alert(
//         error.response?.data?.message ||
//           "Unable to start payment."
//       );
//     }
//   };

//   return (
//     <div className="order-page">
//       <div className="order-wrapper">
//         <div className="order-card">

//           <div className="order-header">
//             <h3>Checkout</h3>
//           </div>

//           <div className="order-body">

//             {addresses.length > 0 && (
//               <div className="saved-address">
//                 <label className="order-label">
//                   Use Saved Address
//                 </label>

//                 <select
//                   className="order-select"
//                   onChange={handleAddressSelect}
//                   defaultValue=""
//                 >
//                   <option value="">
//                     Select a saved address
//                   </option>

//                   {addresses.map((item) => (
//                     <option
//                       key={item.id}
//                       value={item.id}
//                     >
//                       {item.name} - {item.phone}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             <form onSubmit={handlePayment}>

//               <div className="order-group">
//                 <label className="order-label">
//                   Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   className={`order-input ${
//                     errors.name ? "error" : ""
//                   }`}
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />

//                 {errors.name && (
//                   <span className="error-message">
//                     {errors.name}
//                   </span>
//                 )}
//               </div>

//               <div className="order-group">
//                 <label className="order-label">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   className={`order-input ${
//                     errors.email ? "error" : ""
//                   }`}
//                   placeholder="test@gmail.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />

//                 {errors.email && (
//                   <span className="error-message">
//                     {errors.email}
//                   </span>
//                 )}
//               </div>

//               <div className="order-group">
//                 <label className="order-label">
//                   Address
//                 </label>

//                 <textarea
//                   name="address"
//                   className={`order-textarea ${
//                     errors.address ? "error" : ""
//                   }`}
//                   placeholder="Enter your address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 ></textarea>

//                 {errors.address && (
//                   <span className="error-message">
//                     {errors.address}
//                   </span>
//                 )}
//               </div>

//               <div className="order-group">
//                 <label className="order-label">
//                   Country
//                 </label>

//                 <select
//                   name="country"
//                   className={`order-select ${
//                     errors.country ? "error" : ""
//                   }`}
//                   value={formData.country}
//                   onChange={handleChange}
//                 >
//                   <option value="">
//                     Select Country
//                   </option>

//                   <option value="India">
//                     India
//                   </option>

//                   <option value="USA">
//                     USA
//                   </option>

//                   <option value="UK">
//                     UK
//                   </option>

//                   <option value="Canada">
//                     Canada
//                   </option>
//                 </select>

//                 {errors.country && (
//                   <span className="error-message">
//                     {errors.country}
//                   </span>
//                 )}
//               </div>

//               <div className="order-group">
//                 <label className="order-label">
//                   Phone Number
//                 </label>

//                 <input
//                   type="text"
//                   name="phone"
//                   className={`order-input ${
//                     errors.phone ? "error" : ""
//                   }`}
//                   placeholder="9876543210"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />

//                 {errors.phone && (
//                   <span className="error-message">
//                     {errors.phone}
//                   </span>
//                 )}
//               </div>

//               <div className="order-total">
//                 <span className="order-total-label">
//                   Order Total
//                 </span>

//                 <span className="order-total-price">
//                   ₹{cartTotal.toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 type="submit"
//                 className="pay-button"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Opening Payment..."
//                   : `Pay Now ₹${cartTotal.toFixed(2)}`}
//               </button>

//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Order;




import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./order.css";

import { clearCart } from "../redux/cartSlice";
import { addOrder } from "../redux/orderSlice";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = location.state?.cartItems || [];
  const cartTotal = Number(location.state?.cartTotal || 0);

  const addresses = useSelector(
    (state) => state.addresses.addresses
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAddressSelect = (e) => {
    const selectedId = Number(e.target.value);

    const selectedAddress = addresses.find(
      (item) => item.id === selectedId
    );

    if (selectedAddress) {
      setFormData({
        ...formData,
        name: selectedAddress.name,
        address: selectedAddress.address,
        country: selectedAddress.country,
        phone: selectedAddress.phone,
      });

      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    if (cartTotal <= 0) {
      alert("Invalid order amount.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5500/api/payment/create-order",
        {
          amount: cartTotal,
        }
      );

      if (!response.data.success) {
        throw new Error("Razorpay order creation failed");
      }

      const razorpayOrder = response.data.order;

      const razorpayKey =
        process.env.REACT_APP_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        alert(
          "Razorpay Key ID is missing. Check your .env file."
        );

        setLoading(false);
        return;
      }

      if (!window.Razorpay) {
        alert(
          "Razorpay SDK is not loaded. Check public/index.html."
        );

        setLoading(false);
        return;
      }

      const options = {
        key: razorpayKey,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "My Ecommerce",

        description: "Ecommerce Order",

        order_id: razorpayOrder.id,

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        notes: {
          address: formData.address,
          country: formData.country,
        },

        theme: {
          color: "#198754",
        },

        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:5500/api/payment/verify",
              {
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {
              const orderData = {
                id: Date.now(),

                customerDetails: {
                  ...formData,
                },

                products: cartItems,

                totalAmount: cartTotal,

                orderDate: new Date().toISOString(),

                payment: {
                  method: "Razorpay",

                  type: "Prepaid",

                  status: "Paid",

                  transactionId:
                    paymentResponse.razorpay_payment_id,

                  orderId:
                    paymentResponse.razorpay_order_id,
                },
              };

              dispatch(addOrder(orderData));

              dispatch(clearCart());

              setLoading(false);

              alert(
                "Payment successful! Order placed successfully."
              );

              navigate("/history");
            } else {
              setLoading(false);

              alert(
                "Payment verification failed."
              );
            }
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setLoading(false);

            alert(
              error.response?.data?.message ||
                "Payment verification failed."
            );
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment Failed:",
            response.error
          );

          setLoading(false);

          alert(
            response.error?.description ||
              "Payment failed."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      setLoading(false);

      alert(
        error.response?.data?.message ||
          "Unable to start payment."
      );
    }
  };

  return (
    <div className="order-page">
      <div className="order-wrapper">
        <div className="order-card">

          <div className="order-header">
            <h3>Checkout</h3>
          </div>

          <div className="order-body">

            {addresses.length > 0 && (
              <div className="saved-address">
                <label className="order-label">
                  Use Saved Address
                </label>

                <select
                  className="order-select"
                  onChange={handleAddressSelect}
                  defaultValue=""
                >
                  <option value="">
                    Select a saved address
                  </option>

                  {addresses.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name} - {item.phone}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <form onSubmit={handlePayment}>

              <div className="order-group">
                <label className="order-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  className={`order-input ${
                    errors.name ? "error" : ""
                  }`}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <span className="error-message">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="order-group">
                <label className="order-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className={`order-input ${
                    errors.email ? "error" : ""
                  }`}
                  placeholder="test@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="error-message">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="order-group">
                <label className="order-label">
                  Address
                </label>

                <textarea
                  name="address"
                  className={`order-textarea ${
                    errors.address ? "error" : ""
                  }`}
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>

                {errors.address && (
                  <span className="error-message">
                    {errors.address}
                  </span>
                )}
              </div>

              <div className="order-group">
                <label className="order-label">
                  Country
                </label>

                <select
                  name="country"
                  className={`order-select ${
                    errors.country ? "error" : ""
                  }`}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Country
                  </option>

                  <option value="India">
                    India
                  </option>

                  <option value="USA">
                    USA
                  </option>

                  <option value="UK">
                    UK
                  </option>

                  <option value="Canada">
                    Canada
                  </option>
                </select>

                {errors.country && (
                  <span className="error-message">
                    {errors.country}
                  </span>
                )}
              </div>

              <div className="order-group">
                <label className="order-label">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  className={`order-input ${
                    errors.phone ? "error" : ""
                  }`}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <span className="error-message">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="order-total">
                <span className="order-total-label">
                  Order Total
                </span>

                <span className="order-total-price">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="pay-button"
                disabled={loading}
              >
                {loading
                  ? "Opening Payment..."
                  : `Pay Now ₹${cartTotal.toFixed(2)}`}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;