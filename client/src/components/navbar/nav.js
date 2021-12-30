import React,{useState ,useEffect } from "react";
import {AppBar , Toolbar, Typography,Button } from '@material-ui/core';
import { Link ,useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from './styles.js';

export const Nav = () => {
  const classes=useStyles();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isClient,setClient] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logout = () => {
    dispatch({type : 'LOGOUT'});
    navigation('/');
    window.location.reload(false);
  }
  const login = () => {
    
    navigation('/auth'); 
    window.location.reload(false)
  }

    useEffect(()=>{
      if(user!=null ){
        if(user.result!=null){
          if(user.result.typeadmin){
            setClient(false);
          }else
          setClient(true);
        }
      }
    },[user,isClient]);
    if(user==null){
      return(
        <AppBar className={classes.appBar}>
          <div></div>
        <Toolbar className={classes.toolbar}>
            <Button onClick={login} className={classes.typo}>Sign in</Button>
          </Toolbar>
      </AppBar>
      );
    }
   
  return (
    <AppBar className={classes.appBar}>
      {user && (
            <>
              {isClient && (
                      <>
                        <div>
                          <Typography component={Link} to="/home" className={classes.heading}  >  Home </Typography>
                        </div>
                        <div>
                          <Typography component={Link} to="/home" className={classes.heading}  >  Activities </Typography>
                        </div>
                        <div>
                          <Typography component={Link} to="/home" className={classes.heading}  >  Experience </Typography>
                        </div>
                        <div>
                          <Typography component={Link} to="/home" className={classes.heading}  >  Contact </Typography>
                        </div>     
                      </>
              )
              }
              <Typography component={Link} to="/home" className={classes.heading}  > {user.result.nomadmin} </Typography>
              <Toolbar className={classes.toolbar}>
                <Button onClick={logout} className={classes.typo}>Sign out</Button>
              </Toolbar>
          </>
          )}  
    </AppBar>
  )
}