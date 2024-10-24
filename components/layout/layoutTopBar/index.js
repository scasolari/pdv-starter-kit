import NavigationTopBar from "@/components/navigationBar/navigationTopBar";
import {useSession} from "next-auth/react";
import {setOrganization, setOrganizations, setProfile} from "@/redux/actions/main";
import {connect} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { Toaster } from "@/components/ui/sonner"
import PostHog from 'posthog-js';

const MY_POSTHOG_API_KEY = process.env.REACT_APP_PUBLIC_POSTHOG_KEY;

function LayoutTopBar({ children, profile, setProfile, title, setOrganizations, organization, dbId }) {
    const { data: session } = useSession();
    const router = useRouter();
    const {id} = router.query
    const fetchOrganizations = () => {
        axios.get("/api/organization").then((response) => {
            setOrganizations(response.data);
        })
    }
    useEffect(() => {
        fetchOrganizations()
        setProfile(session);
        PostHog.init('phc_PbUZ5Ig27JPfOiqhlhc9k8OIzJShrncjgGWKTCsAk2p', {
            api_host: 'https://eu.i.posthog.com',
            person_profiles: 'always'
        });

        PostHog.identify(profile?.user?.id);
        // Funzione per gestire il cambiamento della rotta
        const handleRouteChange = (url) => {
            PostHog.capture('pageview', { url });
        };

        // Aggiungi un listener per il cambiamento della rotta
        router.events.on('routeChangeComplete', handleRouteChange);

        // Pulire il listener quando il componente viene smontato
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [session, profile, setProfile, router.events]);
    if (!session) return null;
    return <div>
        <Toaster />
        <NavigationTopBar profile={session}/>
        <div className="w-full px-8 lt-md:!px-4 md:max-w-7xl mt-6">
            <div className="text-lg font-semibold mb-6">
                <h1>{title}</h1>

            </div>
            <div>
                {children}
            </div>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        organization: state.organization.organization,
        organizations: state.organizations.organizations,
    };
};

const mapDispatchToProps = {
    setProfile,
    setOrganization,
    setOrganizations
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTopBar);
