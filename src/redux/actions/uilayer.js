import { SET_LOADING } from "./types";

export const action_setLoading = (loading) => {
  return {
    type: SET_LOADING,
    loading,
  };
};
