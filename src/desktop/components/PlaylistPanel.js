import React from 'react'
import {withRouter} from "react-router";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Checkbox from "@material-ui/core/Checkbox";
import Grow from "@material-ui/core/Grow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@material-ui/core/TableContainer';
import PlayCircleFilledWhiteIcon
  from '@material-ui/icons/PlayCircleFilledWhite';
import {connect} from 'react-redux';
import {useSelector} from 'react-redux'
import {deleteSong, setIndex} from "../../actions/actions";
import {bindActionCreators} from 'redux'

const useStyles = theme => ({
  root: {},

  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  songTable: {},
  container: {
    height: '80vh',
  },

});

class PlaylistPanel extends React.Component {

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

          <Paper className={classes.paper} elevation={3}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table"
                     className={classes.songTable}>
                <TableHead>
                  <TableRow>

                    <TableCell>
                      <Typography variant={'h5'}>
                        Playlist
                      </Typography>
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

                    <TableCell>

                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.songs.length == 0 ? <Typography variant={"h6"}>No
                        songs yet, try add some.</Typography>
                      : this.props.songs.map(
                          (song, index) => (
                              <TableRow key={index}>

                                <TableCell component="th" scope="row">
                                  <IconButton size="small" aria-label="play"
                                              style={{
                                                backgroundColor: this.props.currentIndex
                                                == index
                                                    ? '#ADD8E6' : 'white'
                                              }}
                                              onClick={() => {
                                                this.props.setIndex(index)
                                              }}
                                  >
                                    <PlayCircleFilledWhiteIcon
                                        style={{"fontSize": 20}}
                                        className={classes.playIcon}/>
                                  </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {song.name}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                  {song.author}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                  <IconButton size="small" aria-label="play"
                                              onClick={() => {
                                                this.props.deleteSong(index)
                                              }}
                                  >
                                    <HighlightOffIcon
                                        style={{"fontSize": 20}}
                                        className={classes.playIcon}/>
                                  </IconButton>
                                </TableCell>

                              </TableRow>
                          ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>


        </div>

    )

  }

}

const mapStateToProps = (state) => {
  return {
    songs: state.state.songs,
    currentIndex: state.state.currentIndex,
    deletedIndex: state.state.deletedIndex

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setIndex, deleteSong}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter((withStyles(useStyles)(PlaylistPanel))))








