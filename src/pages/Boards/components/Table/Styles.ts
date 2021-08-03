import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  table: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    borderTop: "1px solid rgba(63, 81, 181, 0.5)",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "start",
    fontSize: "20px",
    fontWeight: 600,
    color: "#3f51b5",
    borderBottom: "1px solid rgba(63, 81, 181, 0.5)",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
  },
  td: {
    marginTop: ".3rem",
    marginBottom: ".3rem",
    fontSize: "17px",
    color: "rgb(97 107 160)",
    cursor: "pointer",
  },
  addIcon: {
    cursor: "pointer",
  },
}));

export default useStyles;
