export function renderGitpodUrl(gitpodURL: string): string {
    const baseURL = encodeURIComponent(`${window.location.protocol}//${window.location.host}/${window.location.pathname}`);
    const ddevGitpodLauncherURL = 'https://github.com/drud/ddev-gitpod-launcher';
    return `${gitpodURL}/#DDEV_REPO=${baseURL},/${ddevGitpodLauncherURL}`;
}

export function makeOpenInPopup(a: HTMLAnchorElement): void {
    a.onclick = () => !window.open(a.href, a.target, 'menubar=no,toolbar=no,location=no,dependent');
}