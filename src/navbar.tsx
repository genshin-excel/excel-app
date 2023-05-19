import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#/"><b>Excel-App</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar11" />
                    <Navbar.Collapse id="navbar11">
                        <Nav className="mr-auto">
                            <Nav.Link href="#/rotationPage">Rotation</Nav.Link>
                            <Nav.Link href="#/testPage">Test</Nav.Link>
                            <Nav.Link href="#">Features</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                            <Nav.Link href="#" onClick={() => { localStorage.clear(); window.location.reload(); }}>Reset LocalStorage</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default App;