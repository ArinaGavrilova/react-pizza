import { useState, useEffect } from 'react';

import Categories from '../components/categories/Categories';
import Sort from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/skeleton/Skeleton';
import Pagination from '../components/pagination/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'popularity',
    sortProperty: 'rating'
  });

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://639b09b0d51415019748e526.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=asc${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
      setItems(arr)
      setIsLoading(false)
    })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((el) => <PizzaBlock key={el.id} {...el} />);
  
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
  
  return (
    <div className='container'>
        <div className="content__top">
            <Categories value={categoryId} onChangeCateg={(i) => setCategoryId(i)}/>
            <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
            {
                isLoading ? skeletons : pizzas
            }
        </div>   
        <Pagination onChangePage={num => setCurrentPage(num)} />
    </div>
  )
}

export default Home;
