import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "../lib/theme-storage.server";

export const action = createThemeAction(themeSessionResolver);
