// import React from 'react'
// import {withRouter} from "react-router";
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import withStyles from "@material-ui/core/styles/withStyles";
// import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import IconButton from "@material-ui/core/IconButton";
// import CardMedia from "@material-ui/core/CardMedia";
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
// import PauseIcon from '@material-ui/icons/Pause';
// import MusicService from "../services/MusicService";
// import Slider from "@material-ui/core/Slider";
// import VolumeDownIcon from '@material-ui/icons/VolumeDown';
// import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
// import ShuffleIcon from '@material-ui/icons/Shuffle';
// import LoopIcon from '@material-ui/icons/Loop';
// import VolumeOffIcon from '@material-ui/icons/VolumeOff';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
//
// import Checkbox from "@material-ui/core/Checkbox";
// import Grow from "@material-ui/core/Grow";
// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import TableBody from "@material-ui/core/TableBody";
//
// const service = MusicService.getInstance()
//
// const useStyles = theme => ({
//
//
// });
//
//
// class PlaylistPanel extends React.Component {
//
//   constructor(props) {
//
//     super(props);
//     this.state = {
//
//     }
//
//   }
//
//   componentDidMount() {
//   }
//
//
//   render() {
//     const {classes} = this.props;
//     return (
//
//         <div className={classes.root}>
//
//           <Table className={classes.table} aria-label="simple table">
//             <TableHead className={classes.th}>
//               <TableRow>
//                 <TableCell>
//                   <div className={classes.th}>Name</div>
//                 </TableCell>
//
//                 <TableCell align="right">
//                   <div className={classes.th}>Playtime</div>
//                 </TableCell>
//                 <TableCell align="right">
//                   <div className={classes.th}>Release Date</div>
//                 </TableCell>
//                 <TableCell align="right">
//                   <div className={classes.th}>Rating</div>
//                 </TableCell>
//
//
//
//               </TableRow>
//             </TableHead>
//             <TableBody>
//
//
//
//                       <TableRow key={details[0].id}>
//                         <TableCell component="th" scope="row">
//                           <div className={classes.tr}>
//                             <img src={details[0].al.picUrl}
//                                  className={classes.img}/>
//
//
//                             <a
//                             >{details[0].name}</a>
//
//                           </div>
//                         </TableCell>
//
//                         <TableCell align="right">
//                           <div className={classes.tr}>asd</div>
//                         </TableCell>
//
//                         <TableCell align="right">
//                           <div className={classes.tr}>asd</div>
//                         </TableCell>
//                         <TableCell align="right">
//                           <div className={classes.tr}>asd</div>
//                         </TableCell>
//
//                       </TableRow>
//
//
//
//
//
//             </TableBody>
//           </Table>
//         </div>
//
//     )
//
//   }
//
// }
//
// export default withRouter((withStyles(useStyles)(PlaylistPanel)))
//
//
//
//
//
