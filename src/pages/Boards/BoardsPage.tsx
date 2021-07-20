import { Typography, Container } from "@material-ui/core";

import React from "react";
import useStyles from "./Styles";
import Table from "../../components/Table/Table";

const BoardsPage: React.FC = function () {
  const classes = useStyles();
  return (
    <Container>
      <div>
        <div>
          <Typography variant="h4" className={classes.title}>
            Boards
          </Typography>
        </div>
        <div>
          <div style={{ height: 400, width: "100%" }}>
            <Table />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BoardsPage;
