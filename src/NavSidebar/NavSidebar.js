import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import StarsIcon from "@material-ui/icons/Stars";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";
import useStyles from "./NavSidebar.style";
import Emitter from "../services/Emitter";

const NAV_BAR_FIRST_SECTION_ITEMS = [
  { name: "My Day", navLink: "/myday", icon: <WbSunnyIcon /> },
  { name: "Starred", navLink: "/starred", icon: <StarsIcon /> },
  { name: "Tasks", navLink: "/tasks", icon: <AssignmentIcon /> },
];

const NAV_BAR_SECOND_SECTION_ITEMS = [{ name: "Groups" }, { name: "New List" }];

function NavSidebar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  Emitter.on("CLOSE_NAV_SIDE_BAR", () => {
    setOpen(false);
  });

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.drawerIcon}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {NAV_BAR_FIRST_SECTION_ITEMS.map((item) => (
            <ListItem
              button
              key={item.name}
              component={NavLink}
              to={item.navLink}
              exact
              activeClassName={classes["active-link"]}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {NAV_BAR_SECOND_SECTION_ITEMS.map((item) => (
            <ListItem button key={item.name}>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default NavSidebar;
