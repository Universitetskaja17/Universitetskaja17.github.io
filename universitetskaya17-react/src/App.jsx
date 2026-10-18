import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import PhonesPage from "./pages/PhonesPage";
import LinksPage from "./pages/LinksPage";
import AddressPage from "./pages/AddressPage";
import VideoPage from "./pages/VideoPage";
import PaymentPage from "./pages/PaymentPage";
import ActivityPage from "./pages/ActivityPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PhonesPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
