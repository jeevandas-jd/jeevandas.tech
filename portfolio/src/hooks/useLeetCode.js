import { useState, useEffect } from 'react';

export function useLeetCode(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    
    const fetchLeetCodeData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch calendar data
        const calendarRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`);
        if (!calendarRes.ok) throw new Error('Failed to fetch calendar data');
        const calendarData = await calendarRes.json();
        
        // Fetch user profile data
        const profileRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile data');
        const profileData = await profileRes.json();
        
        setData({
          calendar: calendarData,
          profile: profileData
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching LeetCode data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeetCodeData();
  }, [username]);
  
  return { data, loading, error };
}