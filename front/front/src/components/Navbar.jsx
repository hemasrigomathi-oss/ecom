// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Navbar() {

//   // Get cart items from Redux
//   const cartItems = useSelector(
//     (state) => state.cart.cartItems
//   );

//   // Calculate total quantity of products in cart
//   const cartCount = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//   return (
//     <nav className="navbar navbar-expand-lg bg-dark navbar-dark">

//       <div className="container">

//         {/* Logo */}
//         <Link
//           className="navbar-brand fw-bold"
//           to="/"
//         >
//           Shoppy
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navigation */}
//         <div
//           className="collapse navbar-collapse"
//           id="navbarNav"
//         >

//           <ul className="navbar-nav ms-auto">

//             {/* Home */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/"
//               >
//                 Home
//               </Link>
//             </li>

//             {/* Products */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/products"
//               >
//                 Products
//               </Link>
//             </li>

//             {/* Cart */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/cart"
//               >
//                 🛒 Cart

//                 {cartCount > 0 && (
//                   <sup
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: "bold",
//                       marginLeft: "2px",
//                       position: "relative",
//                       top: "-3px"
//                     }}
//                   >
//                     {cartCount}
//                   </sup>
//                 )}

//               </Link>
//             </li>

//             {/* Order */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/order"
//               >
//                 Order
//               </Link>
//             </li>

//             {/* My Orders */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/orders"
//               >
//                 My Order
//               </Link>
//             </li>

//             {/* Addresses */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/addresses"
//               >
//                 Addresses
//               </Link>
//             </li>

//             {/* About */}
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/about"
//               >
//                 About
//               </Link>
//             </li>

//           </ul>

//         </div>

//       </div>

//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navbar.css";

function Navbar() {

  // Get cart items from Redux
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // Calculate total quantity in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">

      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          Shoppy
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* Products */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
              >
                Products
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
              >
                Cart

                {cartCount > 0 && (
                  <sup className="cart-count">
                    {cartCount}
                  </sup>
                )}
              </Link>
            </li>

            {/* Order */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/order"
              >
                Order
              </Link>
            </li>

            {/* My Order */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/orders"
              >
                History
              </Link>
            </li>

            {/* Addresses */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/profile"
              >
                Profile
              </Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
              >
                About
              </Link>
            </li>
               <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
              >
                Contact
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;