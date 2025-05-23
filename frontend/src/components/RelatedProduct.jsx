import React from 'react'
import { ShopContext } from '../context/shopContext'
import { useContext, useState, useEffect } from "react";
import Title from '../components/Title'
import ProductItem from '../components/ProductItem';

const RelatedProduct = ({category,subcategory}) => {
const {products} = useContext(ShopContext)
const [related , setRelated ] = useState([])

useEffect(() => {
    const relatedProducts = products.filter((product) => {
        return product.category === category && product.subcategory === subcategory
    })
    setRelated(relatedProducts.slice(0,5))
}
, [category, subcategory, products])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
{
    related.map((item,index)=>(
      <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
    ))
}
        </div>
        </div>
  )
}

export default RelatedProduct;