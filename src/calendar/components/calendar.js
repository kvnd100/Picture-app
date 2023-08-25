import "./calendar.css";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuidv4 } from "uuid";
import UpcomingEvents from "./upcomingEvents";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { LoadingSpinner } from "../../shared/components/UIElements/LoadingSpinner";
import ErrorAlert from "../../shared/components/UIElements/ErrorAlert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useChat } from "../../shared/hooks/chat-hook";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import StopIcon from "@mui/icons-material/Stop";

const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
const theme = createTheme({
  palette: {
    primary: {
      main: "#F7AA33",
    },
  },
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Calendar = () => {
  const today = new Date();
  const userId = useParams().userId;
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const { error, isLoading, sendRequest, setError } = useHttpClient();
  const [events, setEvents] = useState(null);
  const [value, setValue] = useState(null);
  const { messages, sendMessage, loading } = useChat([], userId);
  const [isSpeaking, setIsSpeaking] = useState(false);
  console.log(messages);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/${userId}`
        );
        setEvents(responseData.events);
      } catch (err) {}
    };

    fetchEvents();
  }, [sendRequest, setEvents, userId]);

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];

    // Add previous month days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
      days.push(
        <div key={`prev-${i}`} className={`day prev-month-day`}>
          {prevMonthLastDay - i + 1}
        </div>
      );
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={uuidv4()}
          className={`day ${
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear() &&
            day === today.getDate()
              ? "current-day"
              : ""
          } ${selectedDay === day ? "selected-day" : ""}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}
          {selectedDay === day && (
            <Link
              to={`/events/new?date=${encodeURIComponent(
                `${months[currentMonth]} ${selectedDay}, ${currentYear}`
              )}`}
            >
              <Button className="select-button" variant="contained">
                Add Event
              </Button>
            </Link>
          )}
        </div>
      );
    }

    // Add next month days
    const nextMonthFirstDay = new Date(currentYear, currentMonth + 1, 1).getDay();
    for (let i = 1; i < 7 - nextMonthFirstDay; i++) {
      days.push(
        <div key={uuidv4()} className={`day next-month-day`}>
          {i}
        </div>
      );
    }

    return days;
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDeleteEvent = (deletedEventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== deletedEventId));
  };

  const handleMessageSend = async () => {
    if (value) {
      await sendMessage(value);
      setValue("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="calendar-container">
        {(isLoading || loading) && <LoadingSpinner />}
        {error && (
          <ErrorAlert
            open={error}
            setOpen={() => {
              setError(false);
            }}
          />
        )}
        <div className="upcoming-events">
          <UpcomingEvents events={events} onDeleteEvent={handleDeleteEvent} />
          <div className="chat" style={{ marginTop: "1em", marginLeft: "1rem" }}>
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Send a message"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <IconButton
                onClick={handleMessageSend}
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon
                  sx={{
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (isSpeaking) {
                    window.speechSynthesis.cancel();
                  } else if (messages.length > 0) {
                    const utterance = new SpeechSynthesisUtterance(
                      messages[messages.length - 1].content.content
                    );
                    console.log(utterance);
                    window.speechSynthesis.speak(utterance);
                  }
                  setIsSpeaking((prevIsSpeaking) => !prevIsSpeaking);
                }}
                type="button"
                sx={{ p: "10px" }}
                aria-label={isSpeaking ? "Stop" : "Speak"}
              >
                {isSpeaking ? <StopIcon /> : <SpeakerNotesIcon />}
              </IconButton>
            </Paper>
          </div>
        </div>
        <div className="calendar-content">
          <Box className="paper-container">
            <Paper elevation={3} className="calendar">
              <div className="month">
                <span className="prev" onClick={goToPrevMonth}>
                  &#10094;
                </span>
                <h2>
                  {months[currentMonth]} {currentYear}
                </h2>
                <span className="next" onClick={goToNextMonth}>
                  &#10095;
                </span>
              </div>
              <div className="weekdays">
                <div style={{ paddingLeft: "45%" }}>Sun</div>
                <div style={{ paddingLeft: "45%" }}>Mon</div>
                <div style={{ paddingLeft: "45%" }}>Tue</div>
                <div style={{ paddingLeft: "45%" }}>Wed</div>
                <div style={{ paddingLeft: "45%" }}>Thu</div>
                <div style={{ paddingLeft: "45%" }}>Fri</div>
                <div style={{ paddingLeft: "45%" }}>Sat</div>
              </div>
              <div className="days-grid">{renderCalendar()}</div>
            </Paper>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Calendar;
