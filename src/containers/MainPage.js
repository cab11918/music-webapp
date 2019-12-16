import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import SongPanel from "../components/SongPanel";
import MusicService from "../services/MusicService"

const service = MusicService.getInstance()
const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

});

class MainPage extends React.Component {

  constructor(props) {

    super(props);
    this.state = {}

  }

  componentDidMount() {

  }

  render() {
    const {classes} = this.props;
    return (

        <div className={classes.root}>

          <Grid xs={12} sm={8} md={6} lg={4}>
            <SongPanel musicId={113120}/>
          </Grid>


        </div>

    )

  }

}

export default withRouter((withStyles(useStyles)(MainPage)))

