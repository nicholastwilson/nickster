const LOCALSTORAGE_KEY_NICKSTER_PROFILE_ID = "nickster_profile_id";

function hasNicksterProfile() {
    return localStorage.getItem(LOCALSTORAGE_KEY_NICKSTER_PROFILE_ID) !== null;
}

function getNicksterProfileID() {
    const storedValue = localStorage.getItem(LOCALSTORAGE_KEY_NICKSTER_PROFILE_ID);
    if(storedValue === null)
        return null;
    else
        return JSON.parse(storedValue);
}

function hasSupabaseProfile() {
    return localStorage.getItem("sb-" + process.env.REACT_APP_SUPABASE_PROJECT_REF + "-auth-token") !== null;
}

export {
    LOCALSTORAGE_KEY_NICKSTER_PROFILE_ID,
    hasNicksterProfile,
    getNicksterProfileID,
    hasSupabaseProfile
}