export function getSTUNServers() {
    // Hard-coded list of STUN servers
    return [
        "stun.l.google.com:19302",
        "stun.l.google.com:19305",
        "stun1.l.google.com:19302",
        "stun1.l.google.com:19305",
        "stun2.l.google.com:19302",
        "stun2.l.google.com:19305",
        "stun3.l.google.com:19302",
        "stun3.l.google.com:19305",
        "stun4.l.google.com:19302",
        "stun4.l.google.com:19305"
    ];
    // Could reference local text file
    // Could reference online list like https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_hosts.txt
}