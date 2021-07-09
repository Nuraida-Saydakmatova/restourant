import React, { useState, useEffect } from 'react';
import { ApiCategory } from '../Api/Api';
import { Link } from "react-router-dom";
import { Row, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'

function Category() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get(ApiCategory)
            .then((response) => {
                AOS.init({
                    offset: 100,
                    duration: 500,
                    easing: 'ease-out-cubic',
                    delay: 500,
                })
                setCategory(response.data.categories)
                // console.log(response.data.categories);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className={'category_img'}>
            <div className={'image'} ><h1 data-aos="zoom-in-up" className={'nameOfRes'}>Your magic day</h1></div>
            <div className={'menu'}>
                <h1>CATEGORIES</h1>
            </div>
            <div className={'card_block'}>
                {category.map((v) => {
                    return (
                        <div className={'test'}>
                            <div className={'bg_color_card'}>
                                <Card style={{ width: '18rem' }} className={'card'}>
                                    <Link to={"/Category/" + v.strCategory}>
                                        <Card.Img variant="top" className={'card_img'} src={v.strCategoryThumb} />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className={'title'}>{v.strCategory}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Category;