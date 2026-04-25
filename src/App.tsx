import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";

const App = () => {
  return (
    <main className="bg-brand-navy min-h-screen">
      <HeroSection />
      <AboutSection />
    </main>
  );
};

export default App;