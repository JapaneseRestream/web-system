import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export function loader({ request, context }: LoaderFunctionArgs) {
	return context.auth.authenticate("discord", request, {
		successRedirect: "/",
	});
}
