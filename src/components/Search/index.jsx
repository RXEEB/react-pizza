import React from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import {SearchContext} from '../../App'


const testDebounce = debounce(() => {
 console.log('сапрос на север')
}, 2050)                                      // не работает!!!!

export const Search = () => {
  const {searchValue,setSearchValue} = React.useContext(SearchContext)
  const inputRef = React.useRef()




const onClickClear = () => {
  setSearchValue('')
  inputRef.current.focus()
 
}

const onChangeInput = (event)=> {
  setSearchValue(event.target.value)
  testDebounce()
}
  
  // const [value, setValue] = React.useState('')



  // const onClickClear = () => {
  //   setSearchValue('')
  //   inputRef.current.focus()

  // }


  // const updateSearchValue = React.useCallback(
  //   debounce((str) => {
  //     console.log('ruslan')
  //   }, 250)
  //   , []
  // )



  return (

    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 52.966 52.966" ><path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
	c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
	C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
	S32.459,40,21.983,40z"/></svg>

      <input
        ref={inputRef}
        value={searchValue}
        onChange={onChangeInput}
        className={styles.input} placeholder='Поиск...' />
      {searchValue &&
        <svg
          onClick={onClickClear}
          className={styles.clearIcon} viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg"><path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" /></svg>
      }
      
      
    
    </div>
  )

}
