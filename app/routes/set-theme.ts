import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "~/lib/theme-session-storage.server";

export const action = createThemeAction(themeSessionResolver);
