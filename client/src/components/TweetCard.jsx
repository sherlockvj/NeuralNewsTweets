function TweetCard({ tweet }) {
    return (
        <div className="card">
            <h4>#{tweet.hashtag}</h4>
            <p>{tweet.tweet}</p>
            {tweet.image && (
                <img src={tweet.image} alt="Tweet" style={{ maxWidth: "100%" }} />
            )}
        </div>
    );
}

export default TweetCard;
