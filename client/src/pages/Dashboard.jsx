import { useState } from "react";
import { getBreakingTweets, getTrendingTweets } from "../services/api";
import TweetCard from "../components/TweetCard";
import "../styles/dashboard.css";

function Dashboard() {
    const [location, setLocation] = useState("US");
    const [tone, setTone] = useState("sarcastic");
    const [stance, setStance] = useState("supportive");
    const [category, setCategory] = useState("technology");
    const [tweets, setTweets] = useState([]);

    const handleBreaking = async () => {
        const { data } = await getBreakingTweets({ location, tone, stance, category });
        setTweets(data.tweets);
    };

    const handleTrending = async () => {
        const { data } = await getTrendingTweets({ location, tone, stance });
        setTweets(data.tweets);
    };

    return (
        <div className="dashboard-container" style={{ "height": "100%" }}>
            {/* Info Section */}
            <section className="info-section">
                <h2>Generate AI-Powered Tweets</h2>
                <p>
                    Choose your preferences like tone, stance, and category to generate high-quality tweets from
                    breaking news or Twitter trends. <br />
                    Tweets will reflect your tone (e.g. sarcastic/serious) and stance (supportive/against) to match your brand voice.
                </p>
            </section>

            {/* Form Section */}
            <section className="form-section">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Location</label>
                        <select onChange={(e) => setLocation(e.target.value)} value={location}>
                            <option value="US">US</option>
                            <option value="IN">India</option>
                            <option value="GB">UK</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tone</label>
                        <select onChange={(e) => setTone(e.target.value)} value={tone}>
                            <option value="sarcastic">Sarcastic</option>
                            <option value="serious">Serious</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Stance</label>
                        <select onChange={(e) => setStance(e.target.value)} value={stance}>
                            <option value="supportive">Supportive</option>
                            <option value="against">Against</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option value="technology">Technology</option>
                            <option value="sports">Sports</option>
                            <option value="politics">Politics</option>
                        </select>
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={handleBreaking}>🔍 From Breaking News</button>
                    <button onClick={handleTrending}>🔥 From Twitter Trends</button>
                </div>
            </section>

            {/* Tweet Cards */}
            <section className="tweets-section">
                {tweets?.map((tweet, i) => (
                    <TweetCard key={tweet.id || i} tweet={tweet} />
                ))}
            </section>
        </div>
    );
}

export default Dashboard;
