import React, { useEffect } from "react";
import "@mantine/core/styles.css";
import {
  createTheme,
  MantineProvider,
  AppShell,
  Tooltip,
  ActionIcon,
  Text,
} from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";

import classes from "./App.module.css";
import { getAllModels } from "./agent/AgentApi";
import Paragraph from "./paragraph/Paragraph";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  primaryColor: "green",
});

function App() {
  useEffect(() => {
    async function getModels() {
      const response = await getAllModels();
      console.log(response);
    }
    getModels();
  });

  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <AppShell
        classNames={{ navbar: classes.navbar }}
        navbar={{ width: "100px" }}
        padding="md"
      >
        <AppShell.Navbar>
          <Text>Navbar</Text>
          <Tooltip label="Project" position="right">
            <ActionIcon className={classes["action-icon"]} variant="filled">
              <IconPhone className={classes["nav-icon"]} />
            </ActionIcon>
          </Tooltip>
        </AppShell.Navbar>
        <AppShell.Main>
          <Paragraph></Paragraph>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
