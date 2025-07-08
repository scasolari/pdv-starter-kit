import Link from "next/link";
import { BiCog, BiCollection } from "react-icons/bi";
import { useRouter } from "next/router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { setProfile } from "@/redux/actions/main";
import { connect } from "react-redux";
import { useEffect } from "react";
import useLogout from "@/lib/logout";

function NavigationBar(props) {
    const { profile, setProfile } = props;
    const { data: session } = useSession();
    const router = useRouter();
    const logout = useLogout();

    const linkActive = (path) => {
        return router.pathname === path;
    };

    useEffect(() => {
        setProfile(session);
    }, [session]);

    if(!session) return null;

    return (
        <div className="fixed top-0 left-0 bottom-0 bg-neutral-50">
            <div className="flex justify-center items-center h-16">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:ring-0 focus-visible:!outline-0">
                        <Avatar className="h-[36px] w-[36px] border">
                            <AvatarImage src={profile?.user?.image} className="ring-0 outline-0 bg-white"/>
                            <AvatarFallback>{profile?.user?.name?.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="shadow-md w-[260px]">
                        <DropdownMenuLabel>
                            <p>{profile?.user?.name}</p>
                            <p className="text-neutral-500 font-semibold text-sm">{profile?.user?.email}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="font-semibold hover:cursor-pointer">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ul className="p-3 grid gap-1">
                <li>
                    <Link
                        href="/app/dashboard"
                        className={`flex items-center p-1.5 hover:bg-neutral-200 rounded-md ${linkActive("/app/dashboard") ? `!bg-blue-100` : null}`}
                    >
                        <BiCollection size={24} />
                    </Link>
                </li>
                <li>
                    <Link
                        href="/app/settings"
                        className={`flex items-center p-1.5 hover:bg-neutral-200 rounded-md ${linkActive("/app/settings") ? `!bg-blue-100` : null}`}
                    >
                        <BiCog size={24} />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    };
};

const mapDispatchToProps = {
    setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
