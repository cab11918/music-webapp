import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {fade, makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import SERVICE from "../../services/MusicService";
import Slider from "@material-ui/core/Slider";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from "@material-ui/core/Checkbox";
import Grow from "@material-ui/core/Grow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import {addSong} from "../../actions/actions";
import {connect} from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import NeteaseLogo from "../../others/NetEase_Music_logo.svg";
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import PlayCircleFilledWhiteIcon
  from "@material-ui/icons/PlayCircleFilledWhite";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = theme => ({
  root: {},
  paper: {
    height: '80vh',
    padding: theme.spacing(2)
  },
  tableContainer: {
    height: '80vh',
    minWidth: '100%'

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  songTable: {},
  container: {
    height: '50vh',
  },

});

class SeekSongPanel extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      results: {
        result: {
          songs: []
        }
      },
      curSearch: "",
      addSongAlert: false
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);

  }

  componentDidMount() {

  }

  constructSong(id) {
    let songWillSend = {
      id: id,
      name: "null",
      author: "null",
      imageUrl: "null",
      mp3Url: "null"
    }

    let firstAPICall = fetch(
        "https://neteasemusicapi.herokuapp.com/song/url?id=" + id);
    let secondAPICall = fetch(
        "https://neteasemusicapi.herokuapp.com/song/detail?ids=" + id);

    Promise.all([firstAPICall, secondAPICall])
    .then(values => Promise.all(values.map(value => value.json())))
    .then(finalVals => {
      let firstAPIResp = finalVals[0];
      let secondAPIResp = finalVals[1];
      songWillSend.id = id
      songWillSend.mp3Url = firstAPIResp.data[0].url
      songWillSend.name = secondAPIResp.songs[0].name
      songWillSend.author = secondAPIResp.songs[0].ar[0].name
      songWillSend.imageUrl = secondAPIResp.songs[0].al.picUrl
      this.props.addSong({
        id: id,
        name: songWillSend.name = secondAPIResp.songs[0].name,
        author: songWillSend.author = secondAPIResp.songs[0].ar[0].name,
        imageUrl: songWillSend.imageUrl = secondAPIResp.songs[0].al.picUrl,
        mp3Url: songWillSend.mp3Url = firstAPIResp.data[0].url

      })
    });

  }

  handleSearchChange(e) {
    this.setState({
      curSearch: e.target.value
    })
    SERVICE.getInstance().searchSong(this.state.curSearch).then(res => {
      if (res.code == 400) {

      } else if (res.result.songCount == 0) {
      } else {
        this.setState({
          results: res
        })
      }
    })
  }

  addSelectedSong(id) {
    SERVICE.getInstance().checkSong(id).then(res => {
      if (res.success) {
        this.constructSong(
            id)
        this.setState({addSongAlert: true})
      } else {
        alert("No copyright | 没有版权")
      }
    })
  }

  render() {
    const {classes} = this.props;

    return (

        <div className={classes.root}>


          <Paper elevation={3} className={classes.paper}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
              <Grid item>
                <img src={NeteaseLogo} alt="website logo"
                     style={{width: 50, height: 50, margin: 8}}/>
              </Grid>

              <Grid item>
                <Typography variant="caption" color="textSecondary">Powered By
                  NeteaseCloudMusic</Typography>

              </Grid>


              <Grid item>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon/>
                  </div>
                  <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{'aria-label': 'search'}}
                      onChange={this.handleSearchChange}
                  />
                </div>

              </Grid>

              <Grid item style={{marginTop: 16}}>

                {this.state.curSearch == "" ? <span></span> : <TableContainer
                    className={classes.container}>
                  <Table stickyHeader aria-label="sticky table"
                         className={classes.songTable}>
                    <TableHead>
                      <TableRow>

                        <TableCell>

                        </TableCell>

                        <TableCell>
                          <Typography variant={'subtitle1'}>
                            Name
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant={'subtitle1'}>
                            Author
                          </Typography>
                        </TableCell>


                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.results.result.songs.length == 0 ?
                          <span></span>
                          : this.state.results.result.songs.map(
                              (song, index) => (
                                  <Grow in={true}
                                        style={{transformOrigin: '0 0 0'}}
                                        {...({timeout: 1000 + index * 50})}>

                                    <TableRow key={index}>

                                      <TableCell component="th" scope="row">
                                        <IconButton size="small"
                                                    aria-label="play"

                                                    onClick={() => {
                                                      this.addSelectedSong(
                                                          song.id)
                                                    }}
                                        >
                                          <AddCircleOutlineIcon
                                              style={{"fontSize": 20}}
                                              className={classes.playIcon}/>
                                        </IconButton>
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {song.name}
                                      </TableCell>

                                      <TableCell component="th" scope="row">
                                        {song.artists[0].name}
                                      </TableCell>


                                    </TableRow>
                                  </Grow>
                              ))}
                    </TableBody>
                  </Table>
                </TableContainer>}

              </Grid>


            </Grid>
          </Paper>

          <div>
            <Snackbar
                background='red'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.addSongAlert}
                autoHideDuration={1000}
                onClose={() => this.setState({addSongAlert: false})}
            >

              <SnackbarContent style={{
                backgroundColor: 'green',
              }}
                               message={<span
                                   id="client-snackbar">    <React.Fragment>
                                 <Grid
                                     container
                                     direction="row"
                                     justify="center"
                                     alignItems="center"
                                 >
                    <IconButton size="small" aria-label="close" color="inherit"
                                onClick={() => this.setState(
                                    {addSongAlert: false})}>
                      <CheckCircleOutlineIcon fontSize="small"/>
                    </IconButton>
                                   <Typography>Song added</Typography></Grid>
                  </React.Fragment></span>}
              />

            </Snackbar>
          </div>


        </div>

    )

  }

}

const mapStateToProps = (reducer) => {
  return {
    songs: reducer.state.songs,
    currentIndex: reducer.state.currentIndex,
    deletedIndex: reducer.state.deletedIndex
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addSong}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter((withStyles(useStyles)(SeekSongPanel))))




