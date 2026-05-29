import useLeetcode from "./useLeetcode";
import LeetcodeHeatmap from "./LeetcodeHeatmap";

export default function LeetcodeStats() {
  const { calendar, stats } = useLeetcode("jeevandas-787");

  if (!calendar || !stats) {
    return <p>Loading LeetCode activity...</p>;
  }

  return (
    <section
      id="leetcode"
      style={{
        padding: "4rem 0",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          fontSize: 24,
        }}
      >
        LeetCode Activity
      </h2>

      <div
        style={{
          background: "#faf8f5",
          border: "1px solid #e8e3dc",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div>
            <strong>{stats.totalSolved}</strong>
            <div>Solved</div>
          </div>

          <div>
            <strong>{calendar.streak}</strong>
            <div>Day Streak</div>
          </div>

          <div>
            <strong>{calendar.totalActiveDays}</strong>
            <div>Active Days</div>
          </div>
        </div>

        <LeetcodeHeatmap
          submissionCalendar={calendar.submissionCalendar}
        />
      </div>
    </section>
  );
}