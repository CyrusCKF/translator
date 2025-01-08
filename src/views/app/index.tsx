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
import {
  IconClipboardText,
  IconHelp,
  IconLanguageHiragana,
} from "@tabler/icons-react";

import classes from "./index.module.css";
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Paragraph from "../paragraph";
import Help from "../help";
import ProjectManager from "../project.manager";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  primaryColor: "green",
  scale: 1.3,
});

export default function App() {
  return (
    <HashRouter basename="/">
      <MantineProvider theme={theme} forceColorScheme="dark">
        <AppShell
          classNames={{ navbar: classes.navbar }}
          navbar={{ width: "70px", breakpoint: "sm" }}
          padding="xl"
        >
          <AppShell.Navbar>
            <Space h="md"></Space>
            <Stack>
              <NavIcon to="/" tooltip="Translation">
                <IconLanguageHiragana className={classes["nav-icon"]} />
              </NavIcon>
              <NavIcon to="/paragraph" tooltip="Paragraph">
                <IconClipboardText className={classes["nav-icon"]} />
              </NavIcon>
              <NavIcon to="/help" tooltip="Help">
                <IconHelp className={classes["nav-icon"]} />
              </NavIcon>
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<ProjectManager />}></Route>
              <Route path="/paragraph" element={<Paragraph />}></Route>
              <Route path="/help" element={<Help />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </HashRouter>
  );
}

function NotFoundPage() {
  const location = useLocation();
  return <Text>Page {location.pathname} not found</Text>;
}

interface NavIconProps {
  to: string;
  tooltip: string;
  children: JSX.Element;
}

function NavIcon({ to, tooltip, children }: NavIconProps) {
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
