import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import MusicService from "../services/MusicService";
import Slider from "@material-ui/core/Slider";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";
import Grow from "@material-ui/core/Grow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const service = MusicService.getInstance()

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
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
    width: 210,
    height: 210,
    marginLeft: 'auto'

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
  pSlider: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  vSlider: {
    width: '50%',
    marginLeft: 10,
  },
  scIcon: {
    height: 16,
    width: 16,
  },
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
      songUrls: []
    }

  }

  componentDidMount() {
    this.initializeSong()
  }

  initializeSong() {

    service.getASongUrl(this.props.songs[this.state.curSongIndex]).then(
        data => {
          this.audio = new Audio(data.data[0].url)
          this.audio.load()

        })

    service.getASongDetail(this.props.songs[this.state.curSongIndex]).then(
        detail => {

          try {
            this.audio.onloadedmetadata = function () {
              this.setState({
                name: detail.songs[0].name,
                author: detail.songs[0].ar[0].name,
                albumPicUrl: detail.songs[0].al.picUrl,
                duration: format(this.audio.duration)
              })

            }.bind(this)
          } catch (err) {
            window.location.reload(false);

          }

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
                if (this.state.curSongIndex === this.props.songs.length - 1) {
                  this.setState({curSongIndex: 0})
                  this.setCurSong()
                } else {
                  this.setState({curSongIndex: this.state.curSongIndex += 1})

                  this.setCurSong()

                }
                break;
              case 1:
                let shuffleIndex = this.getRandomSong()
                while (shuffleIndex === this.state.curSongIndex) {
                  shuffleIndex = this.getRandomSong()
                }

                this.setState({curSongIndex: shuffleIndex})

                this.setCurSong()

                break;
              case 2:
                this.audio.play()
                break;
            }

          }

        })

  }

  getRandomSong() {
    return Math.floor(Math.random() * Math.floor(this.props.songs.length))
  }

  setCurSong() {
    service.getASongDetail(this.props.songs[this.state.curSongIndex]).then(
        detail => {

          this.audio.onloadedmetadata = function () {
            this.setState({
              name: detail.songs[0].name,
              author: detail.songs[0].ar[0].name,
              albumPicUrl: detail.songs[0].al.picUrl,
              duration: format(this.audio.duration)
            })
          }.bind(this)

        })

    service.getASongUrl(this.props.songs[this.state.curSongIndex]).then(
        data => {
          this.audio.pause();
          this.audio.src = data.data[0].url
          this.audio.load();
          this.audio.play();
        })
  }

  pause() {
    this.setState({play: false})
    this.audio.pause()
  }

  play() {
    this.setState({play: true, duration: format(this.audio.duration)})
    this.audio.play()

  }

  seek(value) {
    this.audio.currentTime = Math.floor(this.audio.duration * (value / 100))
  }

  next() {

    switch (this.state.playMode) {
      case 2:
        if (this.state.curSongIndex === this.props.songs.length - 1) {
          this.setState({curSongIndex: 0})
          this.setCurSong()
        } else {
          this.setState(
              {curSongIndex: this.state.curSongIndex += 1, play: true})

          this.setCurSong()

        }
        break;
      case 1:
        let shuffleIndex = this.getRandomSong()
        while (shuffleIndex === this.state.curSongIndex) {
          shuffleIndex = this.getRandomSong()
        }

        this.setState({curSongIndex: shuffleIndex, play: true})

        this.setCurSong()

        break;
      case 0:
        if (this.state.curSongIndex === this.props.songs.length - 1) {
          this.setState({curSongIndex: 0})
          this.setCurSong()
        } else {
          this.setState(
              {curSongIndex: this.state.curSongIndex += 1, play: true})

          this.setCurSong()

        }
        break;
    }

  }

  previous() {

    switch (this.state.playMode) {
      case  2:
        if (this.state.curSongIndex === 0) {
          this.setState({
            cusSongIndex: this.state.curSongIndex -= -this.props.songs.length
                + 1,
            play: true
          })
          this.setCurSong()

        } else {
          this.setState({
            curSongIndex: this.state.curSongIndex -= 1,
            play: true
          })

          this.setCurSong()

        }
        break;
      case 1:
        let shuffleIndex = this.getRandomSong()
        while (shuffleIndex === this.state.curSongIndex) {
          shuffleIndex = this.getRandomSong()
        }

        this.setState({curSongIndex: shuffleIndex, play: true})

        this.setCurSong()

        break;
      case  0:
        if (this.state.curSongIndex === 0) {
          this.setState({
            cusSongIndex: this.state.curSongIndex -= -this.props.songs.length
                + 1,
            play: true
          })
          this.setCurSong()

        } else {
          this.setState({
            curSongIndex: this.state.curSongIndex -= 1,
            play: true
          })

          this.setCurSong()

        }
        break;

    }
  }

  changeVolume(value) {
    this.setState({volume: value})
    this.audio.volume = this.state.volume / 100
  }

  render() {
    const {classes} = this.props;
    return (

        <div className={classes.root}>


          <Card className={classes.card}>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"

            >

              <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
              >


                <div className={classes.details}>


                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {this.state.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {this.state.author}
                    </Typography>

                    <Grid direction={'row'}>

                      <Slider value={this.state.pSlider}
                              aria-labelledby="continuous-slider"
                              className={classes.pSlider}
                              onChange={(event, value) => this.seek(value)}/>
                      <Typography>
                        {this.state.currentTime}/{this.state.duration}
                      </Typography>

                    </Grid>

                  </CardContent>
                  <div className={classes.controls}>
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
                    <IconButton aria-label="next" onClick={() => this.next()}>
                      <SkipNextIcon className={classes.playIcon}
                      />
                    </IconButton>
                  </div>

                </div>
                <CardMedia
                    className={classes.cover}
                    image={this.state.albumPicUrl}
                />

              </Grid>


              <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
              >
                <Grid item xs={9}>
                  <div className={classes.playSecControlFix}>
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
                              checked={this.state.playMode === 1 ? true : false}
                              onChange={() => {
                                this.setState(
                                    {
                                      playMode: 1
                                    })
                              }}/>
                    <Checkbox icon={<LoopIcon className={classes.scIcon}/>}
                              checkedIcon={<LoopIcon
                                  className={classes.scIcon}/>}
                              checked={this.state.playMode === 2 ? true : false}
                              onChange={() => {
                                this.setState({
                                  playMode: 2
                                })
                              }}/>
                  </div>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    xs={3}
                >

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

                  <Slider

                      aria-labelledby="continuous-slider"
                      className={classes.vSlider}
                      value={this.state.volume}
                      onChange={(event, value) => this.changeVolume(value)}
                  />
                </Grid>


              </Grid>


            </Grid>

          </Card>

        </div>

    )

  }

}

export default withRouter((withStyles(useStyles)(SongPanel)))

