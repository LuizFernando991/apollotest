import { Product } from '../types/ProductType'

type Action =
  | { type: 'LOAD_PRODUCTS'; payload: Product[] }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'ADD_NEW_PRODUCT'; payload: Product }
  | { type: 'RESET' }

const reducer = (state: Product[], action: Action): Product[] => {
  if (action.type === 'LOAD_PRODUCTS') {
    return action.payload
  } else if (action.type === 'REMOVE_PRODUCT') {
    const productId = action.payload
    const productIndex = state.findIndex(
      (product: Product) => product.id === productId
    )
    if (productIndex !== -1) {
      state.splice(productIndex, 1)
    }
    return [...state]
  } else if (action.type === 'UPDATE_PRODUCT') {
    const updatedProduct: Product = action.payload
    const productIndex = state.findIndex(
      (product: Product) => product.id === updatedProduct.id
    )
    if (productIndex !== -1) {
      state[productIndex] = updatedProduct
    }
    return [...state]
  } else if (action.type === 'ADD_NEW_PRODUCT') {
    const newProduct = action.payload
    return [newProduct, ...state]
  } else if (action.type === 'RESET') {
    return []
  } else {
    return [...state]
  }
}

export default reducer
