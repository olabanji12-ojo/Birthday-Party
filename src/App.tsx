import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventDetailsSection from "./components/EventDetailsSection";

const App = () => {
  return (
    <main className="bg-brand-navy min-h-screen">
      <HeroSection />
      <AboutSection />
      <EventDetailsSection />
    </main>
  );
};

export default App;