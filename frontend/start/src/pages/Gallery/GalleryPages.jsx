import React from 'react'
import Gallery from './Gallery'
import {GalleryAblum} from './GalleryAblum'

const GalleryPages = () => {
  return (
    <div>
        <div className='mt-[100px] md:px-10'>
           <GalleryAblum/>
        </div>
       
        <Gallery/>
    </div>
  )
}

export default GalleryPages