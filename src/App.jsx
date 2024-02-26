import React, { useCallback, useEffect, useState } from 'react';
import itemsService from './services/itemsService';
import Table from './components/table';
import itemsAdapter from './helpers/itemsAdapter'
import { Spinner } from 'flowbite-react';
import './App.css'

function App() {
  const [products, setProducts] = useState();
  const [filterPrice, setFilterPrice] = useState();
  const [filterName, setFilterName] = useState();
  const [filterBrand, setFilterBrand] = useState();
  const [filters, setFilters] = useState();
  const [loading, setLoading] = useState(true)

  const data = {
    "action": "get_ids",
    "params": { "offset": 0, "limit": 50 }
  }

  const getItems = useCallback(async (data) => {
    try {
      setLoading(true)
      const getAllItemsIds = await itemsService.getAllItems(data);
      if (getAllItemsIds.result) {
        const data = {
          "action": "get_items",
          "params": { "ids": getAllItemsIds.result }
        }
        const getAllItems = await itemsService.getItems(data);
        const allItems = itemsAdapter(getAllItems);
        setProducts(allItems)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false);
      console.log(err);
      getItems(data)
    }

  }, [])

  const getFiltredItems = useCallback(async (price, productName, brand) => {
    try {
      setLoading(true)
      const filteredData = {
        "action": "filter",
        "params": {}
      };

      if (price) {
        filteredData.params.price = price;
      }
      if (productName) {
        filteredData.params.product = productName;
      }
      if (brand) {
        filteredData.params.brand = brand;
      }

      const getAllItemsIds = await itemsService.getAllItems(filteredData);
      if (getAllItemsIds.result) {
        const data = {
          "action": "get_items",
          "params": { "ids": getAllItemsIds.result }
        }
        const getAllItems = await itemsService.getItems(data);

        const allFiltredItems = itemsAdapter(getAllItems);
        setProducts(allFiltredItems)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
      getFiltredItems(data)
    }
  }, [])

  useEffect(() => {
    if (filterPrice || filterName || filterBrand) {
      getFiltredItems(parseInt(filterPrice), filterName, filterBrand)
    } else {
      getItems(data)
    }

    setFilters(false)
  }, [filters])

  useEffect(() => {
    if (filterName === '' && filterPrice === '' && filterBrand === '') {
      getItems()
    }
  }, [filterName, filterPrice, filterBrand])



  return (
    loading ? 
      <div className='spinner-container'>
        <Spinner className='spinner-loading' aria-label="Default status example" />
      </div> :
      <div>
        <div className="filter">
          <input
            type="text"
            value={filterName}
            onInput={(e) => {
              setFilterName(e.target.value)
              setFilterPrice('')
              setFilterBrand('')
            }}
            placeholder='Поиск по названию'
          />
          <input
            type="text"
            value={filterPrice}
            onInput={(e) => {
              setFilterName('')
              setFilterPrice(e.target.value)
              setFilterBrand('')
            }}
            placeholder='Поиск по цене'
          />
          <input
            type="text"
            value={filterBrand}
            onInput={(e) => {
              setFilterName('')
              setFilterPrice('')
              setFilterBrand(e.target.value)
            }}
            placeholder='Поиск по бренду'
          />
          <button onClick={() => { setFilters(true) }}>Поиск</button>
        </div>
        {
          products &&
          <Table products={products} getItems={getItems} />
        }
      </div>

  )
}

export default App;