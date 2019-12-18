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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
      curSongIndex: 0
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

          this.audio.onloadedmetadata = function () {
            this.setState({
              name: detail.songs[0].name,
              author: detail.songs[0].ar[0].name,
              albumPicUrl: detail.songs[0].al.picUrl,
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

            if (this.state.curSongIndex === this.props.songs.length - 1) {
              this.setState({curSongIndex: 0})
              this.setCurSong()
            } else {
              this.setState({curSongIndex: this.state.curSongIndex += 1})

              this.setCurSong()

            }
            console.log(this.state.curSongIndex)

          }

        })

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

    if (this.state.curSongIndex === this.props.songs.length - 1) {
      this.setState({
        cusSongIndex: this.state.curSongIndex += -this.props.songs.length + 1
      })
      this.setCurSong()

    } else {
      this.setState({curSongIndex: this.state.curSongIndex += 1})

      this.setCurSong()

    }

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
                    <IconButton aria-label="previous">
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
                    <IconButton aria-label="next">
                      <SkipNextIcon className={classes.playIcon}
                                    onClick={() => this.next()}/>
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
                    <Checkbox checked={true}
                              icon={<PlaylistPlayIcon
                                  className={classes.scIcon}/>}
                              checkedIcon={<PlaylistPlayIcon
                                  className={classes.scIcon}/>}
                              value="checkedH"/>
                    <Checkbox icon={<ShuffleIcon className={classes.scIcon}/>}
                              checkedIcon={<ShuffleIcon
                                  className={classes.scIcon}/>}
                              value="checkedH"/>
                    <Checkbox icon={<LoopIcon className={classes.scIcon}/>}
                              checkedIcon={<LoopIcon
                                  className={classes.scIcon}/>}
                              value="checkedH"/>
                  </div>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    xs={3}
                >
                  <IconButton aria-label="next" aria-disabled>

                    <VolumeDownIcon className={classes.scIcon}/>
                  </IconButton>
                  <Slider
                      aria-labelledby="continuous-slider"
                      className={classes.vSlider}
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

