import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import MusicService from "../../services/MusicService"
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BottomBar from "../components/BottomBar";
import TopSearchBar from "../components/TopSearchBar";
import SearchView from "./SearchView";
import PlayingView from "./PlayingView";
import PlaylistView from "./PlaylistView";


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

    }

  }



  componentDidMount() {


  }

  render() {
    const {classes} = this.props;
    return (

        <div className={classes.root}>
<SearchView/>
<PlayingView/>
<PlaylistView/>
<BottomBar/>


        </div>

    )

  }

}

export default withRouter((withStyles(useStyles)(MainPage)))

