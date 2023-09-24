import RegisterCompanyPage from "./pages/RegisterCompanyPage";
import Navbar from "./components/Navbar";
import UploadCVPage from "./pages/UploadCVPage";
import UploadedCVPage from "./pages/UploadedCVPage";
import JobPostingsPage from "./pages/JobPostingsPage";

export default function App() {
  return (
    <div>
      <Navbar />
      <RegisterCompanyPage />
      <JobPostingsPage />
      <hr></hr>
      <UploadCVPage />
      <UploadedCVPage />
    </div>
  );
}
