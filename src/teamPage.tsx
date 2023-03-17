import "./App.css";
import React, { ChangeEvent, useState } from "react";
import { Container, Row, Col, Button, InputGroup, FormControl, Form, Modal, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FaPlus } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

function TeamPage() {

    const [rows, setRows] = useState(1);
    const addRow = () => {
        setRows(rows + 1);
    };
    const [selectedImage, setSelectedImage] = useState<null | string>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const onHide = () => {
        setSelectedImage(null);
    };

    return (
        <div className="App" style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <div>
                <Container>
                    <div className="d-flex flex-wrap">
                        <div>
                            <h1>Team 1</h1>
                        </div>
                        <div>
                            <span className="team-icons align-self-end" style={{ marginLeft: "20px", marginTop: "8px", display: "flex" }}>
                                <Button variant="link" style={{ width: "40px", marginRight: "10px", border: "1px solid" }}>
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button variant="link" style={{ width: "40px", marginRight: "10px", border: "1px solid" }}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </span>
                        </div>
                    </div>
                </Container>
            </div>
            <div >
                <Container >
                    <Row className="my-4" >
                        <div className="d-flex flex-wrap">
                            <Col md={8}>
                                <div className="images-container d-flex flex-wrap align-items-center justify-content-center" >
                                    <Col><div style={{ margin: "2px" }}>
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 1" className="image mb-3" onClick={() => setSelectedImage("")} />
                                    </div></Col>
                                    <Col><div style={{ margin: "2px" }}>
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 2" className="image mb-3" onClick={() => setSelectedImage("")} />
                                    </div></Col>
                                    <Col><div style={{ margin: "2px" }}>
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 3" className="image mb-3" onClick={() => setSelectedImage("")} />
                                    </div></Col>
                                    <Col><div style={{ margin: "2px" }}>
                                        <img src={process.env.PUBLIC_URL + "/images/characters/add_new_4.png"} alt="Character 4" className="image mb-3" onClick={() => setSelectedImage("")} />
                                    </div></Col>
                                </div>
                            </Col>
                            <Col>
                                <div className="justify-content-center align-items-center" >
                                    <div>
                                        <img src={process.env.PUBLIC_URL + "/images/characters/paimon.png"} alt="Paimon" className="image mb-3" />
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Row>
                    <Modal show={selectedImage !== null} onHide={() => setSelectedImage(null)} size="lg" className="d-flex align-items-center justify-content-center flex-wrap my-4" centered>
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
                                        src={process.env.PUBLIC_URL + "/images/characters/Character_Jean.png"}
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
                                            setSelectedImage("/images/characters/Character_Jean.png");
                                            onHide();
                                        }}
                                    />
                                    <img
                                        src={process.env.PUBLIC_URL + "/images/characters/Character_Bennett.png"}
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
                                            setSelectedImage("/images/characters/Character_Bennett.png");
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
                </Container>
            </div>
            <div className="py-5 content-wrapper" style={{ backgroundImage: 'linear-gradient(to left bottom, rgba(189, 195, 199, .75), rgba(44, 62, 80, .75))', backgroundSize: '100%' }}>
                <Container >
                    {Array.from({ length: rows }, (_, i) => (
                        <Row key={i} className="my-4">
                            <div className="d-flex flex-wrap" >
                                <Col md={8}>
                                    <div className="d-flex flex-wrap lign-items-center justify-content-center" >
                                        <Col><div style={{ width: "175px" }}>
                                            <Dropdown style={{ padding: "5px" }}>
                                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                    Choose Skill
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu variant="dark">
                                                    <Dropdown.Item href="#/action-2">Skill 1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Skill 2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4">Skill 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div></Col>
                                        <Col><div style={{ width: "175px" }}>
                                            <Dropdown style={{ padding: "5px" }}>
                                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                    Choose Skill
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu variant="dark">
                                                    <Dropdown.Item href="#/action-2">Skill 1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Skill 2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4">Skill 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div></Col>
                                        <Col><div style={{ width: "175px" }}>
                                            <Dropdown style={{ padding: "5px" }}>
                                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                    Choose Skill
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu variant="dark">
                                                    <Dropdown.Item href="#/action-2">Skill 1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Skill 2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4">Skill 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div></Col>
                                        <Col><div style={{ width: "175px" }}>
                                            <Dropdown style={{ padding: "5px" }}>
                                                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                                    Choose Skill
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu variant="dark">
                                                    <Dropdown.Item href="#/action-2">Skill 1</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Skill 2</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-4">Skill 3</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div></Col>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-wrap lign-items-center justify-content-center" >
                                        <Col><div style={{ paddingLeft: "18px", width: "170px" }}>
                                            <InputGroup style={{ width: "135px", padding: "5px" }}>
                                                <Form.Control placeholder="DMG" disabled />
                                            </InputGroup>
                                        </div></Col>
                                        <Col><div style={{ paddingLeft: "18px", width: "170px" }}>
                                            <InputGroup style={{ width: "135px", padding: "5px", }}>
                                                <Form.Control placeholder="Time" disabled />
                                            </InputGroup>
                                        </div></Col>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    ))}
                    <Row className="justify-content-center mt-5">
                        <Button style={{ width: "200px" }} onClick={addRow}><FaPlus />  New line</Button>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default TeamPage;