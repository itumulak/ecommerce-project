import { urlFor } from '../lib/client'
import Link from 'next/link'
import React from 'react'

const HeroBanner = ({data: {smallText, midText, largeText, buttonText, image, desc, product}}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText}</h1>
        <img src={urlFor(image).url()} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner