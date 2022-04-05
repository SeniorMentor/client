import React, { useState, useEffect } from "react";
import Notification from "../../components/Notification/Notification";
import { makeStyles } from "@mui/styles";
import { clientGet } from "../../utils/apiClient";
import { eventsApi } from "../../utils/apis";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { Button } from "@mui/material";
import EachEventCard from "./EachEventCard";

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
    backgroundColor: "#1876D1",
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
  logoContainer: {},
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

export default function NotificationPage() {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    clientGet(eventsApi.events())
      .then((response) => {
        console.log(response);
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <h1>Events page</h1>

      {events.map((eachEvent) => (
        <EachEventCard eachEvent={eachEvent} />
      ))}
    </div>
  );
}
