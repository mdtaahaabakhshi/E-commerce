import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProduct = async () => {
    products.map((product) => {
      if (product._id === productId) {
        setProduct(product);
        setImage(product.image[0]);
      }
      
    });
  };

  useEffect(() => {
    fetchProduct();
    // products.map((product) => {
    //   if (product._id === productId) {
    //     setProduct(product);
    //     setImage(product.image[0]);
    //   }
    // });
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  }, [productId, products]);

  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className=" flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Info*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {" "}
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border bg-gray-100  px-4 py-2 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-6 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is a platform that allows businesses to sell
            products or services online. E-commerce websites typically include
            features such as product listings, shopping carts, secure payment
            gateways, and order tracking.{" "}
          </p>
          <p>
            They can cater to various industries, including retail, fashion,
            electronics, and more. They can cater to various industries,
            including retail, fashion, electronics, and more.
          </p>
        </div>
      </div>

      {/*  Display Related Products*/}

      <RelatedProduct category={product.category} subCategory={product.subCategory} /> 
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};
export default Product;
