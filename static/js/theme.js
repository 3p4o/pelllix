let schemes = {
    'dark': 'gg-sun',
    'light': 'gg-moon'
}

let cycle_theme = (current) => {
    let keys = Object.keys(schemes)
    let pos = keys.indexOf(current);
    return keys[pos + 1 > keys.length - 1 ? 0 : pos + 1];
}

let scheme = localStorage.getItem('color-scheme') || 'dark';

document.querySelector(":root").setAttribute("color-scheme", scheme);

function switch_theme() {
    scheme = cycle_theme(scheme);
    document.querySelector(":root").setAttribute("color-scheme", scheme);
    switcher.className = switcher.className.slice(0, 13) + schemes[scheme]
    localStorage.setItem('color-scheme', scheme)
}
