import React, { useEffect } from "react";
import { HashRouter, NavLink, renderMatches, Route, Routes } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
import axios from "axios";
import { useNavigate } from "react-router";


import { DrawerItems } from "./navbar";

import PLAdd from "../mainComponent/PlComponent/PlAdd";
import HomePage from "./home.jsx";
import { Card, Paper } from "@mui/material";
import { url } from "../../globalurl";


const drawerWidth = 240;


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

export default function Dashboard(props){
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);

  useEffect(()=>{
    handleLoginCheck()
  }, [])

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLoginCheck = () => {
    axios({
        url : `${url}dj-rest-auth/user/`,
        method : 'GET',
        headers : {
            'Authorization': "Bearer "+ localStorage.getItem('access-token')
        }
    }).then((res) => {
        if (res.status === 200) {
            if (res.data.isAdmin) {
                this.setState({role : "Admin"})
            } else if (res.data.isStaff) {
                this.setState({role : "Staff"})
            }
        } else {
          navigate('/login')
        }
    }).catch((err) => {
      navigate('/login')
    })
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // function to handle user Logout

  const handleLogout = () => {
    axios({
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem('access-token')}`
        },
        url : `${url}dj-rest-auth/logout/`
    }).then((res) => {
        if (res.status === 200) {
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('uName')
            localStorage.removeItem('uId')
            localStorage.removeItem('type')
            props.setIsLogged(false)
            navigate('/login')
        }
    })
    .catch((res) => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('uName')
        props.setIsLogged(false)
        navigate('/login')
    })
    
}

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            STATIS
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Change-Password</Typography>
              </MenuItem>
              <MenuItem onClick={() => {handleCloseUserMenu(); handleLogout();}}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {DrawerItems.map((firstLevel, i) => {
            if (firstLevel.url) {
              return (
                <NavLink
                  key={firstLevel.name}
                  exact
                  style={{ textDecoration: "none", color: "#adb0bb" }}
                  to={firstLevel.url}
                >
                  <ListItem key={firstLevel.name} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {/* {i % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                        {firstLevel.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={firstLevel.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              );
            }
          })}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p:3 }}>
        <DrawerHeader />
        <Paper className="mainContent" style={{display:'flex', flex:1, flexDirection:'column', gap:20, height:'max-content', minHeight : "100%"}}>
            
            <Routes>
                <Route exact="true" path="/" element={ <HomePage /> } />

                <Route exact="false" path="/add-pl" element={ <PLAdd /> } />
                <Route exact="false" path="/add-pl" element={ <PLAdd /> } />
            </Routes>
            {/* <Card style={{display:'flex', flex:1, flexDirection:'column', gap:20, height:'max-content', minHeight : "100%"}}>
            </Card> */}

        </Paper>
      </Box>
    </Box>
  );
}
