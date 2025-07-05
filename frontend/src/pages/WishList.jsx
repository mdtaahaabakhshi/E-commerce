import React from 'react'
import ProductItem from '../components/ProductItem'
import { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title'
const WishList = () => {
  const { wishlistItems, products } = useContext(ShopContext);
const wishlistProducts = products.filter(p => wishlistItems.includes(p._id));
  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
          <Title text1={"YOUR"} text2={"WISHLIST"} />
      </div>
      <div className="grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <ProductItem key={product._id} product={product} 
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  )

}

export default WishList