import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const LandingPage = () => {
  return (
    <div>
      <Button>
        <Link to="/sign-in">Get Started</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
