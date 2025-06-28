import React, { useEffect, useState } from "react";
import { FaRegCopy, FaShareAlt, FaEdit } from "react-icons/fa";
import "../styles/tweetcard.css";
import Toast from "./Toast";

function TweetCard({ tweet }) {

    const [mainText, setMainText] = useState(tweet.tweet);
    const [source, setSource] = useState(tweet.src || "");
    const [copied, setCopied] = useState(false);

    const extractSourceFromTweet = (tweet) => {
        if (tweet.src) return tweet.src;
        const readMoreMatch = tweet.tweet.match(/Read more:\s*(https?:\/\/[^\s]+)/i);
        if (readMoreMatch) return readMoreMatch[1];
        const genericUrlMatch = tweet.tweet.match(/(https?:\/\/[^\s]+)/g);
        if (genericUrlMatch) return genericUrlMatch[0];

        return null;
    }

    const cleanTweetText = (text, srcUrl) => {
        if (!srcUrl) return text;
        return text.replace(srcUrl, "").trim();
    }



    useEffect(() => {
        const src = extractSourceFromTweet(tweet);
        if (src) {
            const displayText = cleanTweetText(tweet.tweet, src);
            setMainText(displayText);
            setSource(src);
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
