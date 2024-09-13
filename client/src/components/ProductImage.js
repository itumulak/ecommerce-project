"use client"

import React, { useState } from 'react'

import { urlFor } from "../lib/client";

const ProductImage = ({image}) => {
  const [imgIndex, setImgIndex] = useState(0)  
  const handleImgIndex = (e, index) => {
    e.preventDefault()
    setImgIndex(index)
  }

  return (
    <div className="image-container">
        <img src={Array.isArray(image) ? urlFor(image[imgIndex]).url() : urlFor(image).url()} alt="product" className="product-detail-image" />
        {Array.isArray(image) && image.length > 1 && (
          <div className="small-images-container">
              {image.map((item, i) => (
                  <img onClick={(e) => handleImgIndex(e, i)} key={i} src={urlFor(item).url()} alt="product" className={`small-image ${i === imgIndex ? 'selected-image' : ''}`} />
              ))}
          </div>
        )}        
    </div>
  )
}

export default ProductImage