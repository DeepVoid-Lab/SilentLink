import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthState = {
  isLogdin: boolean;
  username: string;
  isReady: boolean;
  dp:string
  signIn: (username: string, dp: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLogdin: false,
  username: "undefined",
  isReady: false,
  dp: "",
  signIn: () => {},
  signOut: () => {},
});

const authStorageKey = "chat-auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLogdin, SetIsLogdin] = useState(false);
  const [isReady, SetIsReady] = useState(false);
  const [dp, SetDp] = useState("");
  const [username, SetUsername] = useState("");
  const Router = useRouter();

  const storeAuthStorage = async (newState: {
    isLogdin: boolean;
    username: string;
    dp: string;
  }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (e) {
      // saving error
      console.error("Enable to Store Async Storage", e);
    }
  };

  const signIn = (username: string, dp: string) => {
    SetIsLogdin(true);
    SetUsername(username);
    SetDp(dp);
    storeAuthStorage({ isLogdin: true, username: username, dp: dp });
    Router.replace("/");
  };

  const signOut = () => {
    SetIsLogdin(false);
    storeAuthStorage({ isLogdin: false, username: "", dp: "" });
    Router.replace("/signin");
  };

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value != null) {
          const auth = JSON.parse(value);
          if (typeof auth.isLogdin === "boolean") {
            SetIsLogdin(auth.isLogdin);
          }
          if (typeof auth.username === "string") {
            SetUsername(auth.username);
          }
        }
      } catch (e) {
        console.info("Enable to Store Async Storage", e);
      }
      SetIsReady(true);
    };
    getAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLogdin, username, isReady,dp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = () => useContext(AuthContext);
