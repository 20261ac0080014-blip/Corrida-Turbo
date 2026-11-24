interface ArtProps {
  className?: string;
}

/**
 * Ilustração principal do Relâmpago McQueen (#95) estilizado em SVG vetorial nítido.
 */
export function McQueenHeroArt({ className = '' }: ArtProps) {
  return (
    <svg
      viewBox="0 0 360 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Relâmpago McQueen número 95 pronto para a corrida"
    >
      <defs>
        <linearGradient id="mqBody" x1="40" y1="50" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3B30" />
          <stop offset="55%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="mqBolt" x1="85" y1="95" x2="255" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="mqGlow" x1="0" y1="160" x2="360" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
          <stop offset="50%" stopColor="#EF4444" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sombra e brilho no asfalto */}
      <ellipse cx="182" cy="168" rx="145" ry="18" fill="#000000" fillOpacity="0.65" />
      <ellipse cx="182" cy="166" rx="128" ry="10" fill="url(#mqGlow)" />

      {/* Linhas de velocidade atrás */}
      <path d="M12 108H52" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M4 124H42" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M18 140H48" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

      {/* Aerofólio traseiro */}
      <path d="M42 66L76 72L66 94H38L42 66Z" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />
      <path d="M38 66L78 72" stroke="#FCA5A5" strokeWidth="2" strokeLinecap="round" />

      {/* Carroceria esportiva vermelha */}
      <path
        d="M48 136C44 106 60 88 94 84L132 48C144 38 164 34 198 36L252 76L308 86C328 90 338 106 336 126C335 140 326 148 312 148H62C52 148 49 142 48 136Z"
        fill="url(#mqBody)"
      />

      {/* Brilho superior da lataria */}
      <path
        d="M138 50C150 41 170 38 196 40L244 74"
        stroke="#FCA5A5"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Para-brisa com olhos expressivos do McQueen */}
      <path
        d="M140 52L196 44L238 78L130 82L140 52Z"
        fill="#F8FAFC"
        stroke="#1E293B"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Pálpebra superior confiante */}
      <path d="M138 52L196 44L214 57L135 61L138 52Z" fill="#DC2626" />
      {/* Olhos azuis brilhantes */}
      <ellipse cx="164" cy="68" rx="13" ry="11" fill="#FFFFFF" />
      <ellipse cx="198" cy="67" rx="13" ry="11" fill="#FFFFFF" />
      <circle cx="167" cy="68" r="6.5" fill="#0284C7" />
      <circle cx="201" cy="67" r="6.5" fill="#0284C7" />
      <circle cx="168" cy="68" r="3.2" fill="#0F172A" />
      <circle cx="202" cy="67" r="3.2" fill="#0F172A" />
      <circle cx="165" cy="65" r="1.8" fill="#FFFFFF" />
      <circle cx="199" cy="64" r="1.8" fill="#FFFFFF" />

      {/* Raio dourado na lateral */}
      <path
        d="M72 114L154 96L138 114L242 98L142 136L158 118L72 114Z"
        fill="url(#mqBolt)"
      />

      {/* Número 95 */}
      <text
        x="176"
        y="124"
        fill="#FACC15"
        stroke="#7F1D1D"
        strokeWidth="2.5"
        paintOrder="stroke"
        fontFamily="Outfit, sans-serif"
        fontWeight="900"
        fontSize="30"
        fontStyle="italic"
      >
        95
      </text>

      {/* Farol dianteiro e sorriso no para-choque */}
      <path d="M294 94L322 97C328 100 329 107 324 111L296 108L294 94Z" fill="#FEF08A" />
      <path
        d="M276 126C290 132 308 131 322 123"
        stroke="#FFFFFF"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M278 128C291 133 307 132 320 125"
        stroke="#0F172A"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Rodas dianteira e traseira */}
      <g>
        <circle cx="104" cy="148" r="24" fill="#18181B" stroke="#E4E4E7" strokeWidth="3" />
        <circle cx="104" cy="148" r="13" fill="#EF4444" />
        <circle cx="104" cy="148" r="5" fill="#FACC15" />
      </g>
      <g>
        <circle cx="268" cy="148" r="24" fill="#18181B" stroke="#E4E4E7" strokeWidth="3" />
        <circle cx="268" cy="148" r="13" fill="#EF4444" />
        <circle cx="268" cy="148" r="5" fill="#FACC15" />
      </g>
    </svg>
  );
}

/**
 * Figurinha colecionável estilo adesivo vinil do McQueen (#95) com borda branca!
 */
