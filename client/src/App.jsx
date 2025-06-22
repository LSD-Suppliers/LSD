import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import AnalyzeText from "./pages/AnalyzeText";
import AnalyzeURL from "./pages/AnalyzeURL";
import ReportAccount from "./pages/ReportAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/analyze-text" element={<AnalyzeText />} />
          <Route path="/analyze-url" element={<AnalyzeURL />} />
          <Route path="/report-account" element={<ReportAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
