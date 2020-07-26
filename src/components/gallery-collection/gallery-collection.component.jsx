import React from 'react';

import { Button, Card, Row, Col } from 'react-bootstrap';

import GalleryItem from '../gallery-item/gallery-item.component';

import './gallery-collection.styles.scss';

const GalleryCollection = () => {
    const imageUrls = [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
        "https://images.unsplash.com/46/iYvDeqVGRbebiQv2PIJi_DSC_8407.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
        "https://images.unsplash.com/46/iYvDeqVGRbebiQv2PIJi_DSC_8407.JPG?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
    ];
    const titles = ["Mountains", "Cityscapes", "Sky", "Title1", "Title2", "Title3"];
    return(
    <Row className="gallery-collection">
            {   
                titles.map((title, index) => ( 
                    <Col className="gallery-col" md={4} xs={12}>
                        <Card style={{ width: '15rem', margin : "10px" }}>
                            <Card.Body>
                                {
                                    <GalleryItem imageUrl={imageUrls[index]}/>
                                }
                                <Card.Title>{title}</Card.Title>
                            </Card.Body>
                            <div className="buttons">
                                <Button className="heart" variant="outline-danger"><i class="fas fa-heart"></i></Button>
                                <Button className="comment" variant="secondary"><i class="fas fa-comment-alt"></i></Button>
                            </div>
                        </Card>
                    </Col>
                ))
            }
    </Row>
)};

export default GalleryCollection;
