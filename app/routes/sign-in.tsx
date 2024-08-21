import { Form, Link } from "@remix-run/react";

import { Button } from "~/shadcn/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "~/shadcn/components/ui/card";

export default function SignInPage() {
	return (
		<div className="grid justify-items-center">
			<Card className="w-full max-w-sm m-4">
				<CardHeader>
					<CardTitle className="text-2xl">ログイン</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Form method="post" action="/authentication/discord">
						<Button type="submit" className="w-full">
							Discordでログイン
						</Button>
					</Form>
					<div className="text-center text-sm">
						<Link to="/sign-in-with-email" className="underline">
							メールアドレスでログイン
						</Link>
					</div>
					<div className="text-center text-sm">
						初めての方は
						<Link to="/sign-up" className="underline">
							アカウントの作成
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
