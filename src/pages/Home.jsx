import React from 'react'
import { Pagination } from '../components/Pagination';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Sceleton } from '../components/PizzaBlock/Skeleton'
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlices'
import axios from 'axios'
import {SearchContext} from '../App'

export const Home = () => {
  const dispatch = useDispatch()
  const {searchValue} = React.useContext(SearchContext)
  const { categoryId, sort , pageCount} = useSelector((state) => state.filter)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))

  }
  const onChangePage = (number) => {
    dispatch(setPageCount(number))

  }


  React.useEffect(() => {
    setIsLoading(true)
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search =${searchValue}` : ''


    axios.get(`https://6281a8369fac04c654078cb9.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })


    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, pageCount])

  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true
    }
    return false

  }).map((obj, id) => (<PizzaBlock {...obj} key={id} />))

  const sceletons = [...new Array(6)].map((_, id) => <Sceleton key={id} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? sceletons : pizzas}
      </div>
      <Pagination tion curentPage= {pageCount} onChangePage={onChangePage} />
    </div>
  )
}
