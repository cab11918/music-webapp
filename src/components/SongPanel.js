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
  slider: {

    marginLeft: 'auto',
    marginRight: 'auto'
  }

});

function format(time) {
  // Hours, minutes and seconds
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

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
      slider: 0
    }

  }

  componentDidMount() {
    this.currentTimeInterval = null;
    service.getASongUrl(this.props.musicId).then(data => {
      this.audio = new Audio(data.data[0].url)

    })

    service.getASongDetail(this.props.musicId).then(detail => {
      this.setState({
        name: detail.songs[0].name,
        author: detail.songs[0].ar[0].name,
        albumPicUrl: detail.songs[0].al.picUrl,

      })
      this.audio.onloadedmetadata = function () {
        this.setState({duration: format(this.audio.duration)})

      }.bind(this)
      this.audio.onplay = () => {
        setInterval(() => {
          this.setState({
            slider: (this.audio.currentTime / this.audio.duration) * 100,
            currentTime: format(this.audio.currentTime)
          })
        }, 500)
      }
      this.audio.onended = () => {
        this.setState({play:false})
      }

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
    this.audio.currentTime =this.audio.duration * (value/100)
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

                      <Slider value={this.state.slider}
                              aria-labelledby="continuous-slider"
                              className={classes.slider}
                              onChange={(event,value) => this.seek(value)}/>
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
                      <SkipNextIcon className={classes.playIcon}/>
                    </IconButton>
                  </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={this.state.albumPicUrl}
                />

              </Grid>


            </Grid>


          </Card>


        </div>

    )

  }

}

export default withRouter((withStyles(useStyles)(SongPanel)))

