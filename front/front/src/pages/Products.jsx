
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/productSlice";
// import ProductCard from "../components/ProductCard";
// import "./products.css";

// function Products() {
//   const dispatch = useDispatch();

//   const { products, loading, error } = useSelector(
//     (state) => state.products
//   );

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="products-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="products-error">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="products-page">

//       <div className="products-heading">
//         <p>OUR COLLECTION</p>

//         <h1>Explore Products</h1>

//         <span>
//           Find your favorite products at great prices.
//         </span>
//       </div>

//       <div className="products-grid">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//           />
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Products;





import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

import "./products.css";

function Products() {
  const dispatch = useDispatch();

  const { products, status, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  if (status === "loading") {
    return (
      <div className="products-loading">
        <p>LOADING PRODUCTS</p>
        <h2>Discovering Products...</h2>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="products-error">
        <p>PRODUCT ERROR</p>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="products-page">

      <div className="products-container">

        <div className="products-heading">
          <div>
            <p>OUR COLLECTION</p>
            <h1>Products</h1>
          </div>

          <span>
            {filteredProducts.length} PRODUCTS
          </span>
        </div>

        <div className="product-controls">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item === "all"
                    ? "All Categories"
                    : item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <label>Sort By</label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">
                Default
              </option>

              <option value="low-high">
                Price Low → High
              </option>

              <option value="high-low">
                Price High → Low
              </option>
            </select>
          </div>

          {(search || category !== "all" || sort !== "default") && (
            <button
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <span>⌕</span>
            <h2>No Products Found</h2>
            <p>
              Try changing your search or category filter.
            </p>

            <button onClick={clearFilters}>
              Show All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Products;