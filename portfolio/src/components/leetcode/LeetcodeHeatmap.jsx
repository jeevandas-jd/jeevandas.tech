import { useState, useEffect, useRef } from 'react';
import { theme } from '../../constants/theme';

export function LeetCodeHeatmap({ username }) {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('rolling');
  const [hoveredCell, setHoveredCell] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    fetchCalendarData();
  }, [username]);

  const fetchCalendarData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setCalendarData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} onRetry={fetchCalendarData} />;
  if (!calendarData) return null;

  const submissionMap = JSON.parse(calendarData.submissionCalendar);
  const maxSubmissions = Math.max(...Object.values(submissionMap).map(Number), 1);

  const currentYear = new Date().getFullYear();
  const availableYears = ['rolling', currentYear , currentYear - 1, currentYear-2].filter(
    y => y === 'rolling' || y >= 2023
  );

  const { heatmapData, totalSubmissions, activeDays } =
    selectedYear === 'rolling'
      ? generateRollingYearData(submissionMap)
      : generateYearData(selectedYear, submissionMap);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleBlock}>
          <h3 style={styles.title}>Activity</h3>
          <div style={styles.stats}>
            <span style={styles.statChip}>
              <span style={styles.statDot('streak')} />
              {calendarData.streak} day streak
            </span>
            <span style={styles.statChip}>
              <span style={styles.statDot('active')} />
              {calendarData.totalActiveDays} total active
            </span>
            {selectedYear !== 'rolling' ? (
              <span style={styles.statChip}>
                <span style={styles.statDot('year')} />
                {totalSubmissions} submissions in {selectedYear}
              </span>
            ) : (
              <span style={styles.statChip}>
                <span style={styles.statDot('year')} />
                {totalSubmissions} in past year
              </span>
            )}
          </div>
        </div>

        <div style={styles.yearSelector}>
          {availableYears.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              style={{
                ...styles.yearButton,
                ...(selectedYear === year ? styles.yearButtonActive : {})
              }}
            >
              {year === 'rolling' ? 'Year' : year}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.heatmapWrapper}>
        <MonthLabels heatmapData={heatmapData} selectedYear={selectedYear} />

        <div style={styles.heatmapBody}>
          <div style={styles.weekdayLabels}>
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div style={styles.gridContainer}>
            {heatmapData.map((week, weekIndex) => (
              <div key={weekIndex} style={styles.weekColumn}>
                {week.map((day, dayIndex) => (
                  <HeatmapCell
                    key={`${weekIndex}-${dayIndex}`}
                    count={day.count}
                    maxCount={maxSubmissions}
                    date={day.date}
                    onHover={setHoveredCell}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.legend}>
          <span style={styles.legendLabel}>Less</span>
          {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map(color => (
            <div key={color} style={{ ...styles.legendCell, backgroundColor: color }} />
          ))}
          <span style={styles.legendLabel}>More</span>
        </div>
      </div>

      {hoveredCell && hoveredCell.count > 0 && (
        <div
          ref={tooltipRef}
          style={{
            ...styles.globalTooltip,
            top: hoveredCell.y,
            left: hoveredCell.x
          }}
        >
          <strong>{formatDate(hoveredCell.date)}</strong>
          <div>{hoveredCell.count} submission{hoveredCell.count !== 1 ? 's' : ''}</div>
        </div>
      )}
    </div>
  );
}

function HeatmapCell({ count, maxCount, date, onHover }) {
  const bgColor = getColorForCount(count, maxCount);
  const isEmpty = !date;

  return (
    <div
      style={{
        ...styles.cell,
        backgroundColor: isEmpty ? 'transparent' : bgColor,
        cursor: count > 0 ? 'pointer' : 'default',
        border: isEmpty ? 'none' : count > 0 ? 'none' : '1px solid #e8e3dc',
        opacity: isEmpty ? 0 : 1
      }}
      onMouseEnter={e => {
        if (count > 0 && date) {
          const rect = e.currentTarget.getBoundingClientRect();
          const containerRect = e.currentTarget.closest('[data-heatmap]')?.getBoundingClientRect();
          onHover({
            count,
            date,
            x: rect.left - (containerRect?.left ?? 0) + rect.width / 2,
            y: rect.top - (containerRect?.top ?? 0) - 48
          });
        }
      }}
      onMouseLeave={() => onHover(null)}
    />
  );
}

function MonthLabels({ heatmapData, selectedYear }) {
  const labels = [];
  let weekIndex = 0;

  heatmapData.forEach((week, wIdx) => {
    const firstValidDay = week.find(d => d.date);
    if (!firstValidDay) return;

    const date = firstValidDay.date;
    const day = date.getDate();

    if (day <= 7) {
      labels.push({
        name: date.toLocaleString('default', { month: 'short' }),
        weekIndex: wIdx
      });
    }
  });

  return (
    <div style={styles.monthRow}>
      {labels.map((label, i) => {
        const nextWeek = labels[i + 1]?.weekIndex ?? heatmapData.length;
        const spanWeeks = nextWeek - label.weekIndex;
        return (
          <div
            key={i}
            style={{
              ...styles.monthLabel,
              width: `${spanWeeks * 15}px`
            }}
          >
            {label.name}
          </div>
        );
      })}
    </div>
  );
}

function getColorForCount(count, maxCount) {
  if (count === 0) return '#ebedf0';
  const intensity = count / maxCount;
  if (intensity < 0.25) return '#9be9a8';
  if (intensity < 0.5) return '#40c463';
  if (intensity < 0.75) return '#30a14e';
  return '#216e39';
}

function generateRollingYearData(submissionMap) {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setDate(oneYearAgo.getDate() + 1);

  // Start from the Sunday on or before oneYearAgo
  const startDate = new Date(oneYearAgo);
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  const weeks = [];
  let currentDate = new Date(startDate);
  let totalSubmissions = 0;
  let activeDays = 0;

  for (let week = 0; week < 53; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDate);
      let count = 0;

      if (date >= oneYearAgo && date <= today) {
        const utcTs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000;
        const localTs = Math.floor(date.getTime() / 1000);

        count = Number(submissionMap[utcTs] ?? submissionMap[localTs] ?? 0);
        if (count > 0) {
          totalSubmissions += count;
          activeDays++;
        }
        weekDays.push({ date: new Date(date), count });
      } else {
        weekDays.push({ date: null, count: 0 });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (weekDays.some(d => d.date !== null)) {
      weeks.push(weekDays);
    }
  }

  return { heatmapData: weeks, totalSubmissions, activeDays };
}

function generateYearData(year, submissionMap) {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const firstDay = new Date(startDate);
  while (firstDay.getDay() !== 0) {
    firstDay.setDate(firstDay.getDate() - 1);
  }

  const weeks = [];
  let currentDate = new Date(firstDay);
  let totalSubmissions = 0;
  let activeDays = 0;

  for (let week = 0; week < 53; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDate);
      let count = 0;

      if (date.getFullYear() === year) {
        const utcTs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000;
        const localTs = Math.floor(date.getTime() / 1000);

        count = Number(submissionMap[utcTs] ?? submissionMap[localTs] ?? 0);
        if (count > 0) {
          totalSubmissions += count;
          activeDays++;
        }
        weekDays.push({ date: new Date(date), count });
      } else {
        weekDays.push({ date: null, count: 0 });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(weekDays);
  }

  return { heatmapData: weeks, totalSubmissions, activeDays };
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function LoadingSkeleton() {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.title, opacity: 0.4, marginBottom: '1rem' }}>Loading activity…</div>
      <div style={{ ...styles.heatmapBody, opacity: 0.15 }}>
        <div style={styles.gridContainer}>
          {[...Array(53)].map((_, i) => (
            <div key={i} style={styles.weekColumn}>
              {[...Array(7)].map((_, j) => (
                <div key={j} style={{ ...styles.cell, backgroundColor: '#ebedf0' }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ error, onRetry }) {
  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#e74c3c' }}>
        <p>⚠️ Unable to load LeetCode activity</p>
        <small>{error}</small>
        <button
          onClick={onRetry}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: theme.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'block',
            margin: '1rem auto 0'
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#ffffff',
    borderRadius: '8px',
    padding: '1.5rem',
    border: '1px solid #e8e3dc',
    fontFamily: "'DM Sans', sans-serif",
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.25rem',
    flexWrap: 'wrap',
    gap: '0.75rem'
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1c1916',
    margin: 0
  },
  stats: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem'
  },
  statChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.7rem',
    color: '#8a8178',
    background: '#faf8f5',
    border: '1px solid #e8e3dc',
    borderRadius: '999px',
    padding: '2px 8px'
  },
  statDot: type => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor:
      type === 'streak' ? '#f97316' : type === 'active' ? '#3b82f6' : '#30a14e',
    flexShrink: 0
  }),
  yearSelector: {
    display: 'flex',
    gap: '0.4rem',
    flexShrink: 0
  },
  yearButton: {
    padding: '0.25rem 0.65rem',
    fontSize: '0.72rem',
    border: '1px solid #e8e3dc',
    background: '#faf8f5',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#5a544e',
    transition: 'all 0.15s',
    fontFamily: "'DM Sans', sans-serif"
  },
  yearButtonActive: {
    background: theme.accent,
    color: '#ffffff',
    borderColor: theme.accent
  },
  heatmapWrapper: {
    overflowX: 'auto',
    paddingBottom: '4px'
  },
  monthRow: {
    display: 'flex',
    marginLeft: '40px',
    marginBottom: '6px',
    fontSize: '0.65rem',
    color: '#8a8178'
  },
  monthLabel: {
    fontSize: '0.65rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  heatmapBody: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  weekdayLabels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: '8px',
    fontSize: '0.62rem',
    color: '#8a8178',
    height: '96px',
    paddingTop: '2px',
    flexShrink: 0
  },
  gridContainer: {
    display: 'flex',
    gap: '3px'
  },
  weekColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  cell: {
    width: '11px',
    height: '11px',
    borderRadius: '2px',
    transition: 'transform 0.1s, opacity 0.1s',
    flexShrink: 0
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.75rem'
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px'
  },
  legendLabel: {
    fontSize: '0.65rem',
    color: '#8a8178',
    margin: '0 2px'
  },
  legendCell: {
    width: '11px',
    height: '11px',
    borderRadius: '2px'
  },
  globalTooltip: {
    position: 'absolute',
    background: '#1c1916',
    color: '#ffffff',
    padding: '5px 9px',
    borderRadius: '5px',
    fontSize: '11px',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 100,
    transform: 'translateX(-50%)',
    lineHeight: 1.5,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  }
};