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
import Loading from "../components/Loading";
import { sendEmailVerification } from "firebase/auth";
import WelcomeModal from "../components/WelcomeModal";

const AppHomepage = ({
  currentPage,
  setCurrentPage,
  slidePosition,
  setSlidePosition,
  isFirstLogIn,
  setIsFirstLogIn,
  setPraiseModalVisible,
}) => {
  const { user, storedUserId } = useAuth();
  const [onboardingComplete, setOnboardingComplete] = useState();

  const [emailVerified, setEmailVerified] = useState(null);

  const [loading, setLoading] = useState(true);

  const [welcomeModalVisible, setWelcomeModalVisible] = useState(null);

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

  const developmentMode = false;

  return (
    <>
      <div>{developmentMode && <Onboarding />}</div>
      <div className="app-homepage">
        {loading && <Loading />}

        {welcomeModalVisible && <WelcomeModal />}

        {!emailVerified && !loading && (
          <div className="verify-email">
            <h1>Please verify your email to access the arena</h1>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              I have verified
            </button>

            <button
              onClick={async () =>
                await sendEmailVerification(auth.currentUser)
              }
            >
              Send Email Again
            </button>
          </div>
        )}

        {!onboardingComplete && emailVerified && !loading && (
          <Onboarding
            setOnboardingComplete={setOnboardingComplete}
            setIsFirstLogIn={setIsFirstLogIn}
            setWelcomeVisible={setPraiseModalVisible}
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
    </>
  );
};

export default AppHomepage;
