import React, { createContext, useReducer } from 'react'

import { Dispatch } from './constants'
import defaultState, { State } from './state'
import reducer from './reducer'

export const Context = createContext<State | undefined>(undefined)
export const DispatchContext = createContext<Dispatch | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

export const Provider = (props: Props) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </Context.Provider>
  )
}
