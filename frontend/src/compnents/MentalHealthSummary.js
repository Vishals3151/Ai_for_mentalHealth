import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MentalHealthSummary = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState("");
  const username = localStorage.getItem("tokenUser");

  useEffect(() => {
    if (!username) return;

    const fetchMoods = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/moods/${username}`);
        const moods = res.data;

        // Group moods by date
        const grouped = {};
        moods.forEach((entry) => {
          const day = entry.date.split("T")[0]; // format: YYYY-MM-DD
          if (!grouped[day]) {
            grouped[day] = { day, "😄": 0, "😊": 0, "😐": 0, "😔": 0, "😢": 0 };
          }
          grouped[day][entry.mood] += 1;
        });

        // Convert to array sorted by date
        const chartData = Object.values(grouped).sort(
          (a, b) => new Date(a.day) - new Date(b.day)
        );

        setData(chartData);

        // --- Generate summary for last 5 days ---
        if (chartData.length > 0) {
          const last5 = chartData.slice(-5);

          // Count totals for each mood
          const totals = { "😄": 0, "😊": 0, "😐": 0, "😔": 0, "😢": 0 };
          last5.forEach((d) => {
            Object.keys(totals).forEach((mood) => {
              totals[mood] += d[mood];
            });
          });

          // Find most frequent mood
          const topMood = Object.keys(totals).reduce((a, b) =>
            totals[a] > totals[b] ? a : b
          );

          // Simple suggestion based on trend
          let suggestion = "";
          if (topMood === "😄" || topMood === "😊") {
            suggestion = "Keep up the positive vibes! Continue doing activities that bring you joy. 🌟";
          } else if (topMood === "😐") {
            suggestion = "Your mood seems neutral. Try adding small positive routines like a walk or listening to music. 🎶";
          } else {
            suggestion = "It looks like you’ve been feeling low. Consider reaching out to a close friend, journaling, or speaking with a therapist. 💙";
          }

          setSummary(
            `In the last 5 days, your most frequent mood was ${topMood}. ${suggestion}`
          );
        }
      } catch (err) {
        console.error("Error fetching moods:", err);
      }
    };

    fetchMoods();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-white shadow-xl rounded-2xl max-w-5xl mx-auto " style={{marginTop:'100px'}}>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">🧠 Mood Summary</h2>
        {data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="😄" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="😊" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="😐" stroke="#fbbf24" strokeWidth={2} />
                <Line type="monotone" dataKey="😔" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="😢" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            {/* Explanation of lines */}
            <div className="mt-4 text-sm text-gray-600">
              <p><span className="text-green-600 font-semibold">Green</span> = Very Happy (😄)</p>
              <p><span className="text-blue-600 font-semibold">Blue</span> = Happy (😊)</p>
              <p><span className="text-yellow-500 font-semibold">Yellow</span> = Neutral (😐)</p>
              <p><span className="text-orange-500 font-semibold">Orange</span> = Sad (😔)</p>
              <p><span className="text-red-500 font-semibold">Red</span> = Very Sad (😢)</p>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-100 rounded-xl text-gray-800">
              <h3 className="text-lg font-semibold mb-2">📝 Insights</h3>
              <p>{summary}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No mood data available</p>
        )}
      </div>
    </>
  );
};

export default MentalHealthSummary;
