import { Theme } from '@material-ui/core/styles'

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
})

export default styles
