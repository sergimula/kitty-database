import { get } from 'lodash'
import React, { useContext, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import { Cat } from './constants'
import {
  addCatToDB,
  editCatFromDB,
  getFullCatDB,
  removeCatFromDB,
} from './actions'
import CatsList from './components/CatsList'
import { Context, DispatchContext } from './store'

const App = () => {
  const context = useContext(Context)
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    (async () => {
      await getFullCatDB(dispatch)
    })()
  }, [dispatch])

  return (
    <Grid alignItems='center' container justify='center'>
      <CatsList
        cats={get(context, 'catsList', [])}
        catsRaces={get(context, 'races', [])}
        editCat={(cat: Cat) => editCatFromDB(cat, dispatch)}
        addCat={(cat: Cat) => addCatToDB(cat, dispatch)}
        removeCat={(cat: Cat) => removeCatFromDB(cat, dispatch)}
      />
    </Grid>
  )
}

export default App
