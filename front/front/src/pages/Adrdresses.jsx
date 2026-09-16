import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../redux/addressSlice";

function Addresses() {
  const dispatch = useDispatch();

  const addresses = useSelector(
    (state) => state.addresses.addresses
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
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
  };

  const handleEdit = (address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      country: address.country,
    });

    setEditId(address.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  return (
    <div className="container py-5">

      <h2 className="mb-4">
        Address Management
      </h2>

      <div className="row">

        {/* Address Form */}
        <div className="col-md-5">

          <div className="card shadow-sm">

            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                {editId ? "Update Address" : "Add Address"}
              </h5>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country
                  </label>

                  <select
                    name="country"
                    className="form-select"
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

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  {editId ? "Update Address" : "Add Address"}
                </button>

              </form>

            </div>
          </div>

        </div>

        {/* Saved Addresses */}
        <div className="col-md-7">

          <h4 className="mb-3">
            Saved Addresses
          </h4>

          {addresses.length === 0 ? (
            <div className="alert alert-info">
              No saved addresses.
            </div>
          ) : (
            addresses.map((item) => (

              <div
                className="card shadow-sm mb-3"
                key={item.id}
              >

                <div className="card-body">

                  <h5>{item.name}</h5>

                  <p className="mb-1">
                    <strong>Phone:</strong>{" "}
                    {item.phone}
                  </p>

                  <p className="mb-1">
                    <strong>Address:</strong>{" "}
                    {item.address}
                  </p>

                  <p>
                    <strong>Country:</strong>{" "}
                    {item.country}
                  </p>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Addresses;