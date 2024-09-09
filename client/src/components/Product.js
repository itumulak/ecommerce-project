import React from "react"
import Link from "next/link"

import { urlFor } from "../lib/client";

const Product = ({data: { _id: key, mainImage: image, title, slug, price }}) => {
  return (
    <div key={key}>
      <Link href={`/product/${slug.current}`}>
        <img src={urlFor(image).url()} alt={title} className="product-image" />
        <p className="product-name">{title}</p>
        <p className="product-price">${price}</p>
      </Link>
    </div>
  )
}

export default Product