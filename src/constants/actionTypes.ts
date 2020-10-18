export const ADD_CAT_TO_DB: string = 'ADD_CAT_TO_DB'
export const FETCH_CAT_LIST: string = 'FETCH_CAT_LIST'
export const FETCH_DB: string = 'FETCH_DB'
export const REMOVE_CAT_FROM_DB: string = 'REMOVE_CAT_FROM_DB'

export type ActionType =
  | typeof FETCH_DB
  | typeof ADD_CAT_TO_DB
  | typeof FETCH_CAT_LIST
  | typeof REMOVE_CAT_FROM_DB

export type Action = {
  type: ActionType
  data: object
}
