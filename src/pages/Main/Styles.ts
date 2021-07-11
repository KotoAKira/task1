import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBlock: {
    display: "flex",
    flexDirection: "row",
  },
  mainBlockImg: {
    width: "700px",
  },
  mainBlockContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  mainBlockContentBtn: {
    width: "200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  mainBlockContentText: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export default useStyles;
