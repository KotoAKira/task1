import { CircularProgress, Container } from "@material-ui/core";
import React from "react";
// eslint-disable-next-line import/no-unresolved
import useStyles from "./styles";

const Spinner: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <CircularProgress color="secondary" />
    </Container>
  );
};

export default Spinner;
