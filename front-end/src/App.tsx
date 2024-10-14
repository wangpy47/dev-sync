import Header from "./components/Header";
import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Content />
        <Footer />
      </Box>
    </>
  );
}

export default App;
