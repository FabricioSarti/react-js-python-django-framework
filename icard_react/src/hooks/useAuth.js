import { useContext } from "react";
import { AuthContext } from "../context";

// es otra funcion para llamar al AuthContext y active y renderice todo
export const useAuth = () => useContext(AuthContext);
