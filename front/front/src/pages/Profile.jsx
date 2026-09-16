// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   addAddress,
//   updateAddress,
//   deleteAddress,
// } from "../redux/addressSlice";

// import "./profile.css";

// function Profile() {
//   const dispatch = useDispatch();

//   const addresses = useSelector(
//     (state) => state.addresses.addresses
//   );

//   const orders = useSelector(
//     (state) => state.orders.orders
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     country: "",
//   });

//   const [editId, setEditId] = useState(null);

//   const [showForm, setShowForm] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !formData.name.trim() ||
//       !formData.phone.trim() ||
//       !formData.address.trim() ||
//       !formData.country
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     if (editId) {
//       dispatch(
//         updateAddress({
//           id: editId,
//           updatedAddress: formData,
//         })
//       );

//       alert("Address updated successfully");
//     } else {
//       dispatch(addAddress(formData));

//       alert("Address added successfully");
//     }

//     setFormData({
//       name: "",
//       phone: "",
//       address: "",
//       country: "",
//     });

//     setEditId(null);
//     setShowForm(false);
//   };

//   const handleEdit = (address) => {
//     setFormData({
//       name: address.name,
//       phone: address.phone,
//       address: address.address,
//       country: address.country,
//     });

//     setEditId(address.id);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this address?"
//       )
//     ) {
//       dispatch(deleteAddress(id));
//     }
//   };

//   const handleAddAddress = () => {
//     setFormData({
//       name: "",
//       phone: "",
//       address: "",
//       country: "",
//     });

//     setEditId(null);
//     setShowForm(true);
//   };

//   const totalOrders = orders.length;

//   const totalSpent = orders.reduce(
//     (total, order) =>
//       total +
//       Number(
//         order.totalAmount ||
//           order.priceDetails?.totalAmount ||
//           0
//       ),
//     0
//   );

//   return (
//     <div className="profile-page">
//       <div className="profile-container">

//         <div className="profile-heading">
//           <p>MY ACCOUNT</p>
//           <h1>Profile</h1>
//         </div>

//         <div className="profile-hero">

//           <div className="profile-avatar">
//             HV
//           </div>

//           <div className="profile-intro">
//             <span>WELCOME BACK</span>
//             <h2>My Account</h2>
//             <p>
//               Manage your personal information,
//               addresses and shopping preferences.
//             </p>
//           </div>

//           <div className="profile-member">
//             <span>ACCOUNT</span>
//             <strong>ACTIVE</strong>
//           </div>

//         </div>

//         <div className="profile-stats">

//           <div className="profile-stat">
//             <span>ORDERS</span>
//             <strong>{totalOrders}</strong>
//           </div>

//           <div className="profile-stat">
//             <span>ADDRESSES</span>
//             <strong>{addresses.length}</strong>
//           </div>

//           <div className="profile-stat">
//             <span>TOTAL SPENT</span>
//             <strong>
//               ₹{totalSpent.toFixed(2)}
//             </strong>
//           </div>

//         </div>

//         <div className="profile-grid">

//           <div className="profile-information">

//             <div className="profile-section-title">
//               <div>
//                 <p>ACCOUNT DETAILS</p>
//                 <h3>Personal Information</h3>
//               </div>
//             </div>

//             <div className="profile-info-card">

//               <div className="profile-info-item">
//                 <span>PROFILE NAME</span>
//                 <strong>
//                   {addresses.length > 0
//                     ? addresses[0].name
//                     : "Your Name"}
//                 </strong>
//               </div>

//               <div className="profile-info-item">
//                 <span>PHONE</span>
//                 <strong>
//                   {addresses.length > 0
//                     ? addresses[0].phone
//                     : "Add your phone"}
//                 </strong>
//               </div>

//               <div className="profile-info-item">
//                 <span>COUNTRY</span>
//                 <strong>
//                   {addresses.length > 0
//                     ? addresses[0].country
//                     : "India"}
//                 </strong>
//               </div>

//               <div className="profile-info-item">
//                 <span>ACCOUNT TYPE</span>
//                 <strong>Customer</strong>
//               </div>

//             </div>

//             <div className="profile-section-title address-title">

//               <div>
//                 <p>DELIVERY INFORMATION</p>
//                 <h3>Saved Addresses</h3>
//               </div>

//               <button
//                 className="add-address-btn"
//                 onClick={handleAddAddress}
//               >
//                 + Add Address
//               </button>

//             </div>

//             {addresses.length === 0 ? (
//               <div className="no-address">

//                 <div className="no-address-icon">
//                   +
//                 </div>

//                 <h4>No Saved Addresses</h4>

//                 <p>
//                   Add a delivery address to make
//                   your checkout faster.
//                 </p>

//                 <button
//                   className="add-first-address"
//                   onClick={handleAddAddress}
//                 >
//                   Add Your First Address
//                 </button>

//               </div>
//             ) : (
//               <div className="address-list">

//                 {addresses.map((item, index) => (
//                   <div
//                     className="address-card"
//                     key={item.id}
//                   >

//                     <div className="address-card-top">

//                       <div className="address-number">
//                         0{index + 1}
//                       </div>

//                       <div className="address-name">
//                         <span>DELIVERY ADDRESS</span>
//                         <h4>{item.name}</h4>
//                       </div>

//                       <div className="address-actions">

//                         <button
//                           className="edit-address"
//                           onClick={() =>
//                             handleEdit(item)
//                           }
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="delete-address"
//                           onClick={() =>
//                             handleDelete(item.id)
//                           }
//                         >
//                           Delete
//                         </button>

//                       </div>

//                     </div>

//                     <div className="address-content">

//                       <div>
//                         <span>PHONE</span>
//                         <strong>{item.phone}</strong>
//                       </div>

//                       <div>
//                         <span>ADDRESS</span>
//                         <strong>{item.address}</strong>
//                       </div>

//                       <div>
//                         <span>COUNTRY</span>
//                         <strong>{item.country}</strong>
//                       </div>

//                     </div>

//                   </div>
//                 ))}

//               </div>
//             )}

//           </div>

//           <div className="profile-sidebar">

//             <div className="account-card">

//               <p>SHOPPING ACCOUNT</p>

//               <h3>Your Shopping</h3>

//               <div className="account-line">
//                 <span>Orders</span>
//                 <strong>{totalOrders}</strong>
//               </div>

//               <div className="account-line">
//                 <span>Saved Addresses</span>
//                 <strong>
//                   {addresses.length}
//                 </strong>
//               </div>

//               <div className="account-line">
//                 <span>Membership</span>
//                 <strong>Standard</strong>
//               </div>

//             </div>

//             <div className="profile-note">

//               <span>QUICK CHECKOUT</span>

//               <h3>
//                 Keep your address
//                 updated.
//               </h3>

//               <p>
//                 Your saved address can be
//                 selected directly during
//                 checkout for a faster
//                 shopping experience.
//               </p>

//             </div>

//           </div>

//         </div>

//         {showForm && (
//           <div className="profile-form-overlay">

//             <div className="profile-form-card">

//               <div className="profile-form-header">

//                 <div>
//                   <p>
//                     DELIVERY INFORMATION
//                   </p>

//                   <h3>
//                     {editId
//                       ? "Update Address"
//                       : "Add New Address"}
//                   </h3>
//                 </div>

//                 <button
//                   className="close-form-btn"
//                   onClick={() => {
//                     setShowForm(false);
//                     setEditId(null);
//                   }}
//                 >
//                   ×
//                 </button>

//               </div>

//               <form onSubmit={handleSubmit}>

//                 <div className="profile-form-grid">

//                   <div className="profile-form-group">
//                     <label>Name</label>

//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="Enter your name"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="profile-form-group">
//                     <label>Phone</label>

//                     <input
//                       type="text"
//                       name="phone"
//                       placeholder="9876543210"
//                       value={formData.phone}
//                       onChange={handleChange}
//                     />
//                   </div>

//                 </div>

//                 <div className="profile-form-group">
//                   <label>Address</label>

//                   <textarea
//                     name="address"
//                     rows="4"
//                     placeholder="Enter your complete address"
//                     value={formData.address}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>

//                 <div className="profile-form-group">
//                   <label>Country</label>

//                   <select
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                   >
//                     <option value="">
//                       Select Country
//                     </option>

//                     <option value="India">
//                       India
//                     </option>

//                     <option value="USA">
//                       USA
//                     </option>

//                     <option value="UK">
//                       UK
//                     </option>

//                     <option value="Canada">
//                       Canada
//                     </option>
//                   </select>
//                 </div>

//                 <div className="profile-form-actions">

//                   <button
//                     type="button"
//                     className="cancel-address-btn"
//                     onClick={() => {
//                       setShowForm(false);
//                       setEditId(null);
//                     }}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="save-address-btn"
//                   >
//                     {editId
//                       ? "Update Address"
//                       : "Save Address"}
//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Profile;




import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../redux/addressSlice";

import "./profile.css";

function Profile() {
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const addresses = useSelector(
    (state) => state.addresses.addresses
  );

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });

  const [editId, setEditId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);

      localStorage.setItem(
        "profileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.country
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      dispatch(
        updateAddress({
          id: editId,
          updatedAddress: formData,
        })
      );

      alert("Address updated successfully");
    } else {
      dispatch(addAddress(formData));

      alert("Address added successfully");
    }

    setFormData({
      name: "",
      phone: "",
      address: "",
      country: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      country: address.country,
    });

    setEditId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this address?"
      )
    ) {
      dispatch(deleteAddress(id));
    }
  };

  const handleAddAddress = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      country: "",
    });

    setEditId(null);
    setShowForm(true);
  };

  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (total, order) =>
      total +
      Number(
        order.totalAmount ||
          order.priceDetails?.totalAmount ||
          0
      ),
    0
  );

  const profileName =
    addresses.length > 0
      ? addresses[0].name
      : "Your Name";

  const profilePhone =
    addresses.length > 0
      ? addresses[0].phone
      : "Add your phone";

  const profileCountry =
    addresses.length > 0
      ? addresses[0].country
      : "India";

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-heading">
          <p>MY ACCOUNT</p>
          <h1>Profile</h1>
        </div>

        <div className="profile-hero">

          <div className="profile-avatar-wrapper">

            <button
              type="button"
              className="profile-avatar"
              onClick={() =>
                fileInputRef.current.click()
              }
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                />
              ) : (
                "HV"
              )}

              <span className="profile-camera">
                +
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="profile-image-input"
              onChange={handleProfileImage}
            />

            <button
              type="button"
              className="change-photo-btn"
              onClick={() =>
                fileInputRef.current.click()
              }
            >
              Change Photo
            </button>

          </div>

          <div className="profile-intro">

            <span>WELCOME BACK</span>

            <h2>
              {profileName}
            </h2>

            <p>
              Manage your personal information,
              delivery addresses and shopping
              preferences.
            </p>

          </div>

          <div className="profile-member">

            <span>ACCOUNT</span>

            <strong>
              ACTIVE
            </strong>

          </div>

        </div>

        <div className="profile-stats">

          <div className="profile-stat">

            <span>ORDERS</span>

            <strong>
              {totalOrders}
            </strong>

          </div>

          <div className="profile-stat">

            <span>ADDRESSES</span>

            <strong>
              {addresses.length}
            </strong>

          </div>

          <div className="profile-stat">

            <span>TOTAL SPENT</span>

            <strong>
              ₹{totalSpent.toFixed(2)}
            </strong>

          </div>

        </div>

        <div className="profile-grid">

          <div className="profile-information">

            <div className="profile-section-title">

              <div>

                <p>ACCOUNT DETAILS</p>

                <h3>
                  Personal Information
                </h3>

              </div>

            </div>

            <div className="profile-info-card">

              <div className="profile-info-item">

                <span>
                  PROFILE NAME
                </span>

                <strong>
                  {profileName}
                </strong>

              </div>

              <div className="profile-info-item">

                <span>
                  PHONE
                </span>

                <strong>
                  {profilePhone}
                </strong>

              </div>

              <div className="profile-info-item">

                <span>
                  COUNTRY
                </span>

                <strong>
                  {profileCountry}
                </strong>

              </div>

              <div className="profile-info-item">

                <span>
                  ACCOUNT TYPE
                </span>

                <strong>
                  Customer
                </strong>

              </div>

            </div>

            <div className="profile-section-title address-title">

              <div>

                <p>
                  DELIVERY INFORMATION
                </p>

                <h3>
                  Saved Addresses
                </h3>

              </div>

              <button
                className="add-address-btn"
                onClick={handleAddAddress}
              >
                + Add Address
              </button>

            </div>

            {addresses.length === 0 ? (

              <div className="no-address">

                <div className="no-address-icon">
                  +
                </div>

                <h4>
                  No Saved Addresses
                </h4>

                <p>
                  Add a delivery address to
                  make your checkout faster.
                </p>

                <button
                  className="add-first-address"
                  onClick={handleAddAddress}
                >
                  Add Your First Address
                </button>

              </div>

            ) : (

              <div className="address-list">

                {addresses.map((item, index) => (

                  <div
                    className="address-card"
                    key={item.id}
                  >

                    <div className="address-card-top">

                      <div className="address-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="address-name">

                        <span>
                          DELIVERY ADDRESS
                        </span>

                        <h4>
                          {item.name}
                        </h4>

                      </div>

                      <div className="address-actions">

                        <button
                          className="edit-address"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-address"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                    <div className="address-content">

                      <div>

                        <span>
                          PHONE
                        </span>

                        <strong>
                          {item.phone}
                        </strong>

                      </div>

                      <div>

                        <span>
                          ADDRESS
                        </span>

                        <strong>
                          {item.address}
                        </strong>

                      </div>

                      <div>

                        <span>
                          COUNTRY
                        </span>

                        <strong>
                          {item.country}
                        </strong>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          <div className="profile-sidebar">

            <div className="account-card">

              <p>
                SHOPPING ACCOUNT
              </p>

              <h3>
                Your Shopping
              </h3>

              <div className="account-line">

                <span>
                  Orders
                </span>

                <strong>
                  {totalOrders}
                </strong>

              </div>

              <div className="account-line">

                <span>
                  Saved Addresses
                </span>

                <strong>
                  {addresses.length}
                </strong>

              </div>

              <div className="account-line">

                <span>
                  Membership
                </span>

                <strong>
                  Standard
                </strong>

              </div>

            </div>

            <div className="profile-note">

              <span>
                QUICK CHECKOUT
              </span>

              <h3>
                Keep your address
                updated.
              </h3>

              <p>
                Your saved address can be
                selected directly during
                checkout for a faster
                shopping experience.
              </p>

            </div>

          </div>

        </div>

        {showForm && (

          <div className="profile-form-overlay">

            <div className="profile-form-card">

              <div className="profile-form-header">

                <div>

                  <p>
                    DELIVERY INFORMATION
                  </p>

                  <h3>
                    {editId
                      ? "Update Address"
                      : "Add New Address"}
                  </h3>

                </div>

                <button
                  type="button"
                  className="close-form-btn"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                  }}
                >
                  ×
                </button>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="profile-form-grid">

                  <div className="profile-form-group">

                    <label>
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="profile-form-group">

                    <label>
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="profile-form-group">

                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    rows="4"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>

                </div>

                <div className="profile-form-group">

                  <label>
                    Country
                  </label>

                  <select
                    name="country"
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

                </div>

                <div className="profile-form-actions">

                  <button
                    type="button"
                    className="cancel-address-btn"
                    onClick={() => {
                      setShowForm(false);
                      setEditId(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-address-btn"
                  >
                    {editId
                      ? "Update Address"
                      : "Save Address"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Profile;