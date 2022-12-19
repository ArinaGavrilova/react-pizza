import { useState, useEffect } from 'react'

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/skeleton/Skeleton';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
      name: 'popularity',
      sortProperty: 'rating'
    });

    useEffect(() => {
      setIsLoading(true)
      fetch(`https://639b09b0d51415019748e526.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=asc`,
      )
        .then((res) => res.json())
        .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
      window.scrollTo(0, 0)
    }, [categoryId, sortType])

  return (
    <div className='container'>
        <div className="content__top">
            <Categories value={categoryId} onChangeCateg={(i) => setCategoryId(i)}/>
            <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
            {
                isLoading ? 
                [...new Array(6)].map((_, i) => <Skeleton key={i}/>) : 
                items.map((el) => <PizzaBlock key={el.id} {...el} />)
            }
        </div>    
    </div>
  )
}

export default Home;
