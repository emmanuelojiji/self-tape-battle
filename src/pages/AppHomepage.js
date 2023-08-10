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
import { db } from "../firebaseConfig";
import { useAuth } from "../AuthContext";
import Onboarding from "./Onboarding";

const AppHomepage = ({
  currentPage,
  setCurrentPage,
  slidePosition,
  setSlidePosition,
}) => {
  const { user, storedUserId } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfOnboarded = async () => {
      const userDocRef = doc(db, "users", storedUserId);
      const userDoc = await getDoc(userDocRef);

      setOnboardingComplete(userDoc.data().onboarding_complete);

      setLoading(false);
      console.log("Onboarding complete?:" + onboardingComplete);
    };

    checkIfOnboarded();
  }, [user, storedUserId]);

  return (
    <div className="app-homepage">
      {loading && <h1>LOADING</h1>}

      {!onboardingComplete && !loading && (
        <Onboarding setOnboardingComplete={setOnboardingComplete} />
      )}

      {onboardingComplete && !loading && (
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
