import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventDetailsSection from "./components/EventDetailsSection";
import ThemeSection from "./components/ThemeSection";
import GallerySection from "./components/GallerySection";
import RSVPSection from "./components/RSVPSection";

const App = () => {
  return (
    <main className="bg-brand-navy min-h-screen">
      <HeroSection />
      <AboutSection />
      <EventDetailsSection />
      <ThemeSection />
      <GallerySection />
      <RSVPSection />
    </main>
  );
};

export default App;