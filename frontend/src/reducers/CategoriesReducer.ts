import { OptionType } from '../components/ChipMultiSelect'
import { Category } from '../types/CategoryType'

type CategoriesType = {
  categories: Category[]
  filter: OptionType[]
}

type Action =
  | { type: 'LOAD_CATEGORIES'; payload: Category[] }
  | { type: 'SET_FILTER_CATEGORIES'; payload: OptionType[] }
  | { type: 'RESET' }

const reducer = (state: CategoriesType, action: Action): CategoriesType => {
  if (action.type === 'LOAD_CATEGORIES') {
    return { ...state, categories: action.payload }
  } else if (action.type === 'SET_FILTER_CATEGORIES') {
    return { ...state, filter: action.payload }
  } else if (action.type === 'RESET') {
    return { categories: [], filter: [] }
  } else {
    return state
  }
}

export default reducer
