import "./tailwind.css";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import {
	PreventFlashOnWrongTheme,
	Theme,
	ThemeProvider,
	useTheme,
} from "remix-themes";

import { Button } from "~/shadcn/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/shadcn/components/ui/dropdown-menu";

import { themeSessionResolver } from "./lib/theme-storage.server";

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
	const [theme] = useTheme();
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

function ThemeToggle() {
	const [, setTheme] = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						setTheme(Theme.LIGHT);
					}}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setTheme(Theme.DARK);
					}}
				>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default function App() {
	return (
		<>
			<header className="sticky bg-accent flex">
				<h1>
					<Link to="/">Japanese Restream</Link>
				</h1>
				<ThemeToggle />
			</header>
			<Outlet />
		</>
	);
}
