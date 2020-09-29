import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import Schedule from '@material-ui/icons/Schedule';
import Book from '@material-ui/icons/BookOutlined';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBarBg from '../../assets/img/sideBarBg.svg';
import TuronLogo from '../../assets/img/turonLogo.svg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { Link,Redirect } from 'react-router-dom';
import { requestGetUserData } from "../../store/actions/UserDataAction";
import { setLan,requestLan} from "../../store/actions/LangAction";
import { FAILURE_LOGIN } from "../../store/actions/actionTypes";
import { languages,lang } from "../../utils/constants";
import { LogOut} from "../../store/actions/AdminActions";
import "./profile.css";

const colorTheme = createMuiTheme({
  palette: {
    primary: { 
      main: blue[500] 
    },
    secondary: { 
      main: "#f44336" 
    },
  },
});

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: blue[500],
    backgroundImage: `url(${SideBarBg})`,
    backgroundSize: "inherit",    
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" 
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: { 
   minHeight: 56, 
   [theme.breakpoints.up('xs')]: { 
     minHeight: 48, 
   }, 
   [theme.breakpoints.up('sm')]: { 
     minHeight: 64, 
   }, 
 }, 
  drawerPaper: {
    width: drawerWidth,
    overflow: 'hidden'
  },
  content: {
    flexGrow: 1,
    paddingTop: 56,
    [theme.breakpoints.up('xs')]: { 
      padding: 0,
     paddingTop: 48,
    }, 
    [theme.breakpoints.up('sm')]: { 
      padding: 0,
     paddingTop: 64,
   }, 
    
  },
  menuItem: {
    padding: "11px 16px",
  },
  menuItemColor: {
    padding: "11px 16px",
    color: '#555',
  },
  menuItemColorActive: {
    '&:hover': {
             padding: "11px 16px",
             color: '#fff !important'
    },       
    padding: "11px 16px",
    color: '#fff !important',
    backgroundColor: '#2196F3 !important',
  },
  navUserData: {
    overflow: 'hidden',
    height: "138px",
    padding: "10px",
    color: "#fff",
    backgroundColor: blue[500],
    backgroundImage: `url(${TuronLogo})`,
    backgroundSize: "cover",    
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    overflow: 'hidden',
  },
  nameText: {
    paddingBottom: '0px',
    marginBottom: '0px',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: 'sans-serif'
  },
  subText: {
    opacity: 0.9,
    fontWeight: 700,
    fontFamily: 'sans-serif'
  },
  greenAvatar: {
    marginTop: "15px",
    marginBottom: "12px",
    width: 48,
    height: 48,
    color: '#fff',
    background: "#50DF76",
    backgroundSize: "400% 400%",
    animation: "Gradient 15s ease infinite",
  },
