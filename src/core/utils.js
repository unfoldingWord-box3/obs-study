import i18n from '../constants/i18n'

export function pad (num) {
  return String(num).padStart(2, "0");
}

export function warnTranslate(message) {
  const debug = false;
  if (debug) alert(i18n.t(message));
}

export function warn (message) {
  const debug = false;
  if (debug) alert(message);
}