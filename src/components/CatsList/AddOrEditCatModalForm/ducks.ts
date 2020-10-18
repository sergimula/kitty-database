import { nth, toInteger } from 'lodash'

import { Cat, PLACE_KITTEN_BASE_URL } from '../../../constants'

export const EDIT_CAT: string = 'EDIT_CAT'
export const RESET_FORM: string = 'RESET_FORM'
export const SET_FIELD_VALUE: string = 'SET_FIELD_VALUE'
export const SUBMIT_FORM: string = 'SUBMIT_FORM'

type ModalFormActionType =
  | typeof EDIT_CAT
  | typeof SET_FIELD_VALUE
  | typeof RESET_FORM

type ModalFormAction = {
  field?: any
  type: ModalFormActionType
  value?: any
}

interface NewCat extends Cat {
  imageWidth: number
  imageHeight: number
}

const newCat: NewCat = {
  name: '',
  description: '',
  race: 'European',
  race_id: 1,
  image: PLACE_KITTEN_BASE_URL,
  imageWidth: 200,
  imageHeight: 200,
}

export const getInitialState = (cat?: Cat): NewCat => {
  return newCat
}

const getCatToEdit = (cat: Cat): NewCat => {
  const imageSizes = cat.image.match(/(\d+)/)
  const parsedCat: NewCat = {
    ...cat,
    imageWidth: toInteger(nth(imageSizes, 0)) | 200,
    imageHeight: toInteger(nth(imageSizes, 1)) | 200,
  }

  return parsedCat
}

export const reducer = (state: NewCat, action: ModalFormAction) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        [action.field]: action.value,
      }

    case EDIT_CAT:
      return {
        ...state,
        ...getCatToEdit(action.value),
      }

    case RESET_FORM:
      return getInitialState()

    default:
      return state
  }
}
