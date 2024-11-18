import "rsuite/dist/rsuite.min.css";
import SignInForm from "./components/SingInForm";
import { Container, Content } from "rsuite";
import { Row, VStack, Col } from "rsuite";
import "./Swiggy-theme.css";

function App() {
  return (
    <Container style={{ height: "100vh" }}>
      <Content style={{ height: "100%" }}>
        <VStack
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%" }}
        >
          <Row className="show-grid">
            <Col>
              <SignInForm />
            </Col>
          </Row>
        </VStack>
      </Content>
    </Container>
  );
}

export default App;
