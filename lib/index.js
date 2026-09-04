/**
 * dsh-theme-stardew — host half of the Stardew Valley theme.
 *
 * Intentionally a no-op: the theme is a browser-side client plugin
 * (package.json `dsh.client` → lib/client.js). This module exists so the
 * profile composition has a loader row for the package; the web host's
 * client-modules service scans loader entries for `dsh.client` declarations
 * and serves the browser bundle from there.
 *
 * @module dsh-theme-stardew
 */

/** Stable Cordis plugin name. */
export const name = 'stardew-theme'

/**
 * Mount nothing on the host; all theming happens in the browser.
 * @param ctx - plugin context (unused).
 */
export function apply(ctx) {
  ctx.logger?.debug?.('dsh-theme-stardew host row mounted (browser-side theme)')
}
