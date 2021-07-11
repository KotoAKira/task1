import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import useStyles from "./Styles";

const MainPage: React.FC = function () {
  const history = useHistory();
  const classes = useStyles();
  const redirect = (to: string) => () => {
    history.push(to);
  };
  return (
    <>
      <Navbar />
      <Container>
        <div className={classes.mainBlock}>
          <div className={classes.mainBlockContent}>
            <Typography variant="h4">
              Tasks Boards helps teams move work forward.
            </Typography>
            <Typography className={classes.mainBlockContentText}>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Tasks Boards.
            </Typography>
            <Button
              onClick={redirect("/registration")}
              className={classes.mainBlockContentBtn}
              color="primary"
              variant="outlined"
            >
              Sign up
            </Button>
          </div>
          <img
            className={classes.mainBlockImg}
            src="https://www.jet-services.com/wp-content/uploads/shutterstock_1350437867.jpg"
            alt="Team work"
          />
        </div>
      </Container>
    </>
  );
};

export default MainPage;
