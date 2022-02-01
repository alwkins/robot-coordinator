import { useState } from "react";
import { RobotCoordinator } from "../components/organisms/RobotCoordinator";
import { Robot } from "../util/types";
import { LoginBox } from "../components/organisms/LoginBox";
import { authenticateUser } from "../firebase/clientApp";

interface HomePageProps {
  robots: Array<Robot>;
}

function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const attemptAuthentication = (user: string, pw: string) => {
    if (authenticateUser(user, pw)) {
      // User is valid
      setLoggedInUser(user);
      setLoggedIn(true);
    } else {
      // TODO This is janky
      // Ideally show nice message and clear fields instead
      alert('Login failed, please try again.')
    }
  };
  return loggedIn ? (
    <RobotCoordinator user={loggedInUser}/>
  ) : (
    <LoginBox attemptLogin={attemptAuthentication} />
  );
}

export default HomePage;
