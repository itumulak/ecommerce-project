import React from "react"
import Link from "next/link"

import { urlFor } from "../lib/sanityClient";

const Product = ({data: { _id, mainImage: image, title, slug, price }}) => {
  return (
    <div key={_id}>
      <Link href={`/product/${slug.current}`}>
        <img width="300" height="300" src={urlFor(image[0]).url()} alt={title} className="product-image" />
        <p className="product-name">{title}</p>
        <p className="product-price">${price}</p>
      </Link>
    </div>
  )
}

export default Product