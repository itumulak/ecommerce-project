import React from 'react'
import Link from 'next/link';

import { urlFor } from "../lib/sanityClient";

const FooterBanner = ({data: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image }}) => {
  return (
    <div className="mt-[120px] py-[100px] px-[40px] lg:h-[400px] text-white w-full bg-[#f02d34] rounded-2xl relative">
      <img 
          src={urlFor(image).url()} 
          alt="headphones" 
          className="block lg:absolute lg:top-[-25%] lg:left-[25%]" 
      />  
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="left">
          <p className="text-center lg:text-left m-4">{discount}</p>
          <h3 className="font-black text-center text-[48px] lg:text-left lg:text-[80px]">{largeText1}</h3>
          <p className="text-center lg:text-left m-4">{largeText2}</p>
          <p className="text-center lg:text-left m-4">{saleTime}</p>
        </div>
        <div className="right">
          <p className="text-center lg:text-left text-lg">{smallText}</p>
          <h3 className="text-center lg:text-left font-extrabold text-[60px]">{midText}</h3>
          <p className="text-lg">{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button" className="text-center w-full lg:w-max lg:text-left p-4 mt-4 bg-[#f2f1f4] text-black rounded-2xl relative">{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner