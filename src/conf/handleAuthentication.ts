import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../hooks";

export const handleAuthentication = (token) => {
  const decodedToken: any = jwtDecode(token.accessToken.token);
  const role = decodedToken.role ? decodedToken.role[0] : null;
  const { setToken, setRole, setUserId, setDirectionId } =
    useAuthStore.getState();

  setToken(token.accessToken);
  setRole(role);
  setUserId(token.userId);
  setDirectionId(token.directionId);
};
