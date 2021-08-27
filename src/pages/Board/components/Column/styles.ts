import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  column: {
    position: "relative",
    minWidth: "300px",
    maxWidth: "300px",
    minHeight: "530px",
    height: "fit-content",
    borderRadius: "10px",
    backgroundColor: "rgb(244, 245, 247)",
    display: "flex",
    cursor: "grab",
    flexDirection: "column",
    alignItems: "center",
  },
  columnTitle: {
    boxSizing: "border-box",
    color: "rgb(94, 108, 132)",
    fontWeight: 500,
    fontSize: "18px",
    padding: "5px",
    paddingLeft: "15px",
    paddingRight: "95px",
    width: "100%",
    textAlign: "left",
    marginBottom: "1rem",
  },
  columnContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
  editColumnIcon: {
    boxSizing: "border-box",
    padding: "3px",
    position: "absolute",
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
  deleteColumnIcon: {
    boxSizing: "border-box",
    padding: "3px",
    position: "absolute",
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
  addIcon: {
    position: "absolute",
    right: "65px",
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
