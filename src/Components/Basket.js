import React, { useContext } from 'react';
import { Button, Row } from 'react-bootstrap';
import ContextBasket from '../Context/Context';
import MainCard from './MainCard';


function Basket() {
    const BasketHere = useContext(ContextBasket)

    return (
        <div>
            {BasketHere.basket.length == 0 ? <div className={"basketDiv"}>
                <div>
                    <h1>BASKET IS EMPTY</h1>
                    <p style={{ color: 'black' }}>Let's add meals to the basket and order now</p>
                </div>
            </div> : <>
                <div>
                    <h1>
                        Вaшей корзине всего :({BasketHere.basket.length})
                    </h1>
                    <Row>
                        {BasketHere.basket.map((v) => {
                            return (<MainCard v={v} />)
                        })}
                    </Row>

                </div>

            </>}

        </div>
    )
}
export default Basket;