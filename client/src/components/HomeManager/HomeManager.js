import React,{useState,useEffect} from "react";
import { Link,useNavigate,useLocation} from "react-router-dom";
import { Container, Grow, Grid , Button } from '@material-ui/core';


export const HomeManager =()=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isAdminInterne,setAdminInterne] = useState(false);
    const location = useLocation();

    const navigation = useNavigate();

    useEffect(()=>{
        if(user.result.typeadmin)
        navigation('/home/admin');
        if(!user.result.typeadmin)
        navigation('/home/client');
      },[location]);
    return(
    <div></div>
    );
    
};
