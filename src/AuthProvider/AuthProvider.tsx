import { createContext, ReactNode, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  profilePhoto: string;
  role: "ADMIN" | "SELLER" | "BUYER";
  exp: number; // Expiry time in seconds
}

interface AuthContextType {
  user: DecodedToken | null;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndSetUser = async () => {
      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");

      if (accessToken) {
        try {
          const decodedUser = jwtDecode<DecodedToken>(accessToken);

          // Check token expiry
          if (decodedUser.exp * 1000 > Date.now()) {
            setUser(decodedUser);
          } else if (refreshToken) {
            await refreshAccessToken(refreshToken); // Attempt to refresh the token
          } else {
            logout();
          }
        } catch (error) {
          console.error("Invalid access token", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkTokenAndSetUser();

    // Function to periodically check if the user is still active
    const interval = setInterval(() => {
      if (!user) {
        clearInterval(interval); // Clear interval if user is inactive
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [user]);

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access-token", data.accessToken);
        const decodedUser = jwtDecode<DecodedToken>(data.accessToken);
        setUser(decodedUser);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Failed to refresh access token", error);
      logout();
    }
  };

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


// import { createContext, ReactNode, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// // Define the type for the decoded token (adjust this based on your token's structure)
// interface DecodedToken {
//   id: string;
//   name: string;
//   email: string;
//   mobileNumber: string;
//   profilePhoto: string;
//   role:"ADMIN"|"SELLER"|"BUYER";
//   // add any other fields your token might contain
// }
// // Define the AuthContext type
// interface AuthContextType {
//   user: DecodedToken | null;
//   logout: () => void;
//   loading: boolean;
// }

// // Create an AuthContext with a default value of null
// export const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   // State to store user authentication info
//   const [user, setUser] = useState<DecodedToken | null>(null);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const accessToken = localStorage.getItem("access-token");
//     const refreshToken = localStorage.getItem("refresh-token");
//     if (accessToken && refreshToken) {
//       try {
//         // Decode the token and set the user state
//         const decodedUser = jwtDecode<DecodedToken>(accessToken);
//         setUser(decodedUser);
//         setLoading(false);
//       } catch (error) {
//         console.error("Invalid access token", error);
//       }
//     }
//   }, []);

//   // Define a function to log out the user
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("access-token");
//     localStorage.removeItem("refresh-token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
