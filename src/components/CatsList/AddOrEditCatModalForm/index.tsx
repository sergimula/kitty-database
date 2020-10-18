import React, { useEffect, useReducer } from 'react'
import { get, head, toInteger } from 'lodash'
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from '@material-ui/core'

import { Cat, CatRace, PLACE_KITTEN_BASE_URL } from '../../../constants'
import * as ducks from './ducks'
import styles from './styles'

const useStyles = makeStyles(styles)

export interface Props {
  addCatToDB?: (cat: Cat) => void
  catsRaces: Array<CatRace>
  catToEdit?: Cat
  editCat?: (cat: Cat) => void
  isOpen: boolean
  setIsModalFormOpen: (value: boolean) => void
}

const AddCatModalForm = (props: Props) => {
  const classes = useStyles()
  const { catsRaces, isOpen, setIsModalFormOpen } = props
  const [state, dispatch] = useReducer(ducks.reducer, ducks.getInitialState())

  useEffect(() => {
    if (isOpen && props.catToEdit) {
      dispatch({ type: ducks.EDIT_CAT, value: props.catToEdit })
    }
  }, [isOpen, props.catToEdit])

  return (
    <Dialog
      onClose={() => {
        setIsModalFormOpen(false)
        dispatch({ type: ducks.RESET_FORM })
      }}
      open={isOpen}
    >
      <DialogTitle>
        {props.catToEdit
          ? `Editing ${props.catToEdit.name}`
          : 'Add cat to database'}
      </DialogTitle>
      <form
        className={classes.addCatForm}
        name='add-cat-form'
        onSubmit={(event) => {
          event.preventDefault()

          if (props.addCatToDB) {
            props.addCatToDB({
              name: state.name,
              description: state.description,
              race: get(
                head(catsRaces.filter((race) => race.id === state.race_id)),
                'name',
                state.race
              ),
              race_id: state.race_id,
              image: `${state.image}/${state.imageWidth}/${state.imageHeight}`,
            })
          }

          if (props.editCat) {
            props.editCat({
              id: state.id,
              name: state.name,
              description: state.description,
              race: get(
                head(catsRaces.filter((race) => race.id === state.race_id)),
                'name',
                state.race
              ),
              race_id: state.race_id,
              image: `${PLACE_KITTEN_BASE_URL}/${state.imageWidth}/${state.imageHeight}`,
            })
          }

          setIsModalFormOpen(false)
        }}
      >
        <React.Fragment>
          <Grid container justify='center' spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Cat name'
                name='name'
                onChange={(event) =>
                  dispatch({
                    type: ducks.SET_FIELD_VALUE,
                    field: event.target.name,
                    value: event.target.value,
                  })
                }
                required
                value={state.name}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Cat description'
                name='description'
                onChange={(event) =>
                  dispatch({
                    type: ducks.SET_FIELD_VALUE,
                    field: event.target.name,
                    value: event.target.value,
                  })
                }
                value={state.description}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Cat image width'
                name='imageWidth'
                onChange={(event) =>
                  dispatch({
                    type: ducks.SET_FIELD_VALUE,
                    field: event.target.name,
                    value: event.target.value,
                  })
                }
                required
                type='number'
                value={state.imageWidth}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Cat image height'
                name='imageHeight'
                onChange={(event) =>
                  dispatch({
                    type: ducks.SET_FIELD_VALUE,
                    field: event.target.name,
                    value: event.target.value,
                  })
                }
                required
                type='number'
                value={state.imageHeight}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.select} variant='outlined'>
                <InputLabel htmlFor='add-cat-race-selector'>Race</InputLabel>
                <Select
                  inputProps={{
                    name: 'race',
                    id: 'add-cat-race-selector',
                  }}
                  label='Race'
                  native
                  onChange={(event) =>
                    dispatch({
                      type: ducks.SET_FIELD_VALUE,
                      field: 'race_id',
                      value: toInteger(event.target.value),
                    })
                  }
                  value={state.race_id}
                >
                  {catsRaces.map((race: CatRace) => (
                    <option key={race.id} value={race.id}>
                      {race.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify='flex-end' spacing={2}>
            <Grid item xs={3}>
              <Button
                fullWidth
                onClick={() => {
                  setIsModalFormOpen(false)
                  dispatch({ type: ducks.RESET_FORM })
                }}
                size='large'
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                color='primary'
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                {props.catToEdit ? `Edit cat` : 'Add cat'}
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      </form>
    </Dialog>
  )
}

export default AddCatModalForm
