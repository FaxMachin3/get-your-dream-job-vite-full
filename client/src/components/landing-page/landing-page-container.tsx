import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";
import LandingPage from ".";

const LandingPageContainer = () => {
  const location = useLocation();

  if (location.pathname !== ROUTES.ROOT) return null;

  return <LandingPage />;
};

export default LandingPageContainer;
