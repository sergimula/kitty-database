import React, { useState, useEffect } from 'react'
import { isEmpty, toLower, toInteger } from 'lodash'
import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from '@material-ui/core'

import { Cat, CatRace } from 'src/constants'
import styles from './styles'

const useStyles = makeStyles(styles)

interface Props {
  catsList: Array<Cat>
  catsRaces: Array<CatRace>
  setCatsList: Function
}

const Filters = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [catRaceId, setCatRaceId] = useState<number>(0)
  const classes = useStyles()

  useEffect(() => {
    //Filter by name & race
    if (!isEmpty(searchValue) && catRaceId !== 0) {
      const filteredCatsListByNameAndRace = props.catsList.filter(
        (cat: Cat) => {
          return (
            toLower(cat.name).includes(searchValue.toLowerCase()) &&
            cat.race_id === catRaceId
          )
        }
      )
      return props.setCatsList(filteredCatsListByNameAndRace)
    }
    //Filter by name
    if (!isEmpty(searchValue)) {
      const filteredCatsListByName = props.catsList.filter((cat: Cat) => {
        return toLower(cat.name).includes(searchValue.toLowerCase())
      })
      return props.setCatsList(filteredCatsListByName)
    }
    //Filter by race
    if (catRaceId !== 0) {
      const filteredCatsListByRace = props.catsList.filter((cat: Cat) => {
        return cat.race_id === catRaceId
      })
      return props.setCatsList(filteredCatsListByRace)
    }
    //Set default catsList value
    if (isEmpty(searchValue) && catRaceId === 0) {
      props.setCatsList(props.catsList)
    }
  }, [catRaceId, props.catsList, props.setCatsList, searchValue])

  return (
    <Grid
      container
      className={classes.filtersContainer}
      justify='center'
      spacing={2}
    >
      <Grid item xs={9}>
        <TextField
          fullWidth
          label='Search Cat by name'
          onChange={(event) => {
            setSearchValue(event.target.value)
          }}
          value={searchValue}
          variant='outlined'
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl className={classes.select} variant='outlined'>
          <InputLabel htmlFor='race-selector'>Race</InputLabel>
          <Select
            inputProps={{
              name: 'race',
              id: 'race-selector',
            }}
            label='Race'
            native
            onChange={(event) => setCatRaceId(toInteger(event.target.value))}
            value={catRaceId}
          >
            <option value={0}>All</option>
            {props.catsRaces.map((race: CatRace) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Filters
