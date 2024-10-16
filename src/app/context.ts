import { User, UserProfile } from "@/types";
import { Dispatch, createContext } from "react";

export type JubarexContextType = {
  user: User | undefined;
  setUser: Dispatch<User | undefined>;
  userProfile: UserProfile | undefined;
  setUserProfile: Dispatch<UserProfile | undefined>;
  logout: () => {};
  refreshUserFromToken: () => {};
};

export const JubarexContext = createContext<JubarexContextType | null>(null);
