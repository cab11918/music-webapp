import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import Slider from "@material-ui/core/Slider";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Checkbox from "@material-ui/core/Checkbox";
import {bindActionCreators} from "redux";
import {addSong, setIndex} from "../../actions/actions";
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    width: '100%',

  },
  paper: {

    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '15vh'
  },
  card: {
    display: 'flex',
    borderRadius: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 100,
    height: 100,
    margin: 'auto',

  },
  pSlider: {

    width: 100
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 30,
    width: 30,
  },

  vSlider: {
    width: '80%',

  },
  scIcon: {},
  playSecControlFix: {
    marginLeft: theme.spacing(1)
  },
  table: {
    width: '100%',
    fontSize: 12
  },
  th: {
    fontSize: 12
  },
  tr: {
    fontSize: 12
  },
  img: {
    width: 12,
    height: 12,
    marginRight: 20,
    borderRadius: 5

  }

});

function format(time) {
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;
  let ret = "";
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

class SongPanel extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      name: '',
      author: '',
      albumPicUrl: '',
      play: false,
      duration: "--:--",
      currentTime: "0:00",
      pSlider: 0,
      curSongIndex: 0,
      playMode: 0,
      volume: 100,
      songUrls: [],
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.songs.length !== prevProps.songs.length
        && prevProps.songs.length == 0 && this.props.songs.length == 1) {
      // initializing, only render once
      this.initializeSong()
      this.setState(
          {play: false})
      // this.setCurAndPlay()

    } else if (this.props.currentIndex !== prevProps.currentIndex
        && this.props.songs.length == prevProps.songs.length) {
      // no song deleted but the currentIndex changed by user
      this.setCurAndPlay()

    } else if (this.props.songs.length < prevProps.songs.length) {
      // songs length reduced, deleted 1/x song/songs
      if (prevProps.currentIndex == this.props.deletedIndex) {
        this.setCurAndPlay()
      }
    } else if (this.props.songs.length == 0) {
      this.audio.pause()
    }

  }

  setCurAndPlay() {
    this.setState(
        {play: true})
    try {
      this.audio.src = this.props.songs[this.props.currentIndex].mp3Url

    } catch (e) {
      //Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
      //Didn't solve
    }
    this.setCurSong()
  }

  initializeSong() {

    this.audio = new Audio(this.props.songs[0].mp3Url)
    this.audio.onloadedmetadata = function () {
      this.setState({
        duration: format(this.audio.duration)
      })

    }.bind(this)

    this.audio.onplay = () => {
      setInterval(() => {
        this.setState({
          pSlider: (this.audio.currentTime / this.audio.duration) * 100,
          currentTime: format(this.audio.currentTime)
        })
      }, 500)
    }

    this.audio.onended = () => {

      switch (this.state.playMode) {
        case 0:
          if (this.props.currentIndex == this.props.songs.length - 1) {
            this.props.setIndex(0)
            this.audio.src = this.props.songs[0].mp3Url
            this.setCurSong()
          } else {
            this.props.setIndex(this.props.currentIndex + 1)
            this.audio.src = this.props.songs[this.props.currentIndex].mp3Url
            this.setCurSong()

          }
          break;
        case 1:
          let shuffleIndex = this.getRandomSong()
          while (shuffleIndex === this.props.currentIndex) {
            shuffleIndex = this.getRandomSong()

          }

          this.props.setIndex(shuffleIndex)
          this.audio.src = this.props.songs[shuffleIndex].mp3Url
          this.setCurSong()
          break;
        case 2:
          this.audio.play()
          break;
      }

    }
  }

  getRandomSong() {
    return Math.floor(Math.random() * Math.floor(this.props.songs.length))
  }

  setCurSong() {

    this.audio.onloadedmetadata = function () {

      this.setState({
        duration: format(this.audio.duration)
      })
    }.bind(this)

    this.audio.pause();
    this.audio.load();
    this.audio.play();

  }

  next() {

    this.props.setIndex(this.props.currentIndex + 1)

    switch (this.state.playMode) {
      case 2:
        if (this.props.currentIndex === this.props.songs.length - 1) {
          this.props.setIndex(0)
          this.audio.src = this.props.songs[0].mp3Url

          this.setCurSong()
        } else {
          this.setState(
              {play: true})
          this.audio.src = this.props.songs[this.props.currentIndex + 1].mp3Url
          this.setCurSong()

        }
        break;
      case 1:
        // avoid one song
        let shuffleIndex = 0
        if (this.props.songs.length > 1) {
          shuffleIndex = this.getRandomSong()
          while (shuffleIndex === this.props.currentIndex) {
            shuffleIndex = this.getRandomSong()
          }
        }
        this.props.setIndex(shuffleIndex)
        this.setState({play: true})
        this.audio.src = this.props.songs[shuffleIndex].mp3Url
        this.setCurSong()

        break;
      case 0:
        if (this.props.currentIndex === this.props.songs.length - 1) {
          this.props.setIndex(0)
          this.audio.src = this.props.songs[0].mp3Url

          this.setCurSong()
        } else {
          this.setState(
              {play: true})
          this.audio.src = this.props.songs[this.props.currentIndex + 1].mp3Url
          this.setCurSong()

        }
        break;
    }

  }

  previous() {
    switch (this.state.playMode) {

      case 2:
        if (this.props.currentIndex == 0) {
          this.props.setIndex(this.props.songs.length - 1)
          this.audio.src = this.props.songs[0].mp3Url
          this.setCurSong()
        } else {
          this.setState(
              {play: true})
          this.props.setIndex(this.props.currentIndex - 1)
          this.audio.src = this.props.songs[this.props.currentIndex - 1].mp3Url
          this.setCurSong()

        }
        break;

      case 1:
        // avoid one song
        let shuffleIndex = 0
        if (this.props.songs.length > 1) {
          shuffleIndex = this.getRandomSong()
          while (shuffleIndex === this.props.currentIndex) {
            shuffleIndex = this.getRandomSong()
          }
        }
        this.props.setIndex(shuffleIndex)
        this.setState({play: true})
        this.audio.src = this.props.songs[shuffleIndex].mp3Url
        this.setCurSong()

        break;
      case 0:
        if (this.props.currentIndex == 0) {
          this.props.setIndex(this.props.songs.length - 1)
          try {
            this.audio.src = this.props.songs[0].mp3Url

          } catch (e) {
            //Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
            //Didn't solve
          }
          this.setCurSong()
        } else {
          this.setState(
              {play: true})
          this.props.setIndex(this.props.currentIndex - 1)
          this.audio.src = this.props.songs[this.props.currentIndex - 1].mp3Url
          this.setCurSong()

        }
        break;

    }
  }

  changeVolume(value) {
    this.setState({volume: value})
    this.audio.volume = this.state.volume / 100
  }

  play() {
    this.setState({play: true, duration: format(this.audio.duration)})
    this.audio.play()

  }

  pause() {
    this.setState({play: false})
    this.audio.pause()
  }

  seek(value) {
    try {
      this.audio.currentTime = Math.floor(this.audio.duration * (value / 100))
    } catch (e) {
      // TypeError: Failed to set the 'currentTime' property on 'HTMLMediaElement': The provided double value is non-finite.
      // Didn't solve
    }
  }

  render() {

    const {classes} = this.props;

    return (

        <div className={classes.root}>

          <Paper className={classes.paper} elevation={10}>

            {
              this.props.songs.length == 0 ?

                  <Typography variant={"h2"}>No song to play</Typography> :

                  <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                  >


                    <Grid item xs={2}>
                      <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                      >
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            {this.props.songs[this.props.currentIndex].name}
                          </Typography>

                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="caption" color="textSecondary">
                            {this.props.songs[this.props.currentIndex].author}
                          </Typography>

                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                      >
                        <Grid item xs={12}>
                          <Slider value={this.state.pSlider}
                                  aria-labelledby="continuous-slider"
                                  className={classes.pSlider}
                                  onChange={(event, value) => this.seek(
                                      value)}/>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            {this.state.currentTime}/{this.state.duration}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton aria-label="previous"
                                  onClick={() => this.previous()}>
                        <SkipPreviousIcon className={classes.playIcon}/>
                      </IconButton>
                      <IconButton aria-label="play/pause" onClick={() => {
                        this.state.play ? this.pause()
                            : this.play()
                      }}>
                        {this.state.play ? <PauseIcon
                                className={classes.playIcon}/> :
                            <PlayArrowIcon className={classes.playIcon}/>}
                      </IconButton>
                      <IconButton aria-label="next"
                                  onClick={() => this.next()}
                      >
                        <SkipNextIcon className={classes.playIcon}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                      <Checkbox checked={this.state.playMode === 0 ? true
                          : false} onChange={() => {
                        this.setState({
                          playMode: 0
                        })
                      }}
                                icon={<PlaylistPlayIcon
                                    className={classes.scIcon}/>}
                                checkedIcon={<PlaylistPlayIcon
                                    className={classes.scIcon}/>}
                                value="checkedH"/>
                      <Checkbox icon={<ShuffleIcon className={classes.scIcon}/>}
                                checkedIcon={<ShuffleIcon
                                    className={classes.scIcon}/>}
                                checked={this.state.playMode === 1 ? true
                                    : false}
                                onChange={() => {
                                  this.setState(
                                      {
                                        playMode: 1
                                      })
                                }}/>
                      <Checkbox icon={<LoopIcon className={classes.scIcon}/>}
                                checkedIcon={<LoopIcon
                                    className={classes.scIcon}/>}
                                checked={this.state.playMode === 2 ? true
                                    : false}
                                onChange={() => {
                                  this.setState({
                                    playMode: 2
                                  })
                                }}/>
                    </Grid>
                    <Grid item xs={2}>

                      <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                      >
                        <Grid item xs={4}>
                          <IconButton aria-label="next" onClick={() => {
                            if (this.state.volume !== 0) {
                              this.setState({volume: 0})
                              this.audio.volume = 0
                            } else {
                              this.setState({volume: 100})
                              this.audio.volume = 1
                            }
                          }}>
                            {this.state.volume === 0 ? <VolumeOffIcon
                                className={classes.scIcon}/> : <VolumeDownIcon
                                className={classes.scIcon}/>}

                          </IconButton>
                        </Grid>

                        <Grid item xs={8}>
                          <Slider

                              aria-labelledby="continuous-slider"
                              className={classes.vSlider}
                              value={this.state.volume}
                              onChange={(event, value) => this.changeVolume(
                                  value)}
                          />
                        </Grid>

                      </Grid>


                    </Grid>
                    <Grid item xs={2}>
                      <CardMedia
                          className={classes.cover}
                          image={this.props.songs[this.props.currentIndex].imageUrl}
                          style={{borderRadius: '5%'}}
                      />
                    </Grid>

                  </Grid>
            }


          </Paper>

          <LinearProgress variant="determinate" value={this.state.pSlider}
                          style={{height: 3, width: '100%'}}/>

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
  return bindActionCreators({addSong, setIndex}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter((withStyles(useStyles)(SongPanel))))
