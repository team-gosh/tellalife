import React, { useState, useEffect } from "react";
import Reservation from "./Reservation";
import * as customQueries from "../graphql/customQueries";

//material ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import HearingIcon from "@material-ui/icons/Hearing";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import HistoryIcon from "@material-ui/icons/History";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  tab: {
    backgroundColor: "#E6DDC6"
  },
  pending: {
    backgroundColor: "#F9F7F7"
  },
  approved: {
    backgroundColor: "#F9F7F7"
  },
  confirmed: {
    backgroundColor: "#F9F7F7"
  },
  finished: {
    backgroundColor: "#F9F7F7"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  column: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  checkCircleIcon: {
    color: "#63B028"
  },
  paper_root: {
    flexGrow: 1,
    maxWidth: 500
  }
}));

function ReservationManagement(props) {
  const classes = useStyles();

  const { user, setUser, setVideo, video, API, queries, mutations } = props;
  const [view, setView] = useState("listener");
  const [value, setValue] = useState(0);
  const [reservations, setReservations] = useState([]);

  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

  const [pendingListenerCounts, setPendingListenerCounts] = useState("");
  const [approveListenerCounts, setApproveListenerCounts] = useState("");
  const [confirmedListenerCounts, setConfirmedListenerCounts] = useState("");
  const [finishedListenerCounts, setFinishedListenerCounts] = useState("");
  const [pendingTellerCounts, setPendingTellerCounts] = useState("");
  const [approveTellerCounts, setApproveTellerCounts] = useState("");
  const [confirmedTellerCounts, setConfirmedTellerCounts] = useState("");
  const [finishedTellerCounts, setFinishedTellerCounts] = useState("");
  // const [allAttendingUser, setAllAttendingUser] = useState([]);

  useEffect(async () => {
    try {
      // Retrieve Reservation Data one at a time from data
      // from intermediary table
      const currentReservations = await Promise.all(
        user.reservations.items.map(async (e) => {
          // const reservation = (
          //   await API.graphql({
          //     query: queries.getReservation,
          //     variables: {
          //       id: e.reservationID
          //     }
          //   })
          // ).data.getReservation;
          const reservation = e.reservation;
          return reservation;
        })
      );
      setReservations(currentReservations);

    } catch (error) {
      console.error(error.message);
    }
  }, [user]);

  useEffect(async () => {
    try {
      // const allAttendingUser = (
      //   await API.graphql({
      //     query: queries.listAttendingUsers
      //   })
      // ).data.listAttendingUsers.items;
      const arrayOfSeenPendingListener = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "pending")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID !== e.reservation.tellerID);
      setPendingListenerCounts(arrayOfSeenPendingListener.length);

      const arrayOfSeenApprovedListener = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "approved")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID !== e.reservation.tellerID);
      setApproveListenerCounts(arrayOfSeenApprovedListener.length);

      const arrayOfSeenConfirmedListener = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "confirmed")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID !== e.reservation.tellerID);
      setConfirmedListenerCounts(arrayOfSeenConfirmedListener.length);

      const arrayOfSeenFinishedListener = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "finished")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID !== e.reservation.tellerID);
      setFinishedListenerCounts(arrayOfSeenFinishedListener.length);

      const arrayOfSeenPendingTeller = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "pending")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID === e.reservation.tellerID);
      setPendingTellerCounts(arrayOfSeenPendingTeller.length);

      const arrayOfSeenApprovedTeller = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "approved")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID === e.reservation.tellerID);
      setApproveTellerCounts(arrayOfSeenApprovedTeller.length);

      const arrayOfSeenConfirmedTeller = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "confirmed")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID === e.reservation.tellerID);
      setConfirmedTellerCounts(arrayOfSeenConfirmedTeller.length);

      const arrayOfSeenFinishedTeller = user.reservations.items
        .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === "finished")
        .filter((e) => e.seen === false)
        .filter((e) => e.userID === e.reservation.tellerID);
      setFinishedTellerCounts(arrayOfSeenFinishedTeller.length);
    } catch (error) {
      console.error(error.message);
    }
  }, [reservations]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleChangePanel1 = (panel) => (event, isExpanded) => {
    setExpanded1(isExpanded ? panel : false);
    if (view === "listener") {
      setPendingListenerCounts(0);
      updateAttendingUsersForListener("pending");
      handleStatusChange();
    } else {
      setPendingTellerCounts(0);
      updateAttendingUsersForTeller("pending");
      handleStatusChange();
    }
  };
  const handleChangePanel2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
    if (view === "listener") {
      setApproveListenerCounts(0);
      updateAttendingUsersForListener("approved");
      handleStatusChange();
    } else {
      setApproveTellerCounts(0);
      updateAttendingUsersForTeller("approved");
      handleStatusChange();
    }
  };
  const handleChangePanel3 = (panel) => (event, isExpanded) => {
    setExpanded3(isExpanded ? panel : false);
    if (view === "listener") {
      setConfirmedListenerCounts(0);
      updateAttendingUsersForListener("confirmed");
      handleStatusChange();
    } else {
      setConfirmedTellerCounts(0);
      updateAttendingUsersForTeller("confirmed");
      handleStatusChange();
    }
  };
  const handleChangePanel4 = (panel) => (event, isExpanded) => {
    setExpanded4(isExpanded ? panel : false);
    if (view === "listener") {
      setFinishedListenerCounts(0);
      updateAttendingUsersForListener("finished");
    } else {
      setFinishedTellerCounts(0);
      updateAttendingUsersForTeller("finished");
    }
  };

  function createReservation(status) {
    return reservations
      .filter((e) =>
        view === "teller" ? e.tellerID === user.id : e.tellerID !== user.id
      )
      .map((data, index) => {
        if (data.status === status) {
          return (
            <Reservation
              key={index}
              data={data}
              status={data.status}
              view={view}
              setVideo={setVideo}
              user={user}
              removeReservation={removeReservation}
              pendingToApproved={pendingToApproved}
              approvedToConfirmed={approvedToConfirmed}
            />
          );
        }
      });
  }

  async function removeReservation(reservationID) {
    try {
      console.log("id of reservation to delete");
      console.log(reservationID)
      // const attendingUsers = (
      //   await API.graphql({
      //     query: queries.listAttendingUsers,
      //     filter: { reservationID: { eq: reservationID } }
      //   })
      // ).data.listAttendingUsers.items;

      const attendingUsers = (
        await API.graphql({
          query: queries.getAttendingUsersByReservationID,
          variables: {
            reservationID: reservationID
          }
        })
      ).data.getAttendingUsersByReservationID.items;

      console.log("attending users in removeReservation")
      console.log(attendingUsers)

      await Promise.all(attendingUsers.forEach(async (e) => {
        await API.graphql({
          query: mutations.deleteAttendingUsers,
          variables: { input: { id: e.id } }
        });
      }));

      await API.graphql({
        query: mutations.deleteReservation,
        variables: { input: { id: reservationID } }
      });

      const updatedUserData = (
        await API.graphql({
          query: customQueries.getUser,
          variables: {
            id: user.id
          }
        })
      ).data.getUser;
      setUser(updatedUserData);

      updateReservations(updatedUserData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function updateReservations(userData) {
    try {
      const currentReservations = await Promise.all(
        userData.reservations.items.map(async (e) => {
          const reservation = (
            await API.graphql({
              query: queries.getReservation,
              variables: {
                id: e.reservationID
              }
            })
          ).data.getReservation;
          return reservation;
        })
      );
      setReservations(currentReservations);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function pendingToApproved(reservationID) {
    try {
      await API.graphql({
        query: mutations.updateReservation,
        variables: {
          input: {
            id: reservationID,
            status: "approved",
            stripeAccount: user.stripeAccount
          }
        }
      });

      const updatedUserData = (
        await API.graphql({
          query: customQueries.getUser,
          variables: {
            id: user.id
          }
        })
      ).data.getUser;
      setUser(updatedUserData);

      updateReservations(updatedUserData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function approvedToConfirmed(reservationID) {
    try {
      await API.graphql({
        query: mutations.updateReservation,
        variables: {
          input: {
            id: reservationID,
            status: "confirmed"
          }
        }
      });

      const updatedUserData = (
        await API.graphql({
          query: customQueries.getUser,
          variables: {
            id: user.id
          }
        })
      ).data.getUser;
      setUser(updatedUserData);

      updateReservations(updatedUserData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function confirmedToFinished(reservationID) {
    try {
      await API.graphql({
        query: mutations.updateReservation,
        variables: {
          input: {
            id: reservationID,
            status: "finished"
          }
        }
      });

      const updatedUserData = (
        await API.graphql({
          query: customQueries.getUser,
          variables: {
            id: user.id
          }
        })
      ).data.getUser;
      setUser(updatedUserData);

      updateReservations(updatedUserData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function updateAttendingUsersForListener(status) {
    try {
      // const allAttendingUser = (
      //   await API.graphql({
      //     query: queries.listAttendingUsers
      //   })
      // ).data.listAttendingUsers.items;
      const allAttendingUser = user.reservations.items;
      const arrayOfSeen = allAttendingUser
        // .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === status)
        .filter((e) => e.seen === false)
        .filter((e) => e.userID !== e.reservation.tellerID);
      await Promise.all(
        arrayOfSeen.map(async (e) => {
          const newAttendingUsers = {
            id: e.id,
            reservationID: e.reservationID,
            seen: true,
            userID: e.userID
          };
          await API.graphql({
            query: mutations.updateAttendingUsers,
            variables: { input: newAttendingUsers }
          });
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async function updateAttendingUsersForTeller(status) {
    try {
      // const allAttendingUser = (
      //   await API.graphql({
      //     query: queries.listAttendingUsers
      //   })
      // ).data.listAttendingUsers.items;
      const arrayOfSeen = user.reservations.items
        // .filter((e) => e.userID === user.id)
        .filter((e) => e.reservation.status === status)
        .filter((e) => e.seen === false)
        .filter((e) => e.userID === e.reservation.tellerID);
      await Promise.all(
        arrayOfSeen.map(async (e) => {
          const newAttendingUsers = {
            id: e.id,
            reservationID: e.reservationID,
            seen: true,
            userID: e.userID
          };
          await API.graphql({
            query: mutations.updateAttendingUsers,
            variables: { input: newAttendingUsers }
          });
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleStatusChange() {
    try {
      // const allReservations = (
      //   await API.graphql({
      //     query: queries.listReservations
      //   })
      // ).data.listReservations.items;
      const allReservations = user.reservations.items.map(e => e.reservation);
      await Promise.all(
        allReservations.map(async (e) => {
          if (e.status !== "finished" && e.startDateTime - new Date().getTime() < 0) {
            confirmedToFinished(e.id);
          }
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <div>
          {console.log("render")}
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              // aria-label="icon label tabs example"
            >
              <Tab
                icon={<HearingIcon />}
                label="Listener"
                onClick={() => {
                  setView("listener");
                }}
              />
              <Tab
                icon={<RecordVoiceOverIcon />}
                label="Teller"
                onClick={() => {
                  setView("teller");
                }}
              />
            </Tabs>
          </Paper>
        </div>
        <br />
        <Accordion
          expanded={expanded1 === "panel1"}
          onChange={handleChangePanel1("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.pending}
          >
            <div>
              <Badge
                color="secondary"
                badgeContent={
                  view === "listener"
                    ? pendingListenerCounts
                    : pendingTellerCounts
                }
              >
                <PauseCircleFilledIcon color="primary" fontSize="large" />
              </Badge>
              Pending
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div className={classes.column}>
                {createReservation("pending")}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded2 === "panel2"}
          onChange={handleChangePanel2("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={classes.approved}
          >
            <div>
              <Badge
                color="secondary"
                badgeContent={
                  view === "listener"
                    ? approveListenerCounts
                    : approveTellerCounts
                }
              >
                <CheckCircleIcon
                  className={classes.checkCircleIcon}
                  fontSize="large"
                />{" "}
              </Badge>
              Approved
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.column}>
              {createReservation("approved")}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded3 === "panel3"}
          onChange={handleChangePanel3("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={classes.confirmed}
          >
            <div>
              <Badge
                color="secondary"
                badgeContent={
                  view === "listener"
                    ? confirmedListenerCounts
                    : confirmedTellerCounts
                }
              >
                <MonetizationOnIcon color="error" fontSize="large" />
              </Badge>
              Payment Confirmed
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.column}>
              {createReservation("confirmed")}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded4 === "panel4"}
          onChange={handleChangePanel4("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={classes.finished}
          >
            <div>
              <Badge
                color="secondary"
                badgeContent={
                  view === "listener"
                    ? finishedListenerCounts
                    : finishedTellerCounts
                }
              >
                <HistoryIcon color="action" fontSize="large" />
              </Badge>
              Finished
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.column}>
              {createReservation("finished")}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ReservationManagement;
