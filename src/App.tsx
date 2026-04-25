import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventDetailsSection from "./components/EventDetailsSection";
import ThemeSection from "./components/ThemeSection";
import GallerySection from "./components/GallerySection";
import RSVPSection from "./components/RSVPSection";
import GiftSection from "./components/GiftSection";
import FooterSection from "./components/FooterSection";
import AdminGuestList from "./components/AdminGuestList";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventDetailsSection />
      <ThemeSection />
      <GallerySection />
      <RSVPSection />
      <GiftSection />
      <FooterSection />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <main className="bg-brand-navy min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminGuestList />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;