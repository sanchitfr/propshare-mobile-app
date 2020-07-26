import React from 'react';

import GalleryCollection from '../../components/gallery-collection/gallery-collection.component';

import './gallery-page.styles.scss';


const GalleryPage = () => (
    <div className='gallery-page'>
        <h2>Gallery Page</h2>
        <GalleryCollection/>
    </div>
);

export default GalleryPage;