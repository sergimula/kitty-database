import mockData from 'src/mocks'
import { PLACE_KITTEN_BASE_URL } from 'src/constants'

export const cats = mockData.cats
export const catsRaces = mockData.races

export const catsListProps = () => ({
  addCat: jest.fn(),
  cats,
  catsRaces,
  editCat: jest.fn(),
  removeCat: jest.fn()
})

const imageWidth: number = 200
const imageHeight: number = 200

export const testCastToAdd = {
  name: 'Test',
  description: 'Test desc',
  race: 'European',
  race_id: 1,
  imageWidth,
  imageHeight
}

export const testCatAdded = {
  name: 'Test',
  description: 'Test desc',
  race: 'European',
  race_id: 1,
  image: `${PLACE_KITTEN_BASE_URL}/${imageWidth}/${imageHeight}`,
}

export const catsListPropsEmptyList = {
  ...catsListProps(),
  cats: [],
}
