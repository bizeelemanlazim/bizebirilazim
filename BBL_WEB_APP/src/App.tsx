import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "./theme";
import Register from "./views/Register";
import Guard from "./components/Guard";
import { CssBaseline } from "@mui/material";
import AppProvider from "./contexts/AppContext";
import Settings from "./views/Settings";
import Home from "./views/Home";
import MyJobs from "./views/MyJobs";
import Ratings from "./views/Ratings";
import AddEditJob from "./views/AddEditJob";
import Appeals from "./views/Appeals";
import JobSummary from "./views/JobSummary";
import Jobs from "./views/Jobs";
import Reports from "./views/Reports";
import AuthProvider from "./contexts/AuthContext";
import ConfirmAccount from "./views/ConfirmAccount";
import { SnackbarProvider } from "notistack";
import MyAppeals from "./views/MyAppeals";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/tr";
import "./utils/yup";

function App() {
  return (
    <SnackbarProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
        <AuthProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <AppProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register/:mode" element={<Register />} />
                  <Route
                    path="/api/v1/Auth/ConfirmEmail"
                    element={<ConfirmAccount />}
                  />
                </Routes>
                <Guard>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/my-jobs" element={<MyJobs />} />
                      <Route
                        path="/my-jobs/:id/edit"
                        element={<AddEditJob />}
                      />
                      <Route path="/my-jobs/new" element={<AddEditJob />} />
                      <Route path="/ratings" element={<Ratings />} />
                      <Route
                        path="/my-jobs/:id/appeals"
                        element={<Appeals />}
                      />
                      <Route path="/my-appeals" element={<MyAppeals />} />
                      <Route
                        path="/my-jobs/:id/summary"
                        element={<JobSummary />}
                      />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/reports" element={<Reports />} />
                    </Routes>
                  </Layout>
                </Guard>
              </Router>
            </AppProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  );
}

export default App;
