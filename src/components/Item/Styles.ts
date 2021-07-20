import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    boxSizing: "border-box",
    position: "relative",
    width: "95%",
    fontWeight: 400,
    backgroundColor: "#fff",
    marginBottom: "10px",
    borderRadius: "5px",
    padding: "10px",
    paddingRight: "65px",
    cursor: "grab",
    transition:
      "background-color 140ms ease-in-out 0s, color 140ms ease-in-out 0s",
    boxShadow:
      "rgb(23 43 77 / 20%) 0px 1px 1px, rgb(23 43 77 / 20%) 0px 0px 1px;",
    "&:hover": {
      backgroundColor: "rgb(244, 245, 247)",
      "& $editItemIcon": {
        visibility: "visible",
      },
      "& $deleteItemIcon": {
        visibility: "visible",
      },
    },
  },
  editItemIcon: {
    boxSizing: "border-box",
    padding: "3px",
    position: "absolute",
    visibility: "hidden",
    right: "5px",
    top: "5px",
    width: "25px",
    height: "25px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    color: "rgba(0, 0, 0, .7)",
    transition: "140ms ease-in-out 0s, color 140ms ease-in-out 0s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .1)",
    },
  },
  deleteItemIcon: {
    boxSizing: "border-box",
    padding: "3px",
    position: "absolute",
    visibility: "hidden",
    right: "35px",
    top: "5px",
    width: "25px",
    height: "25px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    color: "rgba(0, 0, 0, .7)",
    transition: "140ms ease-in-out 0s, color 140ms ease-in-out 0s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, .1)",
    },
  },
}));

export default useStyles;
