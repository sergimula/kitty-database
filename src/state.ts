import { Cat, CatRace } from './constants'

export interface State {
  catsList: Array<Cat>
  races: Array<CatRace>
}

export default {
  catsList: [],
  races: [],
}
