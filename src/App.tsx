import "./App.css";
import Navbar from './navbar';
import Footer from './footer';
import TeamPage from './teamPage';
import HomeBody from './homeBody';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

    return (
        <Router>
            <div className="App" style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <div>
                    <Navbar />
                </div>
                <div className="py-5 content-wrapper" style={{ backgroundImage: 'linear-gradient(to left bottom, rgba(189, 195, 199, .75), rgba(44, 62, 80, .75))', backgroundSize: '100%', width: "100%" }}>
                    <Routes>
                        <Route path="/excel-app" element={<HomeBody />} />
                        <Route path="/teamPage" element={<TeamPage />} />
                    </Routes>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;