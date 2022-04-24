import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { clientPost } from "../../utils/apiClient";
import { eventsApi } from "../../utils/apis";
import DoneIcon from "@mui/icons-material/Done";
import {
  Chip,
  Button
} from "@mui/material";
import * as constants from "constants";
import {colors} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  body: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  notificationHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0,
    marginTop: 0,
    backgroundColor: colors.themeMain,
    paddingTop: 2,
    paddingLeft: 25,
    color: "#ffffff",
    paddingBottom: 2,
  },
  eachNotificationCard: {
    borderRadius: 10,
    border: "0.4px solid #b6b6b6",
    marginBottom: 20,
  },
  eachNotificationContent: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  tickCircle: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#00a86b",
    marginRight: 10,
    alignSelf: "center",
  },
  CrossCircle: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#ff0800",
    alignSelf: "center",
  },
  description: {
    paddingRight: 30,
    paddingLeft: 10,
  },
  footer: {
    paddingRight: 30,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
export default function EachEventCard(props) {
  const classes = useStyles();
  const { eachEvent } = props;
  const [isGoing, setisGoing] = useState(false);
  const handleUserRegisterClick = async () => {
    setisGoing((prev) => !prev);
    await clientPost(eventsApi.attendEvent(eachEvent._id));
  };

  return (
    <div className={classes.eachNotificationCard}>
      <div className={classes.notificationHeader}>
        <h2 style={classes.notificationTitle}>{eachEvent.title}</h2>
      </div>
      <div className={classes.eachNotificationContent}>
        <div className={classes.description}>
          <p>{eachEvent.body}</p>
        </div>
        <div className={classes.footer}>
          <div>
            <div>
              <Chip
                sx={{ mt: 2, mr: 1 }}
                color="success"
                label={moment(eachEvent.dateTime).format("MMM Do YYYY")}
                variant="filled"
              />
              <Chip
                sx={{ mt: 2, mr: 1 }}
                color="success"
                label={moment(eachEvent.dateTime).format('LT')}
                variant="filled"
              />
              <Chip
                sx={{ mt: 2, mr: 1 }}
                color="secondary"
                label={eachEvent?.college?.name}
                variant="filled"
              />
            </div>
            <Button
              style={{ marginTop: 10,marginBottom:10 }}
              variant="outlined"
              onClick={handleUserRegisterClick}
              startIcon={isGoing ? <DoneIcon /> : null}
            >
              {isGoing ? "Registered" : "Going"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
