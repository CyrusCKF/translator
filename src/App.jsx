import React from "react";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: 'md',
});

function App() {
  return <MantineProvider theme={theme}>Hello</MantineProvider>;
}

export default App;
