import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/clerk-react";

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  return (
    <div>
      <Button>
        {isSignedIn ? (
          <Link to="/dashboard">Go to Dashboard</Link>
        ) : (
          <Link to="/sign-in">Get Started</Link>
        )}
      </Button>
    </div>
  );
};

export default LandingPage;
