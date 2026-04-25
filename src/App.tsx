import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventDetailsSection from "./components/EventDetailsSection";
import ThemeSection from "./components/ThemeSection";

const App = () => {
  return (
    <main className="bg-brand-navy min-h-screen">
      <HeroSection />
      <AboutSection />
      <EventDetailsSection />
      <ThemeSection />
    </main>
  );
};

export default App;