export function McQueenStickerBadge({ className = '' }: ArtProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Figurinha colecionável do Relâmpago McQueen 95"
    >
      <defs>
        <linearGradient id="stRed" x1="40" y1="60" x2="200" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3B30" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <filter id="stickerShadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Base branca de figurinha recortada (die-cut) */}
      <g filter="url(#stickerShadow)">
        <circle cx="120" cy="120" r="102" fill="#FFFFFF" />
        <circle cx="120" cy="120" r="95" fill="#18181B" />
        <circle cx="120" cy="120" r="90" stroke="#FACC15" strokeWidth="3" strokeDasharray="8 6" />
      </g>

      {/* Bandeiras quadriculadas cruzadas atrás */}
      <g opacity="0.9">
        <path d="M54 58L94 94" stroke="#E4E4E7" strokeWidth="4" strokeLinecap="round" />
        <rect x="44" y="42" width="26" height="18" rx="3" transform="rotate(-18 44 42)" fill="#FFFFFF" />
        <rect x="47" y="44" width="8" height="7" transform="rotate(-18 47 44)" fill="#18181B" />
        <rect x="59" y="48" width="8" height="7" transform="rotate(-18 59 48)" fill="#18181B" />

        <path d="M186 58L146 94" stroke="#E4E4E7" strokeWidth="4" strokeLinecap="round" />
        <rect x="168" y="34" width="26" height="18" rx="3" transform="rotate(18 168 34)" fill="#FFFFFF" />
        <rect x="171" y="37" width="8" height="7" transform="rotate(18 171 37)" fill="#18181B" />
        <rect x="181" y="45" width="8" height="7" transform="rotate(18 181 45)" fill="#18181B" />
      </g>

      {/* Estrelinhas douradas */}
      <path d="M120 34L124 43L134 44L126 51L128 60L120 55L112 60L114 51L106 44L116 43L120 34Z" fill="#FACC15" />
      <circle cx="48" cy="128" r="4" fill="#FACC15" />
      <circle cx="192" cy="126" r="4" fill="#FACC15" />

      {/* McQueen empinando divertido no centro */}
      <g transform="translate(18, 22) rotate(-5 102 108)">
        {/* Aerofólio */}
        <path d="M24 88L46 92L40 107H20L24 88Z" fill="#991B1B" />
        {/* Corpo vermelho */}
        <path
          d="M28 134C26 112 38 100 62 98L88 74C96 67 110 64 134 66L170 92L200 98C212 101 218 112 216 126C215 136 208 142 198 142H38C30 142 29 138 28 134Z"
          fill="url(#stRed)"
        />
        {/* Para-brisa + olhos alegres */}
        <path d="M92 76L132 71L160 93L86 96L92 76Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2.5" />
        <path d="M91 76L132 71L142 80L88 83L91 76Z" fill="#DC2626" />
        <circle cx="110" cy="87" r="6.5" fill="#0284C7" />
        <circle cx="134" cy="86" r="6.5" fill="#0284C7" />
        <circle cx="111" cy="87" r="3" fill="#0F172A" />
        <circle cx="135" cy="86" r="3" fill="#0F172A" />
        <circle cx="109" cy="85" r="1.5" fill="#FFFFFF" />
        <circle cx="133" cy="84" r="1.5" fill="#FFFFFF" />

        {/* Raio amarelo */}
        <path d="M46 118L102 105L92 118L158 108L94 133L106 120L46 118Z" fill="#FACC15" />

        {/* Número 95 */}
        <text
          x="114"
          y="126"
          fill="#FACC15"
          stroke="#7F1D1D"
          strokeWidth="2"
          paintOrder="stroke"
          fontFamily="Outfit, sans-serif"
          fontWeight="900"
          fontSize="22"
          fontStyle="italic"
        >
          95
        </text>

        {/* Sorriso */}
        <path d="M180 124C190 128 202 127 209 121" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

        {/* Rodas */}
        <circle cx="66" cy="142" r="16" fill="#18181B" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="66" cy="142" r="8" fill="#EF4444" />
        <circle cx="176" cy="142" r="16" fill="#18181B" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="176" cy="142" r="8" fill="#EF4444" />
      </g>

      {/* Faixa inferior "KATCHAU!" */}
      <rect x="46" y="168" width="148" height="32" rx="16" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3" />
      <text
        x="120"
        y="190"
        textAnchor="middle"
        fill="#FEF08A"
        fontFamily="Outfit, sans-serif"
        fontWeight="900"
        fontSize="16"
        letterSpacing="1"
      >
        KATCHAU! #95
      </text>
    </svg>
  );
}

/**
 * Carrinho compacto para a pista multi-faixas (personalizável por cor e número).
 */
export function TrackCarSvg({
  bodyColor,
  stripeColor,
  numberLabel,
  className = '',
}: {
  bodyColor: string;
  stripeColor: string;
  numberLabel: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Fogo do escapamento */}
      <path d="M1 19L10 16V22L1 19Z" fill={stripeColor} />
      {/* Carroceria */}
      <path
        d="M11 22C11 16.5 14.5 14 21 13L29 6.5C31.5 5 35.5 4.5 42 5L52 12L63 14.5C66.5 15.3 68 17.8 68 20.5V23.5C68 24.8 66.8 25.5 65.4 25.5H13C11.8 25.5 11 24.4 11 22Z"
        fill={bodyColor}
      />
      {/* Aerofólio */}
      <path d="M10 10L17 10.5L15 14H10V10Z" fill={bodyColor} opacity="0.85" />
      {/* Para-brisa com olhos */}
      <path d="M30 7.5L41 7.8L49 13H28L30 7.5Z" fill="#F8FAFC" />
      <circle cx="35" cy="10.4" r="1.5" fill="#0F172A" />
      <circle cx="42" cy="10.4" r="1.5" fill="#0F172A" />
      {/* Faixa */}
      <path d="M22 18.5L36 16L33 19L46 17.5L31 22L34 19.2L22 18.5Z" fill={stripeColor} />
      {/* Número */}
      <text
        x="43"
        y="22.5"
        fill="#FFFFFF"
        fontFamily="Outfit, sans-serif"
        fontWeight="900"
        fontSize="8.5"
      >
        {numberLabel}
      </text>
      {/* Rodas */}
      <circle cx="22" cy="25.5" r="5" fill="#18181B" stroke="#E4E4E7" strokeWidth="1.5" />
      <circle cx="22" cy="25.5" r="1.8" fill={stripeColor} />
      <circle cx="55" cy="25.5" r="5" fill="#18181B" stroke="#E4E4E7" strokeWidth="1.5" />
      <circle cx="55" cy="25.5" r="1.8" fill={stripeColor} />
    </svg>
  );
}
