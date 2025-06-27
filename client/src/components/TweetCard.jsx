import React, { useEffect, useState } from "react";
import { FaRegCopy, FaShareAlt, FaEdit } from "react-icons/fa";
import "../styles/tweetcard.css";
import Toast from "./Toast";

function TweetCard({ tweet }) {

    const [mainText, setMainText] = useState(tweet.tweet);
    const [source, setSource] = useState(tweet.src || "");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const match = tweet.tweet.match(/(Read more|Read here):?\s*(https?:\/\/[^\s]+)/i);
        if (match) {
            const linkText = match[2];
            const cleaned = tweet.tweet.replace(match[0], "").trim();
            setMainText(cleaned);
            setSource(linkText);
        }
    }, [tweet]);

    const handleCopy = () => {
        navigator.clipboard.writeText(tweet.tweet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    text: tweet.tweet,
                    url: source,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    const handleEdit = () => {
        alert("Edit functionality coming soon!");
    };

    return (
        <div className="tweet-card">
            <div className="tweet-header">
                <div className="tweet-author">
                    <strong>Neural Tweets</strong>{" "}
                    <span className="handle">@neuralAI</span>
                </div>
                <div className="tweet-actions">
                    <button onClick={handleCopy} title="Copy">
                        <FaRegCopy />
                    </button>
                    <button onClick={handleEdit} title="Edit">
                        <FaEdit />
                    </button>
                    <button onClick={handleShare} title="Share">
                        <FaShareAlt />
                    </button>
                </div>
            </div>

            <p className="tweet-text">{mainText}</p>

            {tweet.hashtags && (
                <p className="tweet-hashtags">{tweet.hashtags}</p>
            )}

            {source && (
                <p className="tweet-src">
                    Source:{" "}
                    <a href={source} target="_blank" rel="noopener noreferrer">
                        {source}
                    </a>
                </p>
            )}

            {copied && <Toast message={"Copied!"} type={"success"} onClose={() => setCopied(false)} />}
        </div>
    );
}

export default TweetCard;
