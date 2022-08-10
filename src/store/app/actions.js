export default {
  setErrorMessage({ commit, dispatch }, value) {
    commit("updateErrorMessage", value);
    if (value.length > 0) {
      dispatch("setSuccessMessage", "");
    }
  },
  setSuccessMessage({ commit, dispatch }, value) {
    commit("updateSuccessMessage", value);
    if (value.length > 0) {
      dispatch("setErrorMessage", "");
    }
  },
};
