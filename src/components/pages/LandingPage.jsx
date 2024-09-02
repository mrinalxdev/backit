import Features from "../Landing/Featrues";
import HeroLanding from "../Landing/Hero";
import KeyUpdates from "../Landing/KeyUpdates";

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      <HeroLanding />
      <div className="w-[95%] mx-auto">
        <Features />
      </div>

      <footer className="bg-white rounded-lg shadow mx-4 mb-4 -mt-6 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              DropItChat
            </a>
          </span>
          <span className="flex flex-wrap items-center mt-1 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <a href="https://mrinal-dev.vercel.app">Made By @Hi_Mrinal</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
