import React from "react";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } =
        useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("/collection")) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    const handleCloseSearch = () => {
        setSearch(""); // Reset the search term
        setShowSearch(false); // Close the search bar
    };

    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none text-sm bg-transparent text-gray-700 placeholder-gray-400 px-2"
                    type="text"
                    placeholder="Search for products..."
                />
                <img className="w-4" src={assets.search_icon} alt="" />
            </div>
            <img
                onClick={handleCloseSearch}
                className="inline w-3 cursor-pointer"
                src={assets.cross_icon}
                alt="close"
            />
        </div>
    ) : null;
};

export default SearchBar;
