import Link from "next/link";
import {BiCollection} from "react-icons/bi";

export default function NavigationBar() {
    return <div className="fixed top-0 left-0 bottom-0 border-r">
        <ul className="p-3">
            <li>
                <Link href="/" className="flex items-center p-1.5 hover:bg-neutral-100 rounded-md">
                    <BiCollection size={24} />
                </Link>
            </li>
        </ul>
    </div>
}
