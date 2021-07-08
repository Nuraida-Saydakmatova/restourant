import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Category from './Components/Category';
import Navbar2 from './Navbar/Navbar';
import ExactProduct from './Components/ExactProduct';
import Meals from './Components/Meals';
import Searcher from './Components/Searcher';
import Country from './Components/Country';
import ContextBasket from './Context/Context';
import Basket from './Components/Basket';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,

} from "react-router-dom";


function App() {

    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('key') || '[]'))
    const add = (a) => { setBasket([...basket, a]) }
    const remove = (r) => { setBasket(basket.filter((f) => f !== r)) }
    const toogle = (t) => { !basket.includes(t) ? add(t) : remove(t) }



    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(basket))
    }, [basket])



    return (
        <>
            <div>
                <ContextBasket.Provider value={{
                    basket,
                    toogle,
                    add,
                }}>
                    <Router>
                        <div >
                            <Navbar2 />
                            <Switch>
                                <Route path="/Category/:id" children={<Meals />} />
                                <Route path="/meal/:PrID" children={<ExactProduct />} />
                                <Route path="/Searcher/:idForSearch" children={<Searcher />} />
                                <Route path="/CountryCategory/:idForCountries" children={<Country />} />
                                <Route path="/Basket" children={<Basket/>} />
                                {/* Home */}
                                <Route path='/'>
                                    <Category />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </ContextBasket.Provider>

            </div>
        </>
    )
}
export default App;

