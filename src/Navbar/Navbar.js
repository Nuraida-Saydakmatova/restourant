import axios from 'axios';
import React, { useState, useEffect , useContext} from 'react';
import { Navbar, Form, FormControl, Button, Nav, NavDropdown } from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import { Api } from '../Api/Api';
import ContextBasket from '../Context/Context';

function Navbar2() {

    const basket1 = useContext(ContextBasket)

    const [navbar, setNavbar] = useState([]);
    const [value, setValue] = useState('');
    const [country, setCountry] = useState('')
    let historySearch = useHistory();
    let historyCountry = useHistory();
    // const params = useParams();
    useEffect(() => {
        axios.get(Api)
            .then((response) => {
                setNavbar(response.data.meals);
                // console.log(response.data.meals);
            })
            .catch((error) => {
                console.log();
            })
        return () => {

        }
    }, []);
    //To send
    const handleClick = () => {
        historySearch.push(`/Searcher/${value}`);

    }
    //Input change
    const change = (p) => {
        setValue(p)
        console.log(value);
    }
    const changeCountry = (v) => {
        historyCountry.push(`/CountryCategory/${v.strArea}`)
        console.log(country);
    }

    const bin =() => {
        // setBinColor()
    }
    return (
        <>
            <Navbar bg="secondary" expand="lg">
                <Navbar.Brand href="/">Главная</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={'/Basket'}>Basket({basket1.basket.length})</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item >{navbar.map((v, i) => {
                                return (
                                    <NavDropdown.Item key={i} onClick={() => changeCountry(v)}> {v.strArea} </NavDropdown.Item>
                                )
                            })}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl  onChange={(e) => change(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-warning" onClick={() => handleClick()} >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
export default Navbar2;
