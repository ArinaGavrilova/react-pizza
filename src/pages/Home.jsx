import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import Categories from '../components/categories/Categories';
import Sort, { list } from '../components/sort/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/skeleton/Skeleton';
import Pagination from '../components/pagination/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);


  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(state => state.filter);
  
  const sortType = sort.sortProperty;

  const onChangeCateg = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num))
  }

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
          category, 
          search,
          currentPage, 
          sortType
        })
      );
    
    window.scrollTo(0, 0);
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
  }, [categoryId, sortType, searchValue, currentPage])

  useEffect(() => {
    getPizzas();
  }, [])

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
  }, [])

  const pizzas = items.map((el) => <PizzaBlock key={el.id} {...el} />);
  
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
  
  return (
    <div className='container'>
      <div className="content__top">
        <Categories value={categoryId} onChangeCateg={onChangeCateg}/>
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {
        status === 'error' ? (
          <div className='content_error-info'>
            <h2>Error! <icon>😕</icon></h2>
            <p>
              Failed to get pizzas. Try again later
            </p> 
          </div>
          ) : (
            <div className="content__items">
              {
                status === 'loading' ? skeletons : pizzas
              }
            
            </div>)
      }

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;
