// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// import "./login.css";

// function Login() {
//   const navigate = useNavigate();





//   navigate("/profile");

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       setError("Please enter your email and password");
//       return;
//     }

//     const user = {
//       email: formData.email,
//     };

//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", "logged-in");

//     navigate("/cart");
//   };

//   return (
//     <div className="login-page">

//       <div className="login-container">

//         <div className="login-brand">
//           <span>VEYLO</span>
//           <p>PERSONAL SHOPPING ACCOUNT</p>
//         </div>

//         <div className="login-card">

//           <div className="login-header">
//             <p>WELCOME BACK</p>
//             <h1>Sign In</h1>
//             <span>
//               Enter your details to access your account.
//             </span>
//           </div>

//           <form onSubmit={handleSubmit}>

//             <div className="login-group">
//               <label>Email Address</label>

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="login-group">
//               <label>Password</label>

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             {error && (
//               <p className="login-error">
//                 {error}
//               </p>
//             )}

//             <button
//               type="submit"
//               className="login-btn"
//             >
            
//             </button>

//           </form>

//           <div className="login-footer">
//             <span>NEW TO VEYLO?</span>
//             <p>
//               Create your account and start shopping.
//             </p>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Login;



import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import "./login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password");
      return;
    }

    const user = {
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "logged-in");

    const product = location.state?.product;

    if (product) {
      dispatch(addToCart(product));
    }

    navigate("/cart");
  };

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-brand">
          <span>VEYLO</span>
          <p>PERSONAL SHOPPING ACCOUNT</p>
        </div>

        <div className="login-card">

          <div className="login-header">
            <p>WELCOME BACK</p>
            <h1>Sign In</h1>
            <span>
              Enter your details to access your account.
            </span>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="login-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="login-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-btn"
            >
              Sign In
            </button>

          </form>

          <div className="login-footer">
            <span>NEW TO VEYLO?</span>
            <p>
              Create your account and start shopping.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;