import React from 'react'
import Gallery from './Gallery'
import {GalleryAblum} from './GalleryAblum'

const GalleryPages = () => {
  return (
    <div>
        <div className=''>
           <GalleryAblum/>
        </div>
       
        <Gallery/>
    </div>
  )
}

export default GalleryPages