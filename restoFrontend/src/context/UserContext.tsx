import { createContext, useState, useEffect } from "react";
import Cookie from "cookie-universal";
import { Axios } from "../api/Axios";
import { IMAGE_URL } from "@/api/Config";

type Auth = {
  user: string | null;
  token: string | null;
};

type UserContextType = {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
  isStaff: boolean;
  profileImage: string;
};

const UserContext = createContext<UserContextType>({
  auth: null,
  setAuth: () => {},
  isStaff: false,
  profileImage: "",
});

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    token: null,
  });
  const [isStaff, setIsStaff] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const cookie = Cookie();

  useEffect(() => {
    const userFromCookie = cookie.get("userId");
    const tokenFromCookie = cookie.get("token");

    if (userFromCookie && tokenFromCookie) {
      setAuth({
        user: userFromCookie,
        token: tokenFromCookie,
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/Users/${auth.user}`);

        if ([4000, 5000, 7000, 9000].includes(res.data.user.role)) {
          setIsStaff(true);
        }
        if (res.data.user.image) {
          setProfileImage(IMAGE_URL + res.data.user.image);
        }
      } catch (error) {
        console.log(error?.response.data.message || "An error occurred");
      }
    };

    if (auth.user) {
      fetchData();
    }
  }, [auth.user]);

  const value = {
    auth,
    setAuth,
    isStaff,
    profileImage,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
