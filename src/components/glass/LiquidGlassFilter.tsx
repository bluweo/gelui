/**
 * LiquidGlassFilter — Hidden SVG filter definitions for liquid glass effects.
 *
 * Injects multiple SVG filters into the DOM that components can reference:
 *   - `liquid-glass-noise`    → subtle frosted-glass noise texture
 *   - `liquid-glass-glow`     → soft inner glow / specular highlight
 *   - `liquid-glass-thumb`    → composite filter for slider thumbs (noise + specular + blur)
 *   - `liquid-glass-panel`    → composite filter for glass panels
 *   - `glass-refraction`      → feDisplacementMap lens distortion for gel glass cards
 *
 * Works in all major browsers (Chrome, Firefox, Safari).
 * SVG feDisplacementMap refraction is Chrome/Edge only — kept as progressive enhancement.
 */

export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* ─── Noise Texture Filter ─── */}
        <filter id="liquid-glass-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
          <feComponentTransfer in="grayNoise" result="softNoise">
            <feFuncA type="linear" slope="0.06" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="softNoise" mode="overlay" />
        </filter>

        {/* ─── Specular Lighting Filter ─── */}
        <filter id="liquid-glass-specular" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blurred" />
          <feSpecularLighting
            in="blurred"
            surfaceScale="5"
            specularConstant="0.75"
            specularExponent="20"
            lightingColor="#ffffff"
            result="specular"
          >
            <fePointLight x="50" y="-30" z="120" />
          </feSpecularLighting>
          <feComposite
            in="specular"
            in2="SourceAlpha"
            operator="in"
            result="specularCut"
          />
          <feComposite
            in="SourceGraphic"
            in2="specularCut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="0.4"
            k4="0"
          />
        </filter>

        {/* ─── Glass Panel Composite ───
             Combines noise + specular for glass panels */}
        <filter id="liquid-glass-panel" x="-5%" y="-5%" width="110%" height="110%">
          {/* Step 1: subtle noise overlay */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
          <feComponentTransfer in="grayNoise" result="softNoise">
            <feFuncA type="linear" slope="0.035" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="softNoise" mode="overlay" result="noisy" />

          {/* Step 2: soft specular highlight from top-left */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="alphaBlur" />
          <feSpecularLighting
            in="alphaBlur"
            surfaceScale="3"
            specularConstant="0.5"
            specularExponent="25"
            lightingColor="#ffffff"
            result="spec"
          >
            <fePointLight x="80" y="-50" z="150" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specClip" />
          <feComponentTransfer in="specClip" result="specFade">
            <feFuncA type="linear" slope="0.25" />
          </feComponentTransfer>
          <feComposite in="noisy" in2="specFade" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>

        {/* ─── Thumb Glass Filter ───
             Enhanced specular for small circular elements like slider thumbs */}
        <filter id="liquid-glass-thumb" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feComponentTransfer in="grayNoise" result="softNoise">
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="softNoise" mode="overlay" result="noisy" />

          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="alphaBlur" />
          <feSpecularLighting
            in="alphaBlur"
            surfaceScale="8"
            specularConstant="1.0"
            specularExponent="30"
            lightingColor="#ffffff"
            result="spec"
          >
            <fePointLight x="30" y="-20" z="80" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specClip" />
          <feComponentTransfer in="specClip" result="specFade">
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feComposite in="noisy" in2="specFade" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>

        {/* ─── Gel Glass Refraction (feDisplacementMap) ───
             Applied via backdrop-filter: url(#glass-refraction) on gel-glass cards.
             Creates lens-like pixel displacement of the backdrop.
             Low baseFrequency + single octave → smooth, convex-lens distortion
             (not chaotic water noise). Chrome/Edge only — fallback in Firefox/Safari. */}
        <filter id="glass-refraction" x="-5%" y="-5%" width="110%" height="110%">
          {/* Step 1: Ultra-subtle pre-blur for smooth refraction */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="softBlur" />
          {/* Step 2: Low-frequency smooth noise — mimics a shaped lens gradient */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.008"
            numOctaves="1"
            seed="4"
            result="turbulence"
          />
          {/* Step 3: Displace with moderate scale for visible but smooth refraction */}
          <feDisplacementMap
            in="softBlur"
            in2="turbulence"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ─── Inline Noise Texture (for CSS background-image usage) ─── */}
        <filter id="liquid-glass-noise-only" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </defs>
    </svg>
  );
}
