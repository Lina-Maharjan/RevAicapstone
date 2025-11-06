import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { apiFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";


const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl shadow bg-white p-4 ${className}`}>{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem("access_token");
        if (!token) {
          setLoggedIn(false); // user is not logged in
          setLoading(false);
          return;
        }

        // Fetch dashboard stats and analysis history in parallel
        const [statsResponse, historyResponse] = await Promise.all([
          apiFetch("/user/dashboard-stats"),
          apiFetch("/user/analysis-history?limit=4&skip=0")
        ]);

        setStats(statsResponse.data);
        setHistory(historyResponse.data.history);
        console.log("Dashboard stats received:", statsResponse.data);
        console.log("Sentiment distribution:", statsResponse.data?.sentiment_distribution);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        // Normalize error shapes (string or object with message)
        const message = typeof err?.detail === 'object' ? (err.detail.message || 'Failed to load dashboard') : (err?.detail || err?.message || 'Failed to load dashboard');
        setError(message);
        setLoading(false);

        // If token invalid, treat as not logged in (check lowercase string)
        const detailStr = typeof err?.detail === 'string' ? err.detail.toLowerCase() : (err?.detail?.message?.toLowerCase() || '');
        if (detailStr.includes('credentials') || detailStr.includes('token') || detailStr.includes('validate')) {
          localStorage.removeItem('access_token');
          setLoggedIn(false);
        }
      }
    };

    fetchDashboardData();
  }, []);

  // Derive total reviews analyzed from sentiment bucket counts (frontend-only approximation)
  const totalReviewsAnalyzed = (stats?.sentiment_distribution?.positive || 0) +
                               (stats?.sentiment_distribution?.neutral || 0) +
                               (stats?.sentiment_distribution?.negative || 0);

  // Authenticity chart uses counts (avoid mixing percentages and raw counts)
  const authenticityData = stats ? [
    { name: "Genuine Reviews", value: Math.max(totalReviewsAnalyzed - (stats.fake_reviews_detected || 0), 0) },
    { name: "Fake Reviews", value: stats.fake_reviews_detected || 0 },
  ] : [];

  const sentimentData = stats?.sentiment_distribution ? [
    { name: "Positive", value: stats.sentiment_distribution.positive || 0 },
    { name: "Neutral", value: stats.sentiment_distribution.neutral || 0 },
    { name: "Negative", value: stats.sentiment_distribution.negative || 0 },
  ] : [];

  // Calculate percentages for display
  const totalSentiment = (stats?.sentiment_distribution?.positive || 0) +
                         (stats?.sentiment_distribution?.neutral || 0) +
                         (stats?.sentiment_distribution?.negative || 0);
  
  const positivePercent = totalSentiment > 0 
    ? Math.round(((stats?.sentiment_distribution?.positive || 0) / totalSentiment) * 100) 
    : 0;

  // Fake reviews percent should be out of total reviews, not total analyses (frontend-only approximation)
  const fakePercent = totalReviewsAnalyzed > 0 
    ? Math.round(((stats?.fake_reviews_detected || 0) / totalReviewsAnalyzed) * 100)
    : 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center" style={{ background: "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14B8A6] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!loggedIn) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center" style={{ background: "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)" }}>
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            You won't be able to access the dashboard
          </h3>
          <p className="text-gray-600 mb-6">
            Please log in to view your dashboard and analysis data.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#14B8A6] hover:bg-[#0D9488] text-white py-2 px-4 rounded-md transition"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  // Error state (logged in but API error)
  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center" style={{ background: "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)" }}>
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  // Dashboard UI
  return (
    <div
      className="min-h-screen p-6 pt-20 flex flex-col"
      style={{ background: "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)" }}
    >
      <h1 className="text-3xl font-bold mb-2">Welcome !!</h1>
      <p className="text-gray-600 mb-6">Here's your review analysis overview.</p>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Total Reviews Analyzed</p>
            <h2 className="text-3xl font-bold">{totalReviewsAnalyzed || 0}</h2>
            <p className="text-xs text-gray-400">{stats?.total_analyses || 0} analysis sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Fake Detected</p>
            <h2 className="text-3xl font-bold">{stats?.fake_reviews_detected || 0}</h2>
            <p className="text-xs text-gray-400">{fakePercent}% of total reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Avg Sentiment</p>
            <h2 className="text-3xl font-bold">{positivePercent}%</h2>
            <p className="text-xs text-gray-400">{positivePercent >= 50 ? "Mostly Positive" : "Mixed"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500">Last Analysis</p>
            <h2 className="text-xl font-bold">
              {stats?.last_analysis_date ? new Date(stats.last_analysis_date).toLocaleDateString() : "N/A"}
            </h2>
            <p className="text-xs text-gray-400">Most recent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {history.length === 0 ? (
            <Card>
              <CardContent>
                <p className="text-gray-500 text-center py-8">No analysis history yet. Start analyzing reviews to see your activity here!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {history.map((item, i) => {
                const fakePercentage = item.total_reviews > 0 ? Math.round((item.fake_count / item.total_reviews) * 100) : 0;
                const genuinePercentage = 100 - fakePercentage;
                const sentiment = item.sentiment_distribution 
                  ? (item.sentiment_distribution.positive > item.sentiment_distribution.negative
                      ? "Positive"
                      : item.sentiment_distribution.negative > item.sentiment_distribution.positive
                        ? "Negative"
                        : "Neutral")
                  : "N/A";
                const timeAgo = item.timestamp ? new Date(item.timestamp).toLocaleString() : "Unknown time";

                // Determine a meaningful title: prefer product_url, else first review text
                const firstReview = item?.detailed_results?.[0]?.review_text || item?.manual_input || "";
                const truncate = (str, n = 120) => (str && str.length > n ? str.slice(0, n) + "…" : str);
                const prettyUrl = (url) => {
                  try {
                    const u = new URL(url);
                    const base = `${u.hostname}${u.pathname}`;
                    return truncate(base, 60);
                  } catch {
                    return truncate(url, 60);
                  }
                };
                const title = item.product_url
                  ? `URL: ${prettyUrl(item.product_url)}`
                  : (firstReview ? `Review: ${truncate(firstReview, 120)}` : `Analysis of ${item.total_reviews} reviews`);

                return (
                  <Card key={item._id || i}>
                    <CardContent>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-gray-500 mb-2">{timeAgo}</p>
                      <p className="text-xs text-gray-600 mb-2">
                        {item.total_reviews} reviews analyzed • {item.fake_count} fake detected
                      </p>

                      <div className="flex justify-between text-xs mb-1">
                        <span>Authenticity</span>
                        <span>{genuinePercentage}% genuine</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: `${genuinePercentage}%` }}></div>
                      </div>

                      <p className="text-xs font-semibold">Overall Sentiment: {sentiment}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Review Authenticity Distribution</h2>
            {stats && stats.total_analyses > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie 
                      data={authenticityData} 
                      dataKey="value" 
                      nameKey="name" 
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center text-sm text-gray-600 mt-2">
                  <p><span className="font-semibold text-green-600">{authenticityData[0]?.value || 0}</span> Genuine • <span className="font-semibold text-red-600">{authenticityData[1]?.value || 0}</span> Fake</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-16">No data available yet</p>
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Sentiment Analysis Distribution</h2>
            {stats && totalSentiment > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie 
                      data={sentimentData} 
                      dataKey="value" 
                      nameKey="name" 
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                      labelLine={false}
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#3B82F6" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center text-sm text-gray-600 mt-2">
                  <p>
                    <span className="font-semibold text-green-600">{sentimentData[0]?.value || 0}</span> Positive • 
                    <span className="font-semibold text-blue-600"> {sentimentData[1]?.value || 0}</span> Neutral • 
                    <span className="font-semibold text-red-600"> {sentimentData[2]?.value || 0}</span> Negative
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-16">No sentiment data available yet</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
