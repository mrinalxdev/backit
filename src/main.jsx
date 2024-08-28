import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/pages/LandingPage.jsx";
import ProtectedPage from "./components/pages/ProtectedPage.jsx";
import ChatInterface from "./components/ChatInterface.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Explore from "./components/pages/Explore.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <Outlet />
    </ProtectedRoute>
  );
};

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route element={<ProtectedLayout />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/chatbot" element={<div className="bg-[url('/main-bg.png')]"><ChatInterface /></div>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </StrictMode>
);
