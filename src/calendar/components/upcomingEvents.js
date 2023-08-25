import React, { useState, useContext } from "react";
import ModalElement from "../../shared/components/UIElements/ModalElement";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../shared/context/auth-context";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
const UpcomingEvents = ({ events, onDeleteEvent }) => {
  const [deleteEventId, setDeleteEventId] = useState(null);
  const { sendRequest, error, setError, isLoading } = useHttpClient();

  const auth = useContext(AuthContext);
  const handleDeleteEvent = async (eventId) => {
    setDeleteEventId(null);
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`, "DELETE", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      onDeleteEvent(eventId);
    } catch (err) {}
  };

  return (
    <div className="upcoming-events upcoming-events-border">
      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorAlert
          open={error}
          setOpen={() => {
            setError(false);
          }}
        />
      )}
      <h3>Upcoming Events</h3>
      <ul>
        {events && events.length > 0 ? (
          events.map((event) => {
            const dateObj = new Date(event.date);
            const options = {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZone: "UTC",
            };
            const formattedDate = dateObj.toLocaleDateString("en-UK", options);

            return (
              <li key={uuidv4()}>
                <div className="event-date">{formattedDate}</div>
                <div className="event-title">{event.title}</div>
                <Button
                  style={{ marginLeft: "auto" }}
                  color="error"
                  onClick={() => setDeleteEventId(event.id)}
                >
                  Delete
                </Button>
              </li>
            );
          })
        ) : (
          <li>No Upcoming Events!</li>
        )}
      </ul>

      <ModalElement
        type="warning"
        open={deleteEventId !== null}
        setOpen={() => setDeleteEventId(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this event?"
      >
        <Button
          style={{ marginTop: "1rem" }}
          variant="contained"
          color="error"
          onClick={() => handleDeleteEvent(deleteEventId)}
        >
          Delete
        </Button>
        <Button
          style={{ marginLeft: "1rem", marginTop: "1rem" }}
          variant="contained"
          onClick={() => setDeleteEventId(false)}
        >
          Cancel
        </Button>
      </ModalElement>
    </div>
  );
};

export default UpcomingEvents;
