import "./tailwind.css";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import {
	PreventFlashOnWrongTheme,
	ThemeProvider,
	useTheme,
} from "remix-themes";

import { themeSessionResolver } from "./lib/theme-session-storage.server";

export const meta: MetaFunction = () => [
	{ charSet: "utf-8" },
	{ name: "viewport", content: "width=device-width, initial-scale=1" },
];

export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	return { theme: getTheme() };
}

function LayoutContent({ children }: { children: React.ReactNode }) {
	const data = useRouteLoaderData<typeof loader>("root");
	const theme = useTheme();
	return (
		<html className={clsx(theme)}>
			<head>
				<Meta />
				<Links />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useRouteLoaderData<typeof loader>("root");
	if (!data) {
		return null;
	}
	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/set-theme">
			<LayoutContent>{children}</LayoutContent>
		</ThemeProvider>
	);
}

export default function App() {
	return <Outlet />;
}
