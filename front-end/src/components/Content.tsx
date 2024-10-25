import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Box
          sx={{
            height: "auto",
            bgcolor: "#ffffff",
            p: 2,
            padding: 0,
            // border: "5px solid blue",
            minHeight: "500px",
          }}
        >
          <Box sx={{ minHeight: "800px", backgroundColor: "#f7f7f8" }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Content;
