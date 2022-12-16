import { useState, useEffect } from 'react'

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/skeleton/Skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      fetch('https://639b09b0d51415019748e526.mockapi.io/items')
        .then((res) => res.json())
        .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
    }, [])

  return (
    <>
        <div className="content__top">
            <Categories />
            <Sort />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
            {
                isLoading ? 
                [...new Array(6)].map((_, i) => <Skeleton key={i}/>) : 
                items.map((el) => <PizzaBlock key={el.id} {...el} />)
            }
        </div>    
    </>
  )
}

export default Home;
