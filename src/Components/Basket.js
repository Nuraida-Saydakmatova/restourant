import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ContextBasket from '../Context/Context';
import MainCard from './MainCard';


function Basket() {
    const BasketHere = useContext(ContextBasket)

    return (
        <div>
            {BasketHere.basket.length == 0 ? <div className={"basketDiv"}>
                <div>
                    <h3>BASKET IS EMPTY</h3>
                    <p style={{ color: 'black' }}>Let's add meals to the basket and order now</p>
                </div>
            </div> : <>
                <div>
                    <div className={'basket_1'}>
                        <div>
                            <h2>
                                Вaшей корзине всего :({BasketHere.basket.length})
                            </h2>
                        </div>
                        <div>
                            <Button variant='warning'>Order ({BasketHere.basket.length}) meal{BasketHere.basket.length > 1 ? 's' : ''}</Button>
                        </div>
                    </div>
                    <div className={'map_cards2'}>
                        {BasketHere.basket.map((v) => {
                            return (<MainCard v={v} />)
                        })}
                    </div>
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>

            </>}

        </div>
    )
}
export default Basket;