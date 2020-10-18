import { Action } from './actionTypes'
export const API_URL: string =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://my-json-server.typicode.com/sergimula/test-kitty-db'
export const PLACE_KITTEN_BASE_URL: string = 'https://placekitten.com'

export type CatRaceType = 'European' | 'Siamese' | 'Siberian' | 'Persian'
export type Dispatch = (action: Action) => void

export interface CatRace {
  id: number
  name: CatRaceType
}

export interface Cat {
  id?: number
  name: string
  description: string
  race: CatRaceType
  race_id: number
  image: string
}
