import {useDispatch} from "react-redux";
import {signOut} from "next-auth/react";

export default function useLogout() {
    const dispatch = useDispatch();

    return () => {
        signOut({callbackUrl: "/"})
            .then(() => {
                dispatch({type: 'PROFILE_LOGOUT'});
            });
    };
}
