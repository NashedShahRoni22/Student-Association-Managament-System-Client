import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { app } from "../firebase/Firebase.Config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  // set user information
  const [user, setUser] = useState(null);
  //signed in user info
  const [signedInUser, setSignedInUser] = useState(null);
  //total
  //spinner for loading state
  const [loading, setLoading] = useState(true);
  //all clubs
  const clubs = [
    {
      name: "Drama",
    },
    {
      name: "Dance",
    },
    {
      name: "Music",
    },
    {
      name: "Racing",
    },
    {
      name: "Basketball",
    },
    {
      name: "Animation",
    },
    {
      name: "Soccer",
    },
    {
      name: "Badminton",
    },
    {
      name: "Confucius",
    },
    {
      name: "Debating",
    },
    {
      name: "Table Tennis",
    },
    {
      name: "Scatting",
    },
    {
      name: "Modeling",
    },
    {
      name: "Drawing",
    },
  ];
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //sign out user
  const logOut = () => {
    toast.error("Loged out");
    setSignedInUser(null)
    return signOut(auth);
  };
  //get current user and set to state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("Curent User Tracked", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);
  //get signed in user and set to state
  useEffect(() => {
    fetch(`http://localhost:5000/user?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setSignedInUser(data[0]));
  },[user?.email]);

  //update user's profile
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOut,
    updateUser,
    clubs,
    signedInUser
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
