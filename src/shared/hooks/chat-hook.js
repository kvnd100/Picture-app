import { useState, useCallback } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

export const useChat = (initialMessages = [], userId) => {
  const { sendRequest } = useHttpClient();

  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const sendMessage = useCallback(
    async (text) => {
      setLoading(true);
      setMessages((prevMessages) => [...prevMessages, { role: "user", content: text }]);

      if (text.toLowerCase().includes("event") || text.toLowerCase().includes("events")) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/events/${userId}`
          );

          const events = await responseData.events;

          const specificEvents = events.filter((val) => {
            if (text.toLowerCase().includes(val.title.toLowerCase())) {
              return val;
            } else {
              return false;
            }
          });

          if (specificEvents && specificEvents.length > 0) {
            const eventList = specificEvents
              .map((event) => `- ${event.title} on ${event.date}\n`)
              .join("");
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                role: "assistant",
                content: { content: `Here are your specific upcoming events:\n${eventList}` },
              },
            ]);
          } else if (events && events.length > 0) {
            const eventList = events.map((event) => `- ${event.title} on ${event.date}\n`).join("");
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                role: "assistant",
                content: { content: `Here are your upcoming events:\n${eventList}` },
              },
            ]);
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: "assistant", content: { content: "You don't have any upcoming events." } },
            ]);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/completions`, {
            method: "POST",
            body: JSON.stringify({
              message: text,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const responseData = await response.json();
          const assistantResponse = responseData.choices[0].message;

          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: assistantResponse },
          ]);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    },
    [sendRequest, userId]
  );

  return { messages, sendMessage, loading };
};
