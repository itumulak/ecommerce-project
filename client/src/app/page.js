import React from 'react'
// import "./globals.css"

const page = () => {
  return (
    <>
      HeroBanner

      <div className="products-heading">
        <h2>Best selling Products</h2>
        <p>Speakers of many varriations</p>
      </div>

      <div className="products-container">
        {
          ['Product 1', 'Product 2'].map(product => <div key={product}>{product}</div>)
        }
      </div>
    </>
  )
}

export default page