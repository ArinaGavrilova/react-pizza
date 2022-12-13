import React from 'react';

import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Sort from './components/sort/Sort';
import PizzaBlock from './components/pizzaBlock/PizzaBlock';

import pizzas from './assets/pizza.json'

import './scss/app.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {
              pizzas.map((el) => (
                <PizzaBlock {...el}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


