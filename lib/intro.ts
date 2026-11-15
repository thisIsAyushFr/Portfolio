/**
 * Runs before React, so a returning visitor (or anyone with reduced motion)
 * never sees the loader flash. It sets <html data-intro="skip">, which CSS
 * uses to hide the loader and `introDelay()` uses to skip the wait.
 *
 * Kept in a plain module (no "use client") so the server layout can inline it.
 */
export const INTRO_SCRIPT = `try{if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;
