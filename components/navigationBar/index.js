import Link from "next/link";
import {BiCog, BiCollection} from "react-icons/bi";
import {useRouter} from "next/router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useSession} from "next-auth/react";


export default function NavigationBar() {
    const { data: session } = useSession();
    const router = useRouter();
    const linkActive = (path) => {
        return router.pathname === path;
    };
    if(!session) return null;
    return <div className="fixed top-0 left-0 bottom-0 border-r">
        <div className="flex justify-center items-center h-16">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="h-[36px] w-[36px]">
                        <AvatarImage src={session.user.image} />
                        <AvatarFallback>{session.user.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuLabel>
                        <p>{session.user.name}</p>
                        <p className="text-muted-foreground text-sm">{session.user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <ul className="p-3 grid gap-1">
            <li>
                <Link href="/app/dashboard"
                      className={`flex items-center p-1.5 hover:bg-neutral-100 rounded-md ${linkActive("/app/dashboard") ? `!bg-slate-800 text-white` : null}`}>
                    <BiCollection size={24}/>
                </Link>
            </li>
            <li>
                <Link href="/app/settings"
                      className={`flex items-center p-1.5 hover:bg-neutral-100 rounded-md ${linkActive("/app/settings") ? `!bg-neutral-800 text-white` : null}`}>
                    <BiCog size={24}/>
                </Link>
            </li>
        </ul>
    </div>
}
