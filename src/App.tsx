import "./App.css";
import Navbar from './navbar';
import Footer from './footer';
import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, InputGroup, FormControl, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCalculator, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [rows, setRows] = useState(0);
    const addRow = () => {
        setRows(1 + rows);
    };
    const [selectedImage, setSelectedImage] = useState<null | string>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const onHide = () => {
        setSelectedImage(null);
    };

    // Add a ref to the last row
    const lastRowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Focus on the last row when it is created
        if (lastRowRef.current) {
            lastRowRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [rows]);

    return (
        <div className="App" style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <div>
                <Navbar />
            </div>
            <div className="py-5 content-wrapper" style={{ backgroundImage: 'linear-gradient(to left bottom, rgba(189, 195, 199, .75), rgba(44, 62, 80, .75))', backgroundSize: '100%', width: "100%" }}>
                <Container fluid>
                    {Array.from({ length: rows }, (_, i) => (
                        <Row key={i} className="my-4" ref={i === rows - 1 ? lastRowRef : null}>
                            <Col>
                                <div className="d-flex align-items-center justify-content-center flex-wrap">
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <div><h2>Team {i + 1}</h2></div>
                                            <span className="team-icons align-self-end" style={{ marginLeft: "20px", display: "flex" }}>
                                                <Button variant="link" style={{ width: "40px", marginRight: "10px", marginBottom: "5px", border: "1px solid" }}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                                <Button variant="link" style={{ width: "40px", marginRight: "10px", marginBottom: "5px", border: "1px solid" }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="images-container d-flex flex-wrap align-items-center justify-content-center">
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 1" className="image mb-3" onClick={() => setSelectedImage(i.toString())} />
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 2" className="image mb-3" onClick={() => setSelectedImage(i.toString())} />
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 3" className="image mb-3" onClick={() => setSelectedImage(i.toString())} />
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 4" className="image mb-3" onClick={() => setSelectedImage(i.toString())} />
                                    </div>
                                    <div className="inputs-container d-flex flex-wrap align-items-center justify-content-center">
                                        <div>
                                            <div className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Text>DPR:</InputGroup.Text>
                                                    <Form.Control placeholder="DPR" disabled />
                                                </InputGroup>
                                            </div>
                                            <div className="mb-3">
                                                <InputGroup>
                                                    <InputGroup.Text>DPS:</InputGroup.Text>
                                                    <Form.Control placeholder="DPS" disabled />
                                                </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="calculator-container d-flex align-items-center justify-content-center">
                                        <Button variant="link" style={{ width: "40px", height: "50px", padding: "10px", marginRight: "10px", marginBottom: "40px", border: "1px solid" }}>
                                            <FontAwesomeIcon icon={faCalculator} style={{ fontSize: "20px" }} />
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Modal
                                show={selectedImage !== null}
                                onHide={() => setSelectedImage(null)}
                                size="lg"
                                className="d-flex align-items-center justify-content-center flex-wrap my-4"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Choose character</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Search..."
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                            value={searchQuery}
                                            onChange={handleSearchInputChange}
                                        />
                                        <Button variant="outline-secondary" id="button-addon2">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                    </InputGroup>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            className="d-flex align-items-center"
                                            style={{ display: "flex", flexWrap: "wrap" }}
                                        >
                                            <img
                                                src="https://th.bing.com/th/id/OIP.Iv61AUPVuzTMYpBJaumm6wHaJT?pid=ImgDet&rs=1"
                                                alt="Character 1"
                                                style={{
                                                    display: "inline-block",
                                                    marginRight: "20px",
                                                    cursor: "pointer",
                                                    width: "150px",
                                                    height: "150px",
                                                    marginBottom: "20px",
                                                }}
                                                onClick={() => {
                                                    setSelectedImage("https://via.placeholder.com/150x150");
                                                    onHide();
                                                }}
                                            />
                                            <img
                                                src="https://via.placeholder.com/150x150"
                                                alt="Character 2"
                                                style={{
                                                    display: "inline-block",
                                                    marginRight: "20px",
                                                    cursor: "pointer",
                                                    width: "150px",
                                                    height: "150px",
                                                    marginBottom: "20px",
                                                }}
                                                onClick={() => {
                                                    setSelectedImage("https://via.placeholder.com/150x150");
                                                    onHide();
                                                }}
                                            />
                                            <img
                                                src="https://via.placeholder.com/150x150"
                                                alt="Character 3"
                                                style={{
                                                    display: "inline-block",
                                                    marginRight: "20px",
                                                    cursor: "pointer",
                                                    width: "150px",
                                                    height: "150px",
                                                    marginBottom: "20px",
                                                }}
                                                onClick={() => {
                                                    setSelectedImage("https://via.placeholder.com/150x150");
                                                    onHide();
                                                }}
                                            />
                                            <img
                                                src="https://via.placeholder.com/150x150"
                                                alt="Character 4"
                                                style={{
                                                    display: "inline-block",
                                                    cursor: "pointer",
                                                    width: "150px",
                                                    height: "150px",
                                                    marginBottom: "20px",
                                                }}
                                                onClick={() => {
                                                    setSelectedImage("https://via.placeholder.com/150x150");
                                                    onHide();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </Row>
                    ))}
                    <Row className="justify-content-center mt-5">
                        <Button style={{ width: "200px" }} onClick={addRow}>Create Team</Button>
                    </Row>
                </Container>
                <div style={{ marginTop: "5%" }}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;