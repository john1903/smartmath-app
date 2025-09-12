import { persistor, store } from "../store";
import { setLogout } from "../store/auth";
import { setLoading } from "../store/loading";

export const logoutUser = async () => {
  // Show loader
  store.dispatch(setLoading(true));

  // Wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Reset redux state
  store.dispatch(setLogout());

  // Hide loader
  store.dispatch(setLoading(false));

  // Clear persisted auth
  await persistor.purge();
};
