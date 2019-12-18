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
    this.state = {songs: [1357785909,30352891,35476044,1409137437,1386055783, 113115,123456]}

  }

  componentDidMount() {

  }

  render() {
    const {classes} = this.props;
    return (

        <div className={classes.root}>

          <Grid xs={12} lg={4}>
            <SongPanel songs={this.state.songs}/>
          </Grid>


        </div>

    )

  }

}

export default withRouter((withStyles(useStyles)(MainPage)))

