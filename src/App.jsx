import React from "react";
import "@mantine/core/styles.css";
import {
  createTheme,
  MantineProvider,
  AppShell,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";

import classes from "./App.module.css";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
});

function App() {
  console.log(classes);
  return (
    <MantineProvider theme={theme}>
      <AppShell navbar={{ width: 100 }} padding="md">
        <AppShell.Navbar
          style={{ display: "flex", alignItems: "center" }}
          p="md"
        >
          Navbar
          <Tooltip label="Project" position="right">
            <ActionIcon className={classes["action-icon"]} variant="filled">
              <IconPhone className={classes["nav-icon"]} />
            </ActionIcon>
          </Tooltip>
        </AppShell.Navbar>
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
