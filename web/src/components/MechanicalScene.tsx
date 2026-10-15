import styles from './MechanicalScene.module.css';
// Ilustración vectorial local: ninguna imagen ni fuente externa es necesaria.
export function MechanicalScene() {
    return <div className={styles.scene} aria-hidden="true">
    <div className={styles.orbit}/>
    <div className={styles.orbitSmall}/>
    <span className={styles.coordinate}>ENGINEERED FOR CONTROL / 01</span>
    <svg viewBox="0 0 700 420" className={styles.bike}>
    <defs>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
    <stop stopColor="#d4e5ed"/>
    <stop offset=".5" stopColor="#6f8499"/>
    <stop offset="1" stopColor="#26394c"/>
    </linearGradient>
    <linearGradient id="tank">
    <stop stopColor="#dcffab"/>
    <stop offset="1" stopColor="#82b963"/>
    </linearGradient>
    </defs>
    <ellipse cx="355" cy="354" rx="280" ry="18" fill="#000" opacity=".3"/>{[175, 535].map(cx => <g key={cx}>
        <circle cx={cx} cy="282" r="77" stroke="#07111d" strokeWidth="25" fill="#122131"/>
        <circle cx={cx} cy="282" r="63" stroke="#4d6478" strokeWidth="3" fill="none"/>
        <g className={styles.spokes} style={{ transformOrigin: `${cx}px 282px` }}>{Array.from({ length: 10 }, (_, i) => <line key={i} x1={cx} y1="282" x2={cx + 58 * Math.cos(i * Math.PI / 5)} y2={282 + 58 * Math.sin(i * Math.PI / 5)} stroke="#7b93a5" strokeWidth="3"/>)}</g>
        <circle cx={cx} cy="282" r="26" stroke="#a7bac5" strokeWidth="7" fill="#253c50"/>
        <circle cx={cx} cy="282" r="8" fill="#adcf86"/>
        </g>)}<path d="M175 282 L276 196 L351 282 Z M276 196 L431 204 L351 282 M351 282 L175 282" stroke="url(#metal)" strokeWidth="12" fill="none" strokeLinejoin="round"/>
    <path d="M431 150 L534 282 M451 154 L549 277" stroke="url(#metal)" strokeWidth="11"/>
    <path d="M421 128 L448 152 L462 144 L483 144" stroke="#b0c5ce" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <path d="M227 183 L250 157 L316 157 L348 186 L336 207 L278 207 Z" fill="url(#tank)"/>
    <path d="M249 164 L318 166" stroke="#e5ffc7" strokeWidth="3"/>
    <path d="M194 183 L255 183 L241 166 L196 156 L160 153" stroke="#8394a2" strokeWidth="7" fill="#1a2c3c"/>
    <path d="M163 150 L222 157 L241 173 L193 170 L153 163 Z" fill="#0a1421"/>
    <path d="M318 188 L353 154 L412 150 L432 178 L415 207 L350 207 Z" fill="url(#metal)"/>
    <path d="M363 161 L408 159 L420 177 L357 183 Z" fill="#dae6e9" opacity=".22"/>
    <path d="M445 166 L470 166 L477 183 L450 190" fill="#dfffaa"/>
    <path d="M269 223 L319 214 L352 237 L344 278 L287 278 L269 256 Z" fill="#3b5266" stroke="#8b9eaa" strokeWidth="2"/>{[230, 239, 248, 257].map(y => <path key={y} d={`M279 ${y} L329 ${y}`} stroke="#9faeb9" strokeWidth="3"/>)}<path d="M341 263 Q397 305 432 295 L475 280" stroke="#72899c" strokeWidth="12" fill="none"/>
    <path d="M390 299 L471 282" stroke="#d0dde4" strokeWidth="19" strokeLinecap="round"/>
    <path d="M118 208 Q165 182 218 213 M479 214 Q531 185 583 215" stroke="#9fb58a" strokeWidth="7" fill="none"/>
    <path d="M256 195 L244 238" stroke="#b5e281" strokeWidth="8"/>
    <path d="M251 197 L239 235" stroke="#eee" strokeDasharray="3 4" strokeWidth="4"/>
    <text x="360" y="191" fill="#152b3b" fontSize="10" fontFamily="sans-serif" fontWeight="700">MR / PRO</text>
    <path d="M100 370 H600" stroke="#62768a" strokeDasharray="3 9" opacity=".4"/>
    <path d="M175 375 V397 M535 375 V397 M175 391 H535" stroke="#566c7f" strokeWidth="1"/>
    <text x="310" y="410" fill="#879db0" fontSize="9" letterSpacing="3">PRECISION IN EVERY PART</text>
    </svg>
    <div className={styles.tag}>
    <i /> SISTEMA CENTRALIZADO <span>WEB · APP · DESKTOP</span>
    </div>
    </div>;
}
