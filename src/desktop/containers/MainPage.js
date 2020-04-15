import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import SongPanel from "../components/SongPanel";
import MusicService from "../../services/MusicService"
import PlaylistPanel from "../components/PlaylistPanel";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import SeekSongPanel from "../components/SeekSongPanel";

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
  title: {
    paddingBottom: '15%',
    paddingTop: 20
  }

});

class MainPage extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      songs: [1431583891,30352891, 27491508, 35476044, 1409137437, 1386055783, 113115,
        123456]
    }

  }



  componentDidMount() {


  }

  render() {
    const {classes} = this.props;
    return (

        <div className={classes.root}>


         <Grid
             container
             direction="row"
             justify="center"
             alignItems="center"
         >
           <Grid item xs={6}>
             <SeekSongPanel/>
           </Grid>
           <Grid item xs={6}>
             <PlaylistPanel/>
           </Grid>





  <SongPanel songs={this.state.songs}/>


          </Grid>


        </div>

    )

  }

}

export default withRouter((withStyles(useStyles)(MainPage)))

