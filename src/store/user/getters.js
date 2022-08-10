import { ROLES } from "@/consts";

export default {
  apiToken: (state) => state.apiToken,
  isAuthenticated: (state) => {
    return (
      state.apiToken.length > 0 &&
      Object.prototype.hasOwnProperty.call(state.user, "name")
    );
  },
  user: (state) => state.user,
  isAdmin: (state) => {
    if (Object.prototype.hasOwnProperty.call(state.user, "roles")) {
      if (state.user.roles.map((v) => v.id).includes(ROLES.admin)) return true;
    }
    return false;
  },
};
