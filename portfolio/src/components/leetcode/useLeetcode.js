import { useState, useEffect } from "react";

export default function useLeetcode(username) {
  const [calendar, setCalendar] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [calendarRes, statsRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`)
        ]);

        const calendarData = await calendarRes.json();
        const statsData = await statsRes.json();

        setCalendar(calendarData);
        setStats(statsData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [username]);

  return { calendar, stats };
}