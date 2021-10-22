
export function getCookieData (name) {
  if (!name) { console.error('Failed to getCookieData: No name provided'); return; }
  if (!document) { console.error('Failed to getCookieData: No access to the document object'); return; }

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match && match[2]) {
    const cookieData = decodeURIComponent(match[2]);
    return JSON.parse(cookieData);
  }
}

export function getCookieDataUnparsed (name) {
  if (!name) { console.error('Failed to getCookieDataUnparsed: No name provided'); return; }
  if (!document) { console.error('Failed to getCookieDataUnparsed: No access to the document object'); return; }

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match && match[2]) {
    return match[2];
  } else {
    return null;
  }
}

export function setCookie (name, value, domain) {
  if (!name) { console.error('Failed to setCookie: No name provided'); return; }
  if (!document) { console.error('Failed to setCookie: No access to the document object'); return; }

  const date = new Date();
  date.setHours(date.getHours() + 1);
  const expires = ` expires=${date.toUTCString()};`;
  const cookieDomain = domain ? ` domain=${domain};` : '';
  document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + '; path=/ ;' + expires + cookieDomain;
}

export function setCookieUnparsed (name, value) {
  if (!name) { console.error('Failed to setCookieUnparsed: No name provided'); return; }
  if (!document) { console.error('Failed to setCookieUnparsed: No access to the document object'); return; }

  const date = new Date();
  date.setHours(date.getHours() + 1);
  const expires = ' expires=' + date.toUTCString() + ';';
  document.cookie = name + '=' + value + '; path=/ ;' + expires;
}

export function deleteCookie (name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}
