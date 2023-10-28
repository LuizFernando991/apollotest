type PageContextType = {
  currentPage: number
  numberOfPages: number
}

type Action =
  | { type: 'CHANGE_PAGE'; payload: number }
  | { type: 'CHANGE_NUMBER_OF_PAGES'; payload: number }
  | { type: 'RESET' }

const reducer = (state: PageContextType, action: Action): PageContextType => {
  if (action.type === 'CHANGE_PAGE') {
    return { ...state, currentPage: action.payload }
  } else if (action.type === 'CHANGE_NUMBER_OF_PAGES') {
    return { ...state, numberOfPages: action.payload }
  } else if (action.type === 'RESET') {
    return { currentPage: 0, numberOfPages: 0 }
  } else {
    return state
  }
}

export default reducer
