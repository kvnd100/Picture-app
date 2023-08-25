import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink, Link } from "react-router-dom";
import Classes from "./MainHeader.module.css";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";

const drawerWidth = 240;

function MainHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const auth = useContext(AuthContext);

  const navItems = auth.isLoggedIn
    ? [
        <NavLink activeClassName={Classes.activenavlink} className={Classes.navlink} to="/" exact>
          All Users
        </NavLink>,
        <NavLink
          activeClassName={Classes.activenavlink}
          className={Classes.navlink}
          to={`/${auth.userId}/places`}
        >
          My Places
        </NavLink>,
        <NavLink
          activeClassName={Classes.activenavlink}
          className={Classes.navlink}
          to="/places/new"
        >
          Add Places
        </NavLink>,
        <NavLink
          activeClassName={Classes.activenavlink}
          className={Classes.navlink}
          to="/events/new"
        >
          Add Events
        </NavLink>,

        <NavLink
          activeClassName={Classes.activenavlink}
          className={Classes.navlink}
          to={`/calendar/${auth.userId}`}
        >
          Calendar
        </NavLink>,
        <NavLink activeClassName={Classes.activenavlink} className={Classes.navlink} to="/auth">
          <Button
            color="inherit"
            onClick={() => {
              auth.logout();
            }}
          >
            Logout
          </Button>
        </NavLink>,
      ]
    : [
        <NavLink activeClassName={Classes.activenavlink} className={Classes.navlink} to="/" exact>
          All Users
        </NavLink>,
        <NavLink activeClassName={Classes.activenavlink} className={Classes.navlink} to="/auth">
          Authentication
        </NavLink>,
      ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      style={{ backgroundColor: "#FFAA33", height: "100vh" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link className={`${Classes.navlink} ${Classes.navtitle}`} to="/">
          Placebo
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: "#FFAA33" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              className={`${Classes.navlink} ${Classes.navtitle}`}
              style={{ paddingLeft: "1.5rem" }}
              to="/"
            >
              Placebo
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default MainHeader;
