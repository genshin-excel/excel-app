import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
      <Container>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mt-2 mb-0">© 2023 Excel App. All rights reserved</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;