import * as t from "../types";

export const setProfile = (profile) => dispatch => {
    dispatch({
        type: t.SET_PROFILE,
        payload: profile
    });
}

export const setOrganization = (organization) => dispatch => {
    dispatch({
        type: t.SET_ORGANIZATION,
        payload: organization
    });
}

export const setOrganizations = (organizations) => dispatch => {
    dispatch({
        type: t.SET_ORGANIZATIONS,
        payload: organizations
    });
}
