import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Error, Register, Dashboard, ProtectedRoute } from "./pages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AddJob,
  AllJobs,
  SharedLayout,
  Stats,
  Profile,
} from "./pages/dashboard";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        {/* Nested Route start */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
             </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* Nested Route end */}

        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
