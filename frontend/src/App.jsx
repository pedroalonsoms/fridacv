import RegisterCompanyPage from "./pages/RegisterCompanyPage";
import Navbar from "./components/Navbar";
import UploadCVPage from "./pages/UploadCVPage";
import UploadedCVPage from "./pages/UploadedCVPage";
import JobPostingsPage from "./pages/JobPostingsPage";
import SearchCandidatesPage from "./pages/SearchCandidatesPage";

export default function App() {
  return (
    <div>
      <Navbar />
      <RegisterCompanyPage />
      <JobPostingsPage />
      <SearchCandidatesPage />
      <hr></hr>
      <UploadCVPage />
      <UploadedCVPage />
    </div>
  );
}
