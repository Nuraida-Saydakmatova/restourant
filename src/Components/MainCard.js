import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Button } from 'react-bootstrap';
import ContextBasket from '../Context/Context';


const MainCard = ({ v }) => {
    const BasketHere = useContext(ContextBasket)
    return (
        <div className ={'test'}>
            <Card style={{ width: '16rem' }} className={'card_1'} >
                <Link to={"/meal/" + v.idMeal}>
                    <Card.Img className ={'card_img'} variant="top" src={v.strMealThumb} />
                </Link>
                <Card.Body>
                    <Card.Title className={'title1'}>
                        {v.strMeal}
                    </Card.Title>

                    <Button variant={BasketHere.basket.includes(v) ? 'outline-danger' : 'outline-warning'} onClick={() => BasketHere.toogle(v)} >{BasketHere.basket.includes(v) ? 'Удалить из корзины' : 'Добавить в корзину'}</Button>
                </Card.Body>
            </Card>

        </div>
    )
}
export default MainCard;