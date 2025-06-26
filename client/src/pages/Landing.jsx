import { Link } from "react-router-dom";
import "../styles/landing.css"
import heroImage from "../assets/socialSharing.svg";
import sectionImage from "../assets/tweetstorm.svg"

function Landing() {
    return (
        <div className="landing">
            {/* Hero */}
            <section className="home" id="home">
                <div className="home-container">
                    <div className="row full-screen">
                        <div className="home-content">
                            {/* Left Block: Text */}
                            <div className="block text-block">
                                <h6>Welcome to</h6>
                                <h1>Neural News</h1>
                                <h3>Auto-generate tweets from trending news and hashtags</h3>
                                <div className="cv_btn">
                                    <a href="#features">Explore Features</a>
                                    <a href="#demo">Live Demo</a>
                                </div>
                            </div>

                            {/* Right Block: Image */}
                            <div className="block image-block">
                                <img src={heroImage} alt="AutoTweet Hero" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section" id="features">
                <div className="underlay_features">
                    <h1>
                        <div><span>FEATURES</span></div>
                    </h1>
                </div>

                <div className="home-container">
                    <div className="row">
                        <div className="section-title text-center">
                            <h1>What It Does</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="features-contents">
                            <div className="feature-box">
                                <div className="information">
                                    <span>NewsAPI</span>
                                </div>
                                <h3>Real-Time News</h3>
                                <p>
                                    Fetch the latest breaking news using NewsAPI. Stay up to date with global headlines across categories.
                                </p>
                            </div>

                            <div className="feature-box">
                                <div className="information">
                                    <span>Twitter</span>
                                </div>
                                <h3>Trending Hashtags</h3>
                                <p>
                                    Analyze and match real-time Twitter trending hashtags with the latest news stories for relevance.
                                </p>
                            </div>

                            <div className="feature-box">
                                <div className="information">
                                    <span>AI Automation</span>
                                </div>
                                <h3>AI Tweet Generator</h3>
                                <p>
                                    Automatically generate engaging tweets using AI with hashtags and summaries, ready to post or schedule.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Message */}
            <section class="message-text">
                <div class="home-container">
                    <div class="row">
                        <div class="text">
                            <h2>What are you waiting for? Try it out here...</h2>
                        </div>
                        <div class="cv_btn">
                            <Link to="/login">
                                Neural Tweets
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="about-me" id="how-it-works">
                <div class="underlay_about">
                    <h1>
                        <div><span>HOW IT</span></div>
                        <div><span>WORKS</span></div>
                    </h1>
                </div>
                <div className="home-container">
                    <div class="row">
                        <div class="section-title">
                            <h1>Under the Hood</h1>
                            <p class="small text-uppercase">How it works?</p>
                        </div>
                    </div>
                    <div class="row">
                        <div className="about-content">
                            <div class="row">
                                <div class="img">
                                    <img style={{ "padding-top": "2%" }} src={sectionImage} />
                                </div>
                                <div class="text" style={{ "padding-top": "3%" }}>
                                    <p>
                                    <strong>1. Fetch News:</strong> Your backend grabs breaking news and trending hashtags.<br /><br />
                                    <strong>2. Generate Tweets:</strong> AI generates concise, relevant tweets.<br /><br />
                                    <strong>3. Preview & Post:</strong> See the tweet and post it instantly.<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preview */}
            <section className="preview">
                <h2>Live Tweet Preview</h2>
                <div className="tweet-box">
                    🚨 Breaking: NASA just confirmed water on the moon 🌕💧<br />
                    #NASA #SpaceNews #MoonDiscovery
                </div>
            </section>
        </div>
    );
}

export default Landing;
