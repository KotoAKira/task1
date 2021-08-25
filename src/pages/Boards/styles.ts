import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "1rem",
    marginBottom: "1rem",
    color: "#3f51b5",
    fontWeight: 700,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  body: {
    height: "400px",
    width: "100%",
  },
}));

export default useStyles;
