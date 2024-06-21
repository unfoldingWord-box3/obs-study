import { useTranslation } from 'react-i18next'

export function pad(num) {
  return String(num).padStart(2, "0");
}

export function warn(message) {
  const debug = false;
  if (debug) alert(message);
}

export function warnTranslate(message) {
  const t=useTranslation()
  const debug = false;
  if (debug) alert(t(message));
}
