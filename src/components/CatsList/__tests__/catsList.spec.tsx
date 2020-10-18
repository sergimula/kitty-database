import React from 'react'
import { head } from 'lodash'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import {
  Button,
  Dialog,
  IconButton,
  Typography
} from '@material-ui/core'

import CatsList from '../index'
import * as stubs from './stubs'

describe('CatsList', () => {
  it('should match CatsList', () => {
    const props = stubs.catsListProps()
    const wrapper = renderer.create(<CatsList {...props} />)

    expect(wrapper).toMatchSnapshot()
  })

  describe('when categories are empty', () => {
    it('should render no cats matching text', () => {
      const wrapper = mount(
        <CatsList {...stubs.catsListPropsEmptyList} />
      )

      expect(wrapper.find(Typography).at(1).text()).toBe('No cats matching')
    })
  })

  describe('when user hits delete button', () => {
    const props = stubs.catsListProps()
    const wrapper = mount(<CatsList {...props} />)
    const cat = head(stubs.cats)

    wrapper.find(IconButton).at(2).simulate('click')

    expect(props.removeCat).toHaveBeenCalledWith(cat)
  })

  describe('AddOrEditCatModalForm', () => {
    describe('when user hits Add Cat button', () => {
      it('should open Add Cat Modal form', () => {
        const props = stubs.catsListProps()
        const wrapper = mount(<CatsList {...props} />)

        wrapper.find(Button).at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find(Dialog).at(0).props().open).toBe(true)
      })
    })

    describe('when user adds a new cat', () => {
      it('should call addCat function', () => {
        const props = stubs.catsListProps()
        const wrapper = mount(<CatsList {...props} />)

        wrapper.find(Button).at(0).simulate('click')
        wrapper.update()
        wrapper.find(Dialog).at(0).find('input[name="name"]').simulate('change', {
          target: { value: stubs.testCastToAdd.name, name: 'name' }
        })
        wrapper.find(Dialog).at(0).find('input[name="description"]').simulate('change', {
          target: { value: stubs.testCastToAdd.description, name: 'description' }
        })
        wrapper.find(Dialog).at(0).find('input[name="imageHeight"]').simulate('change', {
          target: { value: stubs.testCastToAdd.imageHeight, name: 'imageHeight' }
        })
        wrapper.find(Dialog).at(0).find('input[name="imageWidth"]').simulate('change', {
          target: { value: stubs.testCastToAdd.imageWidth, name: 'imageWidth' }
        })

        wrapper.find(Dialog).at(0).find(Button).at(1).simulate('submit')

        expect(props.addCat).toHaveBeenCalledWith(stubs.testCatAdded)
      })
    })

    describe('when user cancels the action', () => {
      it('should close Modal form', () => {
        const props = stubs.catsListProps()
        const wrapper = mount(<CatsList {...props} />)

        wrapper.find(Button).at(0).simulate('click')
        wrapper.update()
        wrapper.find(Dialog).at(0).find(Button).at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find(Dialog).at(0).props().open).toBe(false)
      })
    })

    describe('when user hits edit cat button', () => {
      it('should open Edit Cat Modal Form with cat data', () => {
        const props = stubs.catsListProps()
        const wrapper = mount(<CatsList {...props} />)
        const cat = head(stubs.cats)

        wrapper.find(IconButton).at(1).simulate('click')
        wrapper.update()
        expect(wrapper.find(Dialog).at(1).props().open).toBe(true)
        expect(wrapper.find(Dialog).at(1).find('input[name="name"]').props().value).toBe(cat.name)
        expect(wrapper.find(Dialog).at(1).find('input[name="description"]').props().value).toBe(cat.description)
        expect(wrapper.find(Dialog).at(1).find('[name="race_id"]').at(0).props().value).toBe(cat.race_id)
      })
    })
  })
})
