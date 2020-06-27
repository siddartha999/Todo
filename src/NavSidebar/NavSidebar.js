import React, { useState, createRef } from "react";
import "./NavSidebar.css";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import StarsIcon from "@material-ui/icons/Stars";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";
import useStyles from "./NavSidebar.style";
import Emitter from "../services/Emitter";
import InputForm from "../InputForm/InputForm";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import ListSharpIcon from "@material-ui/icons/ListSharp";
import useNavSidebarListReducer from "./NavSidebar.lists.reducer";

const NAV_BAR_FIXED_ITEMS = [
  { name: "My Day", navLink: "/myday", icon: <WbSunnyIcon /> },
  { name: "Starred", navLink: "/starred", icon: <StarsIcon /> },
  { name: "Tasks", navLink: "/tasks", icon: <AssignmentIcon /> },
];

function NavSidebar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const addNewListInputRef = createRef(null);
  const [lists, dispatch] = useNavSidebarListReducer([]);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  Emitter.on("CLOSE_NAV_SIDE_BAR", () => {
    setOpen(false);
  });

  const handleAddListIconClicked = () => {
    if (addNewListInputRef.current) {
      addNewListInputRef.current.focus();
    }
    if (!open) {
      setOpen(true);
    }
  };

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
          {NAV_BAR_FIXED_ITEMS.map((item) => (
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
          {lists.map((item) => (
            <ListItem button key={item.id}>
              <ListItemIcon>{<ListSharpIcon />}</ListItemIcon>
              <ListItemText primary={item.listName} />
            </ListItem>
          ))}
        </List>
        <div className="NavSidebar-add-list-container">
          <div
            className="NavSidebar-add-list-icon-wrapper"
            onClick={handleAddListIconClicked}
          >
            <AddSharpIcon />
          </div>
          <div className="NavSidebar-add-list-input-form-wrapper">
            <InputForm
              ref={addNewListInputRef}
              placeholderLabel="New List"
              variant="outlined"
              dispatch={dispatch}
              actionType="ADD_LIST_ITEM"
            ></InputForm>
          </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default NavSidebar;
