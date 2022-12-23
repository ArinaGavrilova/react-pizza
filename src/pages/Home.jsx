import { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/categories/Categories';
import Sort, { list } from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/skeleton/Skeleton';
import Pagination from '../components/pagination/Pagination';
import { SearchContext } from '../components/app/App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCateg = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num))
  }

  const fetchPizzas = () => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(
      `https://639b09b0d51415019748e526.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=asc${search}`
    )
    .then(res => {
      setItems(res.data);
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(el => el.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

  }, [categoryId, sortType, searchValue, currentPage])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })
  
      navigate(`?${queryString}`)
    }

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((el) => <PizzaBlock key={el.id} {...el} />);
  
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
  
  return (
    <div className='container'>
      <div className="content__top">
        <Categories value={categoryId} onChangeCateg={onChangeCateg}/>
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : pizzas
        }
      </div>   
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;
