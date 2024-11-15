import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '../lib/sanityClient'

const HeroBanner = ({data: {smallText, midText, largeText, buttonText, image, desc, product}}) => {
  return (
    <div className="py-24 px-12 bg-[#dcdcdc] rounded-2xl relative">
      <Image 
        src={urlFor(image).url()} 
        alt="headphones" 
        className="lg:absolute lg:w-[450px] lg:h-[450px] lg:top-0 lg:right-[20%]" 
      />

      <div>
        <p className="text-lg text-center lg:text-left">{smallText}</p>
        <h3 className="text-4xl lg:text-7xl">{midText}</h3>
        <h1>{largeText}</h1>

        <div>
          <Link href={`/product/${product}`}>
            <button 
              type="button"
              className="w-full lg:w-max rounded-2xl py-3 px-4 bg-[#f02d34] text-white mt-10 text-lg font-semibold cursor-pointer z-10"
            >
              BUTTON TEXT
            </button>
          </Link>
          <div className="mt-8 lg:mt-0 lg:absolute lg:right-[5%] lg:bottom-[5%] lg:w-[300px] flex flex-col text-[#324d67]">
            <h5 className="mb-3 text-lg self-end font-bold">Description</h5>
            <p className="color-[#5f5f5f] font-light text-end">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner