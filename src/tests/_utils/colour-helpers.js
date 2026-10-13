// Parse a colour contrast ratio as a float
export function parseRequiredRatio (minRatio) {
  const required = Number.parseFloat(String(minRatio).split(":")[0]);
  return required;
}

/**
 * Get computed foreground and background colours from an element by evaluating the browser.
 *
 * @param {import("playwright").Locator} locator - Playwright locator for the target element
 * @param {Object} [options]
 * @param {string|null} [options.pseudo=null] - CSS pseudo element selector (e.g. "::before")
 *
 * @returns {Promise<{
 *   foreground: {
 *     raw: string,
 *     parsed: {r: number, g: number, b: number, a: number}|null,
 *     rendered: {r: number, g: number, b: number, a: number}|null,
 *     type: "text"|"border"
 *   },
 *   background: {
 *     raw: string,
 *     effective: {r: number, g: number, b: number, a: number}
 *   }
 * }>}
 */
export async function getColours (locator, options) {
  const { pseudo = null } = options || {};
  return locator.first().evaluate(
    (element, pseudoArg) => {
      // -- Browser-context helpers --

      function cssColorToRgba (colour) {
        if (!colour) return null;

        const ctx = document.createElement("canvas").getContext("2d");
        const sentinel = "rgba(1, 2, 3, 0.4)";
        ctx.fillStyle = sentinel;
        ctx.fillStyle = colour;

        if (ctx.fillStyle === sentinel) return null;

        const hex = ctx.fillStyle.match(/^#([0-9a-f]{6})$/i);
        if (hex) {
          const h = hex[1];
          return {
            r: parseInt(h.slice(0, 2), 16),
            g: parseInt(h.slice(2, 4), 16),
            b: parseInt(h.slice(4, 6), 16),
            a: 1
          };
        }

        const rgbOld = ctx.fillStyle.match(
          /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/
        );
        if (rgbOld) {
          return {
            r: parseInt(rgbOld[1], 10),
            g: parseInt(rgbOld[2], 10),
            b: parseInt(rgbOld[3], 10),
            a: rgbOld[4] === undefined ? 1 : parseFloat(rgbOld[4])
          };
        }

        const rgbNew = ctx.fillStyle.match(
          /^rgba?\((\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*([\d.]+))?\)$/
        );
        if (rgbNew) {
          return {
            r: parseInt(rgbNew[1], 10),
            g: parseInt(rgbNew[2], 10),
            b: parseInt(rgbNew[3], 10),
            a: rgbNew[4] === undefined ? 1 : parseFloat(rgbNew[4])
          };
        }

        return null;
      }

      function composite (fg, bg) {
        const a = fg.a + bg.a * (1 - fg.a);
        if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
        return {
          r: Math.round((fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a),
          g: Math.round((fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a),
          b: Math.round((fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a),
          a
        };
      }

      function getDocumentBackground () {
        const bodyBg = cssColorToRgba(getComputedStyle(document.body).backgroundColor);
        if (bodyBg && bodyBg.a > 0) return bodyBg;

        const htmlBg = cssColorToRgba(getComputedStyle(document.documentElement).backgroundColor);
        if (htmlBg && htmlBg.a > 0) return htmlBg;

        return { r: 255, g: 255, b: 255, a: 1 };
      }

      function getEffectiveBackground (el) {
        let current = el;
        let effectiveBg = getDocumentBackground();

        while (current) {
          const cs = getComputedStyle(current);
          const bgColour = cssColorToRgba(cs.backgroundColor);

          if (bgColour && bgColour.a > 0) {
            effectiveBg = composite(bgColour, effectiveBg);
            if (effectiveBg.a >= 1) break;
          }

          current = current.parentElement;
        }

        return effectiveBg;
      }

      // Foreground colour detection
      const cs = pseudoArg ? getComputedStyle(element, pseudoArg) : getComputedStyle(element);

      // Detect whether the foreground is a border colour or text colour
      let foregroundType = "text";
      let rawFg = cs.color;

      if (pseudoArg) {
        const borderWidths = {
          top: parseFloat(cs.borderTopWidth) || 0,
          right: parseFloat(cs.borderRightWidth) || 0,
          bottom: parseFloat(cs.borderBottomWidth) || 0,
          left: parseFloat(cs.borderLeftWidth) || 0
        };
        const hasBorder = borderWidths.top > 0 || borderWidths.right > 0 || borderWidths.bottom > 0 || borderWidths.left > 0;

        if (hasBorder && cs.borderStyle !== "none") {
          foregroundType = "border";
          // Pick the colour from the first non-zero border side found
          if (borderWidths.right > 0) rawFg = cs.borderRightColor;
          else if (borderWidths.left > 0) rawFg = cs.borderLeftColor;
          else if (borderWidths.top > 0) rawFg = cs.borderTopColor;
          else if (borderWidths.bottom > 0) rawFg = cs.borderBottomColor;
        }
      }

      const parsedFg = cssColorToRgba(rawFg);

      // Background colour detection
      const effectiveBg = getEffectiveBackground(element);
      const renderedFg = parsedFg ? composite(parsedFg, effectiveBg) : null;

      // Build result
      return {
        foreground: {
          raw: rawFg,
          parsed: parsedFg,
          rendered: renderedFg,
          type: foregroundType
        },
        background: {
          raw: cs.backgroundColor,
          effective: effectiveBg
        }
      };
    },
    pseudo
  );
}
