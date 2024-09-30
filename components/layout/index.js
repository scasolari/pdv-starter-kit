import NavigationBar from "@/components/navigationBar";

export default function Layout({ children, title }) {
    return <div>
        <NavigationBar/>
        <div className="ml-[60px] p-3">
            {children}
        </div>
    </div>
}
