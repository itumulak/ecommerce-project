import React from 'react'
import groq from 'groq';

import { client } from "../../../lib/client";
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '@/components';
import ProductImage from '@/components/ProductImage';

const page = async ({ params: { slug } }) => {
  const productQuery = groq`
    *[_type == "product" && slug.current == $slug][0]
  `
  const { mainImage: image, title, price, description, productCategory } = await client.fetch(productQuery, {slug});
  const recommendedQuery = groq`*[_type == "product" && productCategory._ref == $productCategory._ref && slug.current != $slug]`;
  const recommendedProducts = await client.fetch(recommendedQuery, {productCategory, slug});  

  return (
    <div className="product-detail-container">
      <ProductImage image={image}/>     
      <div className="product-detail-desc">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="reviews">
          <div className="flex flex-row">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>(20)</p>
        </div>
        <h4>Details:</h4>
        <p>{description}</p>
        <p className="price">${price}</p>
        <div className="quantity">
          <h3>Quantity:</h3>
          <p className="quantity-desc flex flex-row items-center">
            <span className="text-red-600"><AiOutlineMinus /></span>
            <span className="font-semibold">0</span>
            <span className="text-green-500"><AiOutlinePlus /></span>
          </p>
          <div className="buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container">
                {recommendedProducts.map((item) => <Product data={item}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page