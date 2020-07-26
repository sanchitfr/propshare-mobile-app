import React from 'react';

import { Image } from 'react-bootstrap';


const GalleryItem = (props) =>(
    <div className='gallery-item'>
        <Image src={props.imageUrl} fluid/>
    </div>                   
        /* <Carousel 
        showThumbs={false} 
        showIndicators={false} 
        showStatus={false}
        infiniteLoop
        >
            {
                props.imageUrls.map(imageUrl =>
                    (
                        <div>
                            <Image src={imageUrl} fluid/>
                        </div>
                    ) 
                )
            }
        </Carousel>  */
);

export default GalleryItem;