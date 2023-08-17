import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import "./AppHomepage.scss";
import Battles from "./Battles";

import { Routes, Route, Outlet } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Aside from "../components/Aside";
import Header from "../components/Header";
import UploadModal from "../components/UploadModal";
import { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuth } from "../AuthContext";
import Onboarding from "./Onboarding";
import PraiseModal from "../components/PraiseModal";

const AppHomepage = ({
  currentPage,
  setCurrentPage,
  slidePosition,
  setSlidePosition,
  isFirstLogIn,
  setIsFirstLogIn,
}) => {
  const { user, storedUserId } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState();

  const [emailVerified, setEmailVerified] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDocRef = doc(db, "users", storedUserId);
    const shouldUserHaveAccess = async () => {
      try {
        const userDoc = await getDoc(userDocRef);

        setOnboardingComplete(userDoc.data().onboarding_complete);

        console.log("Onboarding complete?:" + onboardingComplete);

        setEmailVerified(user.emailVerified);
        setLoading(false);
      } catch {
        console.log("error");
      }
    };

    shouldUserHaveAccess();
  }, [user, storedUserId]);

  return (
    <div className="app-homepage">
      {isFirstLogIn && <PraiseModal />}
      {loading && <h1>LOADING</h1>}

      {!emailVerified && !loading && <h1>You need to verify your email</h1>}

      {!onboardingComplete && emailVerified && !loading && (
        <Onboarding
          setOnboardingComplete={setOnboardingComplete}
          setIsFirstLogIn={setIsFirstLogIn}
        />
      )}

      {onboardingComplete && emailVerified && !loading && (
        <>
          <Aside
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            slidePosition={slidePosition}
            setSlidePosition={setSlidePosition}
          />

          <main>
            <Header
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSlidePosition={setSlidePosition}
            />

            <div className="app-homepage-content">
              <Outlet />
            </div>
          </main>
          <MobileNav />
        </>
      )}
    </div>
  );
};

export default AppHomepage;