menuButton: { 
    marginLeft: "-10px",
    marginRight: 8,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  paddingRight: {
    marginRight: '10px !important',
  },
  list: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 0,
    marginTop: 0
  },
  divider: {
    width: '100%'
  },
  alignRight: {
    textAlign: 'right'
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const mapDispatchToProps = dispatch => ({logOut: ()=>  dispatch({type:  FAILURE_LOGIN, payload: false})});
const UserPage = (props) => {
  
  const {dispatch} = props
    useEffect(()=>{
        props.requestGetUserData();
        // console.log(props)
    }, []);
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { location: {pathname}, children } = props;
  const userFullName = (props.isAdmin.LoggedIn ? (props.isAdmin.data.firstname + " " + props.isAdmin.data.surname) : "Исм Фамилия").toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  const userAvatar = (props.isAdmin.LoggedIn ? (props.isAdmin.data.firstname + " " + props.isAdmin.data.surname) : "Исм Фамилия").split(/\s/).reduce((response, word)=>response+=word.slice(0, 1),'');

  const logOut = () => {
        try{
            props.LogOut();
        }catch(e){
            console.log(e);
        }
    }
    

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  function renderLans() {
		return lang.map(lan => {
			return (
				<li key={lan.key} onClick={() => props.setLan(lan)}>
					<span>{lan.displayName}</span>
				</li>
			);
		});
	}
    function selectedLan() {
		return lang.map(item => {
			if (item.key === props.language.key) {
				return <b key={item.key}>{item.displayName}</b>;
			} else {
				return null;
			}
		});
    }
  const drawer = (
      <div>
        <div className={classes.navUserData}>
          <Grid container >
          <Avatar className={classes.greenAvatar}>{userAvatar}</Avatar>
          </Grid>
          <h5 className={classes.nameText} dangerouslySetInnerHTML = { {__html: userFullName} }></h5>
          <p className={classes.subText} dangerouslySetInnerHTML = { {__html: props.isAdmin.LoggedIn && (props.isAdmin.data.position ? (props.isAdmin.data.position.length <= 25 ? props.isAdmin.data.position : props.isAdmin.data.position.slice(0, 24)  + "...") : '')} }></p>
        </div>
        <MenuList>
          {/*<MenuItem component={Link} to='/user' className={'/user' === pathname ? classes.menuItemColorActive : classes.menuItemColor} selected={'/user' === pathname}>
                      <Home className={classes.paddingRight}/>
                        Главная
                    </MenuItem>*/}
          <MenuItem component={Link} to='/user/assignedtests' className={'/user/assignedtests' === pathname ? classes.menuItemColorActive : classes.menuItemColor} selected={'/user/assignedtests' === pathname}>
            <Schedule className={classes.paddingRight}/>
              {languages[props.language.key].User.UserPage.Designated}
          </MenuItem>
          <MenuItem component={Link} to='/user/archive' className={'/user/archive' === pathname ? classes.menuItemColorActive : classes.menuItemColor} selected={'/user/archive' === pathname}>
            <Book className={classes.paddingRight}/>
              {languages[props.language.key].User.UserPage.Archieve}
          </MenuItem>
          
          <Divider />
          <MenuItem onClick={logOut} className={classes.menuItemColor} component={Link} to='/'>
            <ExitToApp className={classes.paddingRight}/>
              {languages[props.language.key].User.UserPage.LogOut}
          </MenuItem>
        </MenuList>
      </div>
    );

  if(props.isAdmin.LoggedIn){

  return (
    <ThemeProvider theme={colorTheme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Turonbank
          </Typography>
          <div className={classes.grow} />
          
          <IconButton color="inherit" onClick={handleOpen}>
            <AccountCircle style={{ fontSize: 32, marginRight: 0 }} />
        </IconButton>
        <div className="nav_wrapper" style={{alignContent:"right"}}>
            <FontAwesomeIcon icon={faGlobe}  style={{fontSize:"24px", marginRight:"10px"}}/>
            <div className="sl-nav" style={{alignContent: "right"}}>
              <ul>
                  <li>
                      {selectedLan()}
                      <div className="triangle" />
                      <ul>{renderLans()}</ul>
                  </li>
              </ul>
            </div>
          </div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {languages[props.language.key].User.UserPage.Employee_Information}
        </DialogTitle>

                <DialogContent>
                  
                    {props.isAdmin.LoggedIn &&
                  <List className={classes.list}>
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.UserPage.FIO} />
                    <ListItemText className={classes.alignRight} primary={<div dangerouslySetInnerHTML = { {__html: props.isAdmin.data.surname + " " + props.isAdmin.data.firstname + " " + props.isAdmin.data.lastname} }></div>} />
                  </ListItem>
                  <Divider className={classes.divider} />
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.UserPage.Branch} />
                    <ListItemText className={classes.alignRight} primary={props.isAdmin.data.branch ? props.isAdmin.data.branch.charAt(0).toUpperCase() + props.isAdmin.data.branch.slice(1).toLowerCase() : ""} />
                  </ListItem>
                  <Divider className={classes.divider} />
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.UserPage.Department} />
                    <ListItemText className={classes.alignRight} primary={<div dangerouslySetInnerHTML = { {__html: props.isAdmin.data.department} }></div>} />
                  </ListItem>
                  <Divider className={classes.divider} />
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.UserPage.Position} />
                    <ListItemText className={classes.alignRight} primary={<div dangerouslySetInnerHTML = { {__html: props.isAdmin.data.position} }></div>} />
                  </ListItem>
                </List>
                }
                </DialogContent>
                <DialogActions>
                  
                  <Button autoFocus onClick={handleClose} color="primary">
                    {languages[props.language.key].User.UserArchieve.Close}
                  </Button>

                </DialogActions>
      </Dialog>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        { children }
    </main>
    </div>
      </ ThemeProvider>
  );
  }else{
    return (<Redirect to={"/"}/>);
  }
}

const mapStateToProps = ({ isAdmin, router,language }) => ({ isAdmin, router,language });
export default connect(mapStateToProps, {requestGetUserData,mapDispatchToProps,setLan,requestLan,LogOut})(UserPage);
