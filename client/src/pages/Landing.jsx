import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="container">
            <h1>AI Twitter Assistant</h1>
            <p>Generate tweets powered by news and trends with AI</p>
            <Link to="/register"><button>Register</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
}

export default Landing;
