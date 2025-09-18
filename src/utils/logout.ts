// import { persistor, store } from "../store";
// import { setLogout } from "../store/auth";
// import { setLoading } from "../store/loading";

// export const logoutUser = async (dispatch: any) => {
//   // Show loader
//   store.dispatch(setLoading(true));

//   // Wait 3 seconds
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   // Reset redux state
//   store.dispatch(setLogout());

//   // Hide loader
//   store.dispatch(setLoading(false));

//   // Clear persisted auth
//   await persistor.purge();
// };

// utils/logout.ts
// import { persistor } from "../store";
// import { setLogout } from "../store/auth";
// import { setLoading } from "../store/loading";

// export const logoutUser = async (dispatch: any) => {
//   dispatch(setLoading(true));

//   // optional delay
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   // clear redux auth state
//   dispatch(setLogout());

//   // clear persisted storage
//   await persistor.purge();

//   dispatch(setLoading(false));
// };

// src/utils/logout.ts
import { setLogout } from "../store/auth";
import { setLoading } from "../store/loading";

export const logoutUser = async (dispatch: any) => {
  dispatch(setLoading(true));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  dispatch(setLogout());

  // lazy import to avoid circular dependency at module load time
  try {
    const { persistor } = await import("../store");
    if (persistor && typeof persistor.purge === "function") {
      await persistor.purge();
    }
  } catch (e) {
    // non-fatal — just warn so the app won't crash
    // Metro/console will log this during logout if something goes wrong
    // but it prevents the circular import issue on startup
    console.warn("Failed to purge persistor during logout:", e);
  }

  dispatch(setLoading(false));
};
