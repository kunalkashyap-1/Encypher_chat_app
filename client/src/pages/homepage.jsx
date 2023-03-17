import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function HomePage(){
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
}

export default HomePage;