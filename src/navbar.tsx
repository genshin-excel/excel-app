import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="#"><b>Home</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar11" />
                    <Navbar.Collapse id="navbar11">
                        <Nav className="mr-auto">
                            <Nav.Link href="#">Features</Nav.Link>
                            <Nav.Link href="#">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default App;