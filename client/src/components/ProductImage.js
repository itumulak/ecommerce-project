"use client"

import React, { useState } from 'react'
import Image from 'next/image';

import { urlFor } from "../lib/sanityClient";

const ProductImage = ({image}) => {
  const [imgIndex, setImgIndex] = useState(0)  
  const handleImgIndex = (e, index) => {
    e.preventDefault()
    setImgIndex(index)
  }

  return (
    <div className="image-container flex flex-col items-center md:items-baseline md:w-6/12">
        <Image src={Array.isArray(image) ? urlFor(image[imgIndex]).url() : urlFor(image).url()} alt="product" className="product-detail-image" />
        {Array.isArray(image) && image.length > 1 && (
          <div className="small-images-container">
              {image.map((item, i) => (
                  <Image onClick={(e) => handleImgIndex(e, i)} key={i} src={urlFor(item).url()} alt="product" className={`small-image ${i === imgIndex ? 'selected-image' : ''}`} />
              ))}
          </div>
        )}        
    </div>
  )
}

export default ProductImage