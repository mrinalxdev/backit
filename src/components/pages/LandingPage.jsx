import Features from "../Landing/Featrues";
import HeroLanding from "../Landing/Hero";
import KeyUpdates from "../Landing/KeyUpdates";

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      <HeroLanding />
      <div className="w-[95%] mx-auto">
        <Features />
        <KeyUpdates />
      </div>
    </div>
  );
};

export default LandingPage;
