import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

export default function Home() {
    return <div className="p-3">
        <Button onClick={() => signIn("github", {callbackUrl: "/app/welcome"})}>Go to Dashboard</Button>
    </div>
}
