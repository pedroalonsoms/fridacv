import RegisterCompanyPage from "./pages/RegisterCompanyPage";
import Navbar from "./components/Navbar";
import UploadCVPage from "./pages/UploadCVPage";

export default function App() {
  return (
    <div>
      <Navbar />
      <RegisterCompanyPage />
      <hr></hr>
      <UploadCVPage />
    </div>
  );
}
