import { createContext, ReactNode, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Define the type for the decoded token (adjust this based on your token's structure)
interface DecodedToken {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  profilePhoto: string;
  // add any other fields your token might contain
}
// Define the AuthContext type
interface AuthContextType {
  user: DecodedToken | null;
  logout: () => void;
  loading: boolean;
}

// Create an AuthContext with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to store user authentication info
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    if (accessToken && refreshToken) {
      try {
        // Decode the token and set the user state
        const decodedUser = jwtDecode<DecodedToken>(accessToken);
        setUser(decodedUser);
        setLoading(false);
      } catch (error) {
        console.error("Invalid access token", error);
      }
    }
  }, []);

  // Define a function to log out the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
