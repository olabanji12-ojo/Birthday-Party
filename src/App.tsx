import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventDetailsSection from "./components/EventDetailsSection";
import ThemeSection from "./components/ThemeSection";
import GallerySection from "./components/GallerySection";
import RSVPSection from "./components/RSVPSection";
import GiftSection from "./components/GiftSection";
import FooterSection from "./components/FooterSection";

const App = () => {
  return (
    <main className="bg-brand-navy min-h-screen">
      <HeroSection />
      <AboutSection />
      <EventDetailsSection />
      <ThemeSection />
      <GallerySection />
      <RSVPSection />
      <GiftSection />
      <FooterSection />
    </main>
  );
};

export default App;