import React from 'react';

import Header from './components/header/Header';
import Categories from './components/categories/Categories';
import Sort from './components/sort/Sort';
import PizzaBlock from './components/pizzaBlock/PizzaBlock';

import './scss/app.scss'

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Мексиканская" price="500"/>
            <PizzaBlock title="Гавайская" price="450"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


