import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginLeft: theme.spacing(3),
  },
  header: {
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderBottom: "2px solid #3f51b5",
  },
  logo: {
    fontSize: theme.typography.fontSize * 2,
    textDecoration: "none",
    color: "#3f51b5",
  },
}));

export default useStyles;
