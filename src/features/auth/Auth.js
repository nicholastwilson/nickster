const LOCALSTORAGE_KEY_NICKSTER_PROFILE = "nickster_profile";

function hasNicksterProfile() {
    return localStorage.getItem(LOCALSTORAGE_KEY_NICKSTER_PROFILE) !== null;
}

function getNicksterProfile() {
    const storedValue = localStorage.getItem(LOCALSTORAGE_KEY_NICKSTER_PROFILE);
    if(storedValue === null)
        return null;
    else
        return JSON.parse(storedValue);
}

function setNicksterProfile(profile) {
    if(profile) {
        localStorage.setItem(LOCALSTORAGE_KEY_NICKSTER_PROFILE, JSON.stringify(profile));
    } else {
        localStorage.removeItem(LOCALSTORAGE_KEY_NICKSTER_PROFILE);
    }
}

function hasSupabaseProfile() {
    return localStorage.getItem("sb-" + process.env.REACT_APP_SUPABASE_PROJECT_REF + "-auth-token") !== null;
}

export {
    LOCALSTORAGE_KEY_NICKSTER_PROFILE,
    hasNicksterProfile,
    getNicksterProfile,
    setNicksterProfile,
    hasSupabaseProfile
}