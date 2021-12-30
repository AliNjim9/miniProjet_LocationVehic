import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    position: "static",
    color :"rgba(245, 40, 145, 0.8)",
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: deepPurple["A700"],
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(120,183,255, 1)',
    textDecoration: 'none',
    variant :'h3'
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  typo: {
    border : '3px solid',
    borderRadius: 20,
    color: 'primary',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    variant: 'h3'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  time : {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100px',
    color :'#121858',
    fontWeight:'fontWeightBold',
    fontFamily:'monospace',
  }
}))
