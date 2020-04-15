import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom:0,
    position: 'fixed',

  },
});

export default function PlaylistView() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
      <div>hello playlistview</div>
  );
}
