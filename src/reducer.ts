import { remove } from 'lodash'

import {
  Action,
  FETCH_DB,
  ADD_CAT_TO_DB,
  FETCH_CAT_LIST,
  REMOVE_CAT_FROM_DB,
} from './constants/actionTypes'
import { State } from './state'

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case FETCH_DB:
      return {
        ...action.data,
      }
    case FETCH_CAT_LIST:
      return {
        ...state,
        catsList: action.data,
      }
    //ADD/DELETE actions are not necessary in case that we're working with a real API
    //When we add/remove a cat from the api we will download the data from de API again
    //And we will update the data with/without the cat because will be already add/removed
    //from the API db, the API will be always the source of truth
    case ADD_CAT_TO_DB:
      return {
        ...state,
        catsList: [...state.catsList, action.data],
      }
    case REMOVE_CAT_FROM_DB:
      return {
        ...state,
        catsList: remove(state.catsList, (cat) => cat !== action.data),
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default reducer
