import { setLogout } from "../store/auth";
import { setLoading } from "../store/loading";

export const logoutApp = async (
  dispatch: any,
  logoutUser?: (args: any) => Promise<any>,
  deviceToken?: string | null
) => {
  try {
    dispatch(setLoading(true));

    if (logoutUser && deviceToken) {
      const payload = { device_token: deviceToken };
      const response = await logoutUser({ data: payload });
      console.log("Logout API response:", response);
    } else {
      console.log(
        " Skipping API logout call — missing logoutUser or deviceToken"
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setLogout());
  } catch (error) {
    console.error(" Logout failed:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
