import { useState } from "react";
import { getBreakingTweets, getTrendingTweets } from "../services/api";
import TweetCard from "../components/TweetCard";

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
        <div className="container">
            <h2>Dashboard</h2>
            <select onChange={(e) => setLocation(e.target.value)} value={location}>
                <option value="US">US</option>
                <option value="IN">India</option>
                <option value="GB">UK</option>
            </select>
            <select onChange={(e) => setTone(e.target.value)} value={tone}>
                <option value="sarcastic">Sarcastic</option>
                <option value="serious">Serious</option>
            </select>
            <select onChange={(e) => setStance(e.target.value)} value={stance}>
                <option value="supportive">Supportive</option>
                <option value="against">Against</option>
            </select>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
            </select>
            <div>
                <button onClick={handleBreaking}>Generate from Breaking News</button>
                <button onClick={handleTrending}>Generate from Twitter Trends</button>
            </div>
            <div>
                {tweets?.map((tweet, i) => (
                    <TweetCard key={i} tweet={tweet} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
