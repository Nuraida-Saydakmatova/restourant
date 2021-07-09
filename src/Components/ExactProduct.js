import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { ApiMeal } from '../Api/Api'



function ExactProduct() {
    let { PrID } = useParams()
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get(ApiMeal + PrID)
            .then((response) => {
                setProduct(response.data.meals[0])
            })
            .catch((error) => {
                console.log(error);
            })
        return () => {

        }
    }, [])
    return (
        <>
            <div className={'exact_block'}>
                <div className = {'img_exact_box'}>
                    <img className={'img_exact'} src={product.strMealThumb} />
                </div>
                <div className = {'text_exact_box'}>
                    <h4>
                        TAGS:{product.strTags}
                        <hr />
                        AREA : {product.strArea}
                    </h4>
                    <br/>
                    <h5>
                        Description : {product.strInstructions}
                    </h5>
                </div>
            </div>

        </>
    )
}
export default ExactProduct;