import axios from 'axios'

import {
  ADD_CAT_TO_DB,
  FETCH_CAT_LIST,
  FETCH_DB,
  REMOVE_CAT_FROM_DB,
} from './constants/actionTypes'
import { API_URL, Cat, Dispatch } from './constants'

export const getCatsList = async (dispatch: Dispatch | undefined) => {
  try {
    const call = `${API_URL}/cats`
    const response = await axios.get(call)

    if (dispatch) dispatch({ type: FETCH_CAT_LIST, data: response.data })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getCatsRaces = async (dispatch: Dispatch | undefined) => {
  try {
    const call = `${API_URL}/races`
    const response = await axios.get(call)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getFullCatDB = async (dispatch: Dispatch | undefined) => {
  try {
    const call = `${API_URL}/db`
    const response = await axios.get(call)
    const mutedData = {
      catsList: response.data.cats,
      races: response.data.races,
    }

    if (dispatch) dispatch({ type: FETCH_DB, data: mutedData })

    return mutedData
  } catch (error) {
    console.error(error)
  }
}

export const addCatToDB = async (
  newCat: Cat,
  dispatch: Dispatch | undefined
) => {
  try {
    const res = await axios.post(`${API_URL}/cats`, newCat)
    console.log('Created cat succefully', res.data)

    if (dispatch) {
      process.env.NODE_ENV === 'production'
        ? dispatch({ type: ADD_CAT_TO_DB, data: res.data })
        : getCatsList(dispatch)
    }
  } catch (error) {
    console.error(error)
  }
}

export const editCatFromDB = async (
  catToEdit: Cat,
  dispatch: Dispatch | undefined
) => {
  try {
    const res = await axios.put(`${API_URL}/cats/${catToEdit.id}`, catToEdit)
    console.log('Edited cat succefully', res.status)

    if (dispatch && process.env.NODE_ENV === 'production') {
      getCatsList(dispatch)
    }
  } catch (error) {
    console.error(error)
  }
}

export const removeCatFromDB = async (
  catToRemove: Cat,
  dispatch: Dispatch | undefined
) => {
  try {
    const res = await axios.delete(`${API_URL}/cats/${catToRemove.id}`)
    console.log('Removed cat succefully', res.status)

    if (dispatch) {
      process.env.NODE_ENV === 'production'
        ? dispatch({ type: REMOVE_CAT_FROM_DB, data: catToRemove })
        : getCatsList(dispatch)
    }
  } catch (error) {
    console.error(error)
  }
}
