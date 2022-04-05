import React, { useContext, useState } from "react";

import {
  Card,
  Chip,
  CardHeader,
  CardActionArea,
  Paper,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AttachmentIcon from "@mui/icons-material/Attachment";

import axios from "axios";

import useStyles from "./styles";
import UserContext from "../../context/context";
import moment from "moment";
import { clientGet, clientPost } from "../../utils/apiClient";
import { eventsApi } from "../../utils/apis";

export default function EachEventCard(props) {
  const { data } = props;
  const classes = useStyles();
  const [isGoing, setisGoing] = useState(data.going);

  //TODO: add college name

  const handleEventAttend = async () => {
    setisGoing((prev) => !prev);
    await clientPost(eventsApi.attendEvent(data._id));
  };

  return (
    <Card key={data._id} className={classes.card}>
      <CardActionArea component={Link} to={`/`}>
        <div style={{ margin: 10 }}>
          <Typography
            variant="h6"
            component="p"
            style={{ paddingBottom: "10px" }}
          >
            {data.title}
          </Typography>
          <p>{data.body}</p>

          <Chip
            sx={{ mt: 2, mr: 1 }}
            color="primary"
            label={moment(data.dateTime).format("MMM Do YYYY")}
            variant="filled"
          />
          <Chip
            sx={{ mt: 2, mr: 1 }}
            color="primary"
            label={moment(data.dateTime).format('LT')}
            variant="filled"
          />

          <Chip
            sx={{ mt: 2, mr: 1 }}
            color="primary"
            label={data.college}
            variant="filled"
          />

          <div onClick={handleEventAttend}>
            <Chip
              sx={{ mt: 2, mr: 1 }}
              color={isGoing ? "success" : "primary"}
              label="Going"
              variant={isGoing ? "filled" : "outlined"}
            />
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}
