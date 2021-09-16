import React, { useContext, useState, } from 'react';
import { Button, Row, Modal, Form } from 'react-bootstrap';
import ContextBasket from '../Context/Context';
import MainCard from './MainCard';
import InputMask from 'react-input-mask';
import { ApiBot } from '../Api/Api';
import axios from 'axios';




function Basket() {
    const BasketHere = useContext(ContextBasket);
    const [modal, setModal] = useState(false);
    const [Number, setNumber] = useState('');
    const [Adress, setAdress] = useState('');
    const [Name, setName] = useState('');
    const [checked, setChecked] = useState([]);
    const [myState, setMyState] = useState(false)


    const myCheck = (e, j) => {
        setChecked(p => {
            if (e) {
                return [...p, j]
            } else {
                return p.filter((k) => k.idMeal !== j.idMeal)
            }
        })

    }

    // console.log(checked)

    const modalWindow = () => {
        setModal(true)

    }
    const modalHide = () => {
        setModal(false)

    }

    const changeName = (e) => {
        setName(e);
        console.log(e);

    }
    const changeAdress = (y) => {
        setAdress(y)
    }
    const changeNum = (m) => {
        setNumber(m)
    }

    const Bot = () => {
        axios.post(ApiBot, {
            parse_mode: 'HTML',
            text: `NEW ORDER 
            Name:${Name}
            Adress:${Adress}
            Number:${Number}
            ${checked.map((v) => v.strMeal)}`,
            chat_id: -537486693,
            // -1001478902079
        })
        setMyState(true);

    }

    const myState1 = (q , v) => {
        if (myState || q) {
            BasketHere.setBasket(checked.filter(a => a.idMeal === v.idMeal))
            console.log(v.idMeal);
        }
    }

    return (
        <div>
            {BasketHere.basket.length == 0 ? <div className={"basketDiv"}>
                <div>
                    <h1>BASKET IS EMPTY</h1>
                    <p style={{ color: 'black' }}>
                        Let's add meals to the basket and order now
                    </p>
                </div>
            </div> : <>
                <div>
                    <h1>
                        In your basket({BasketHere.basket.length})
                    </h1>
                    <Row>
                        {BasketHere.basket.map((v) => {
                            return (<MainCard v={v} />)
                        })}
                    </Row>
                </div>
                <Button onClick={() => modalWindow()}>Order {BasketHere.basket.length} {BasketHere.basket.length == 1 ? 'meal' : 'meals'}</Button>
            </>}
            {modal ?
                <Modal show={modalWindow} onHide={modalHide} className={'padding'}>
                    <Modal.Header closeButton>
                        <Modal.Title>Потвердите заказ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ваше Ф.И.О<Form.Control type="text" placeholder="Ф.И.О" onChange={(o) => changeName(o.target.value)} />
                        <InputMask mask="+\9\96 999 999 999" onChange={(e) => changeNum(e.target.value)}>
                            {(inputProps) => <Form.Control {...inputProps} type="text" />}
                        </InputMask>
                        Адрес доставки<Form.Control type="text" placeholder="aдресс" onChange={(m) => changeAdress(m.target.value)} />
                        {BasketHere.basket.map((v, i) => {
                            return (
                                <>
                                    <Form.Check type="checkbox" onChange={(e) => myCheck(e.target.checked, v)} />
                                    <p>{v.strMeal}</p>
                                </>
                            )
                        })}
                        <hr />
                        <Form.Check type="checkbox" label={'Delete from basket'} onChange={(v) => myState1(v.target.checked, v)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => Bot()} disabled={Number === '' || Name === '' || Adress === '' || checked.length === 0}>
                            Confirm
                        </Button>
                        <Button variant="danger" onClick={modalHide}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal> : null}
        </div>
    )
}
export default Basket;
