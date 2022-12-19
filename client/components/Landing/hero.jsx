import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div style={{width: '100%', height:'700px', position:'relative'}}>
        <Image src="https://res.cloudinary.com/dmdiv5ldu/image/upload/v1670569575/pexels-emily-ranquist-1205651_lsjqss.jpg"
        // width={500}
        // height={500}
        // objectFit='contain'
        fill
        />
    </div>
  )
}
