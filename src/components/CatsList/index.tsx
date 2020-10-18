import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import InfoIcon from '@material-ui/icons/Info'
import PetsIcon from '@material-ui/icons/Pets'

import { Cat, CatRace, PLACE_KITTEN_BASE_URL } from '../../constants'
import Filters from './Filters'
import AddOrEditCatModalForm from './AddOrEditCatModalForm'
import styles from './styles'

const useStyles = makeStyles(styles)

interface Props {
  addCat: (cat: Cat) => void
  cats: Array<Cat>
  catsRaces: Array<CatRace>
  editCat: (cat: Cat) => void
  removeCat: (cat: Cat) => void
}

const CatsList = (props: Props) => {
  const [catsList, setCatsList] = useState<Array<Cat>>([])
  const [isAddCatModalFormOpen, setIsAddCatModalFormOpen] = useState<boolean>(
    false
  )
  const [isEditCatModalFormOpen, setIsEditCatModalFormOpen] = useState<boolean>(
    false
  )
  const [showCat, setShowCat] = useState<Cat | undefined>(undefined)
  const [catToEdit, setCatToEdit] = useState<Cat>({
    name: '',
    description: '',
    image: `${PLACE_KITTEN_BASE_URL}/200/200`,
    race: 'European',
    race_id: 1,
  })
  const classes = useStyles()

  useEffect(() => {
    setCatsList(props.cats)
  }, [props.cats])

  return (
    <Card className={classes.root}>
      <Grid
        alignItems='center'
        container
        direction='column'
        justify='center'
        spacing={2}
      >
        <Typography
          align='center'
          gutterBottom
          variant='h5'
          component='h2'
          className={classes.title}
        >
          Cats Database
        </Typography>
        <Grid item xs={12} className={classes.demo}>
          {catsList.length === 0 ? (
            <Typography align='center' variant='h6' className={classes.title}>
              No cats matching
            </Typography>
          ) : (
            <List dense={false}>
              {catsList.map((cat: Cat) => (
                <React.Fragment key={cat.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PetsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={cat.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          setShowCat(cat)
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => {
                          setCatToEdit(cat)
                          setIsEditCatModalFormOpen(true)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => props.removeCat(cat)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {showCat && cat.id === showCat.id && (
                    <Grid container justify='center' spacing={1}>
                      <Grid item>
                        <img alt={showCat.name} src={showCat.image} />
                      </Grid>
                      <Grid item>
                        <Typography>{showCat.description}</Typography>
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
      <CardActions>
        <Grid container direction='column'>
          <Grid container justify='flex-end'>
            <Button
              size='large'
              color='secondary'
              variant='contained'
              endIcon={<PetsIcon />}
              onClick={() => setIsAddCatModalFormOpen(true)}
            >
              Add new cat
            </Button>
            <AddOrEditCatModalForm
              addCatToDB={props.addCat}
              catsRaces={props.catsRaces}
              isOpen={isAddCatModalFormOpen}
              setIsModalFormOpen={setIsAddCatModalFormOpen}
            />
          </Grid>
          <Filters
            catsList={props.cats}
            catsRaces={props.catsRaces}
            setCatsList={setCatsList}
          />
        </Grid>
      </CardActions>
      <AddOrEditCatModalForm
        editCat={props.editCat}
        catsRaces={props.catsRaces}
        catToEdit={catToEdit}
        isOpen={isEditCatModalFormOpen}
        setIsModalFormOpen={setIsEditCatModalFormOpen}
      />
    </Card>
  )
}

export default CatsList
