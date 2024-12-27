import React, { useEffect } from "react";
import "@mantine/core/styles.css";
import {
  createTheme,
  MantineProvider,
  AppShell,
  Tooltip,
  ActionIcon,
  Text,
  Space,
  Stack,
} from "@mantine/core";
import { IconHelp, IconLanguageHiragana } from "@tabler/icons-react";

import classes from "./App.module.css";
import { getAllModels } from "./agent/AgentApi";
import Paragraph from "./paragraph/Paragraph";
import {
  BrowserRouter,
  HashRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Help from "./help/Help";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  primaryColor: "green",
  scale: 1.5,
});

export default function App() {
  useEffect(() => {
    async function getModels() {
      const response = await getAllModels();
      console.log(response);
    }
    getModels();
  });

  return (
    <HashRouter>
      <MantineProvider theme={theme} forceColorScheme="dark">
        <AppShell
          classNames={{ navbar: classes.navbar }}
          navbar={{ width: "70px" }}
          padding="xl"
        >
          {/* <AppShell.Navbar>
            <Space h="md"></Space>
            <Stack>
              <NavIcon to="/" tooltip="Translation">
                <IconLanguageHiragana className={classes["nav-icon"]} />
              </NavIcon>
              <NavIcon to="/help" tooltip="Help">
                <IconHelp className={classes["nav-icon"]} />
              </NavIcon>
            </Stack>
          </AppShell.Navbar> */}
          <AppShell.Main>
            <Routes>
              <Route path="/translator" element={<Paragraph />}></Route>
              <Route path="/help" element={<Help />}></Route>
              <Route path="*" element={<Text>Page not found</Text>}></Route>
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </HashRouter>
  );
}

// eslint-disable-next-line react/prop-types
function NavIcon({ to, tooltip, children }) {
  const location = useLocation();
  const variant = location.pathname === to ? "filled" : "light";
  return (
    <NavLink to={to}>
      <Tooltip label={tooltip} position="right">
        <ActionIcon className={classes["action-icon"]} variant={variant}>
          {children}
        </ActionIcon>
      </Tooltip>
    </NavLink>
  );
}
