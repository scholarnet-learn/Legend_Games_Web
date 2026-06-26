import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/mainLayout";
import HomePage from "./pages/HomePage";
import NewReleasesPage from "./pages/NewRealasePage";
import ContactUs from "./pages/ContactUs";
import ProdPage from "./pages/ProdPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewReleasesPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/prod/:productId" element={<ProdPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;