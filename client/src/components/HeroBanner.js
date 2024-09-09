import { urlFor } from '../lib/client'
import Link from 'next/link'
import React from 'react'

const HeroBanner = ({data}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{data.smallText}</p>
        <h3>{data.midText}</h3>
        <h1>{data.largeText}</h1>
        <img src={urlFor(data.image).url()} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${data.product}`}>
            <button type="button">BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{data.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner