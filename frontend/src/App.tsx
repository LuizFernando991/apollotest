import { useReducer, useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Pagination,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Select,
  MenuItem
} from '@mui/material'
import ChipMultiSelect, { OptionType } from './components/ChipMultiSelect'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import StorefrontIcon from '@mui/icons-material/Storefront'
import ProductsTable from './components/ProductsTable'
import DeleteModal from './components/DeleteModal'
import toast from 'react-hot-toast'
import { useApi } from './hooks/useApi'

import productReducer from './reducers/ProductsReducer'
import categoryReducer from './reducers/CategoriesReducer'
import pageContextReducer from './reducers/PageContextReducer'
import { useDebounce } from './hooks/useDebounce'
import { Product } from './types/ProductType'
import CreateModal from './components/CreateModal'

function App() {
  const [loading, setLoading] = useState(true)
  const [createNewProductModalOpen, setCreateNewProductModalOpen] =
    useState(false)
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null)
  const [products, productsDispatch] = useReducer(productReducer, [])
  const [categoriesContext, categoryContextDispatch] = useReducer(
    categoryReducer,
    {
      categories: [],
      filter: []
    }
  )
  const [pageContext, pageContextDispatch] = useReducer(pageContextReducer, {
    currentPage: 1,
    numberOfPages: 0
  })
  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('name')
  const debouncedSearch = useDebounce(search, 300)
  const api = useApi()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    api
      .get(`/category`, { signal })
      .then((res) => {
        categoryContextDispatch({ type: 'LOAD_CATEGORIES', payload: res.data })
      })
      .catch(() => {
        toast.error('Algo deu errado, tente mais tarde')
      })
    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    productsDispatch({ type: 'RESET' })
    setLoading(true)
    const categoriesQuery =
      categoriesContext.filter.length > 0
        ? categoriesContext.filter.map((cat) => cat.id).join(',')
        : ''
    api
      .get(
        `/product/?page=${1}&search=${debouncedSearch}&orderBy=${orderBy}&categories=${categoriesQuery}`, { signal }
      )
      .then((res) => {
        pageContextDispatch({
          type: 'CHANGE_NUMBER_OF_PAGES',
          payload: res.data.pages
        })
        productsDispatch({ type: 'LOAD_PRODUCTS', payload: res.data.products })
      })
      .catch(() => {
        toast.error('Algo deu errado, tente mais tarde')
      })
      .finally(() => {
        setLoading(false)
      })
    return () => {
      controller.abort()
    }
  }, [
    debouncedSearch,
    pageContext.currentPage,
    orderBy,
    categoriesContext.filter
  ])

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'
      }}
    >
      <Paper
        sx={{
          width: '100%',
          pt: 5,
          px: 8
        }}
      >
        <Box
          width={'100%'}
          sx={{
            mb: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
            <StorefrontIcon fontSize="large" color="primary" />
            <Typography variant="h6" component="h1" color="primary">
              Products
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              setCreateNewProductModalOpen(true)
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap-reverse'
            }}
          >
            <AddIcon />
            <Box>New product</Box>
          </Button>
        </Box>
        <Box
          width={'100%'}
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            alignItems: 'end',
            flexWrap: 'wrap'
          }}
        >
          <ChipMultiSelect
            options={categoriesContext.categories}
            selectedOptions={categoriesContext.filter}
            setSelectedOptions={(value: OptionType[]) => {
              if (pageContext.currentPage !== 1) {
                pageContextDispatch({ type: 'CHANGE_PAGE', payload: 1 })
              }
              categoryContextDispatch({
                type: 'SET_FILTER_CATEGORIES',
                payload: value
              })
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'no-wrap'
            }}
          >
            <FormControl variant="standard">
              <InputLabel htmlFor="search">Search</InputLabel>
              <Input
                id="search"
                onChange={(e) => {
                  if (pageContext.currentPage !== 1) {
                    pageContextDispatch({ type: 'CHANGE_PAGE', payload: 1 })
                  }
                  setSearch(e.target.value)
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, width: 128 }}
              color="primary"
            >
              <InputLabel id="orderBySelect">Ordernar por:</InputLabel>
              <Select
                labelId="orderBySelect"
                id="orderBySelect"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                label="OrderBy"
              >
                <MenuItem value="name">Nome</MenuItem>
                <MenuItem value="createDate">Data</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <ProductsTable
          products={products}
          isLoading={loading}
          onDelete={(prod: Product) => setSelectedProduct(prod)}
        />
      </Paper>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}
      >
        <Stack spacing={2}>
          <Pagination
            count={pageContext.numberOfPages}
            color="primary"
            page={pageContext.currentPage}
            onChange={(_e, n: number) => {
              pageContextDispatch({ type: 'CHANGE_PAGE', payload: n })
            }}
          />
        </Stack>
      </Box>
      {!!selectedProduct && (
        <DeleteModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onDelete={() => {
            productsDispatch({
              type: 'REMOVE_PRODUCT',
              payload: selectedProduct.id
            })
          }}
        />
      )}
      {createNewProductModalOpen && (
        <CreateModal
          categories={categoriesContext.categories}
          setModalOpen={setCreateNewProductModalOpen}
          onCreate={(prod: Product) => {
            productsDispatch({ type: 'ADD_NEW_PRODUCT', payload: prod })
          }}
        />
      )}
    </Container>
  )
}

export default App
