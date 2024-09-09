import React from 'react'

import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client"; 

const page = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);
  
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery)  

  return (
    <>
      <HeroBanner data={bannerData.length > 0 && bannerData[0]}/>

      <div className="products-heading">
        <h2>Best selling Products</h2>
        <p>Speakers of many varriations</p>
      </div>

      <div className="products-container">
        {
          products?.map(product => <Product key={product._id} data={product}/>)
        }
      </div>

      <FooterBanner/> 
    </>
  )
}

export default page