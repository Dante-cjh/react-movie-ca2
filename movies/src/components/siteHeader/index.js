import React, {useContext, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {Link, useNavigate} from "react-router-dom";
import {styled} from '@mui/material/styles';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {AuthContext} from "../../contexts/authContext";

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);
const SiteHeader = ({history}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {userName, isAuthenticated, signOut} = useContext(AuthContext)
    const [drawerOpen, setDrawerOpen] = useState({"right": false});

    const open = Boolean(anchorEl);
    const userAvatar = isAuthenticated ? userName[0] : '?';

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const menuOptions = [
        {label: "Home", path: "/"},
        {label: "Upcoming", path: "/movies/upcoming"},
        {label: "Trending", path: "/movies/trending"},
        {label: "Actors", path: "/actor"}
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, {replace: true});
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarClick = () => {
        if (isAuthenticated) {
            toggleDrawer(true);
        } else {
            // Redirect to login page
            console.log('Redirecting to login page');
            navigate('/login');
        }
    };

    const handleLogout = () => {
        signOut();
        toggleDrawer(false)
        navigate('/', {replace: true});
    };

    const toggleDrawer = (open) => {
        setDrawerOpen({"right": open});
    };

    const drawerList = () => (
        <Box
            role="presentation"
        >
            <List>
                {[
                    {label: "Favorites", path: "/movies/favorites"},
                    {label: "Must Watch", path: "/movies/toWatch"},
                    {label: "Chase Star", path: "/actor/favorites"},
                ].map((item, index) => (
                    <ListItem button key={item.label} disablePadding>
                        <ListItemButton to={item.path} component={Link}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Sign out"/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h4" sx={{flexGrow: 1}}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </>
                    )}
                    <Avatar sx={{cursor: 'pointer'}} onClick={handleAvatarClick}>
                        {userAvatar}
                    </Avatar>
                    <Drawer anchor='right' open={drawerOpen.right} onClose={() => toggleDrawer(false)}>
                        {drawerList()}
                    </Drawer>
                </Toolbar>
            </AppBar>
            <Offset/>
        </>
    );
};

export default SiteHeader;