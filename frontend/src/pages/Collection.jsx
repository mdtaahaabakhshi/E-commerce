import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState(""); 

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle subcategory filter change
  const handleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      Categories.length === 0 || Categories.includes(product.category);
    const matchesSubCategory =
      SubCategories.length === 0 || SubCategories.includes(product.subCategory);
    const matchesSearch =
      search === "" ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => { 
    if (sortOption === "low-high") {
      return a.price - b.price; // Sort by price: Low to High
    } else if (sortOption === "high-low") {
      return b.price - a.price; // Sort by price: High to Low
    } else {
      return 0; // Default (no sorting)
    }
  });

  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center if cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""} -z-10`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 ">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={handleCategory}
              />
              Men
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={handleCategory}
              />
              Women
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={handleCategory}
              />
              Kids
            </label>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={handleSubCategory}
              />
              Topwear
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={handleSubCategory}
              />
              Bottomwear
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={handleSubCategory}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTION"} />
          <select  value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        {sortedProducts.length >0 ? (

       
        <div className="grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {sortedProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              category={item.category}
              subCategory={item.subCategory}
            />
          ))}
        </div>  ):(
           <div className="text-center text-gray-500 mt-10">
           <p>No products found for "{search}"</p>
           {/* {search && <p>Search term: "{search}"</p>} */}
         </div>
        
         )}
      </div>
    </div>
  );
};

export default Collection;
