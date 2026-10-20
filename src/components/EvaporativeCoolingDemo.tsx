import React, { useState } from 'react';
import { Thermometer, Droplets, Wind, ZapOff, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EvaporativeCoolingDemo: React.FC = () => {
  const { ui } = useLanguage();
  const [ambientTemp, setAmbientTemp] = useState<number>(40);
  const [showPores, setShowPores] = useState<boolean>(true);
  const [activeMaterial, setActiveMaterial] = useState<'clay' | 'plastic' | 'steel'>('clay');

  // Realistic thermodynamics of evaporative cooling
  // In hot dry summer air, evaporation rate increases, naturally cooling water by 5-10°C
  const coolingDelta = Math.round(5 + (ambientTemp - 25) * 0.45);
  const clayWaterTemp = Math.max(19, ambientTemp - coolingDelta);
  const plasticWaterTemp = Math.round(ambientTemp - 1);
  const steelWaterTemp = Math.round(ambientTemp + 1);

  const currentWaterTemp =
    activeMaterial === 'clay'
      ? clayWaterTemp
      : activeMaterial === 'plastic'
      ? plasticWaterTemp
      : steelWaterTemp;

  return (
    <div className="mt-8 rounded-3xl border border-[#B8582B]/35 bg-gradient-to-b from-[#181310] via-[#221813] to-[#181310] p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-[#E5A344]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5A344]">
            {ui.coolingExtras.badge}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-mono font-bold text-emerald-300">
            <ZapOff className="h-3 w-3 text-emerald-400" />
            <span>{ui.coolingExtras.zeroWatts}</span>
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left: Vessel Graphic with True Container Shapes (6 cols) */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-black/60 to-black/30 p-6 lg:col-span-6 overflow-hidden min-h-[340px]">
          {/* Subtle Ambient Thermal Heat Glow */}
          <div
            className={`pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full blur-3xl transition-colors duration-500 ${
              activeMaterial === 'clay' ? 'bg-sky-500/15' : 'bg-red-500/15'
            }`}
          />

          {/* SVG Diagram with Dedicated Shapes for Clay Matka, Plastic Bottle, and Steel Flask */}
          <div className="relative flex flex-col items-center">
            {/* CONTAINER 1: Traditional Earthen Matka */}
            {activeMaterial === 'clay' && (
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                className="drop-shadow-2xl transition-all duration-300"
                aria-label="Cross-section diagram of an authentic earthen Matka cooling water"
              >
                <defs>
                  <linearGradient id="coolWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="0.95" />
                  </linearGradient>
                  <radialGradient id="coolingAura" cx="50%" cy="50%" r="50%">
                    <stop offset="65%" stopColor="#38BDF8" stopOpacity="0" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
                  </radialGradient>
                </defs>

                {/* Soft Cooling Aura Ring */}
                <circle cx="110" cy="130" r="82" fill="url(#coolingAura)" className="animate-pulse" />

                {/* Chilled Blue Water Core */}
                <ellipse cx="110" cy="136" rx="60" ry="48" fill="url(#coolWaterGrad)" />

                {/* Authentic Spherical Matka Outline */}
                <path
                  d="M74 52 C88 48 132 48 146 52 C152 60 146 68 138 72 C165 90 184 116 180 144 C174 176 146 188 110 188 C74 188 46 176 40 144 C36 116 55 90 82 72 C74 68 68 60 74 52 Z"
                  fill="none"
                  stroke="#D86D3D"
                  strokeWidth={showPores ? '10' : '8'}
                  strokeDasharray={showPores ? '4 3' : 'none'}
                />

                {/* Flared Mouth Lip */}
                <ellipse cx="110" cy="54" rx="34" ry="7" fill="#1C1410" stroke="#E5A344" strokeWidth="2.5" />

                {/* Soft Rising Evaporative Vapor Mist Waves (Appropriate, NOT water spilling) */}
                <g className="opacity-75">
                  <path
                    d="M50 120 Q40 100 48 80 T42 50"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-pulse"
                  />
                  <path
                    d="M170 120 Q180 100 172 80 T178 50"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-pulse delay-150"
                  />
                  <path
                    d="M110 40 Q105 28 110 16"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="animate-pulse delay-300"
                  />
                </g>
              </svg>
            )}

            {/* CONTAINER 2: Real Plastic Water Bottle Shape */}
            {activeMaterial === 'plastic' && (
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                className="drop-shadow-2xl transition-all duration-300"
                aria-label="Diagram of a ribbed plastic mineral water bottle trapping heat"
              >
                <defs>
                  <linearGradient id="warmWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F87171" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Bottle Cap */}
                <rect x="98" y="24" width="24" height="14" rx="2" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
                {/* Bottle Neck */}
                <rect x="101" y="38" width="18" height="12" fill="#0F172A" stroke="#2DD4BF" strokeWidth="2" />

                {/* Trapped Warm Water */}
                <path
                  d="M74 86 Q72 110 74 130 Q72 150 74 175 Q110 185 146 175 Q148 150 146 130 Q148 110 146 86 Z"
                  fill="url(#warmWaterGrad)"
                />

                {/* Plastic Bottle Ergonomic Ribbed Silhouette */}
                <path
                  d="M101 50 C86 58 72 70 72 88 L75 106 L71 114 L75 126 L71 134 L75 152 L72 178 C72 184 84 188 110 188 C136 188 148 184 148 178 L145 152 L149 134 L145 126 L149 114 L145 106 L148 88 C148 70 134 58 119 50 Z"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="3.5"
                  className="drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]"
                />

                {/* Plastic Mold Grip Ribs */}
                <line x1="75" y1="110" x2="145" y2="110" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.6" />
                <line x1="75" y1="130" x2="145" y2="130" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.6" />

                {/* Heat Trapped Symbol */}
                <g className="animate-pulse">
                  <path d="M100 110 Q110 120 100 130" fill="none" stroke="#F87171" strokeWidth="2" />
                  <path d="M120 110 Q110 120 120 130" fill="none" stroke="#F87171" strokeWidth="2" />
                </g>
              </svg>
            )}

            {/* CONTAINER 3: Real Stainless Steel Insulated Flask Shape */}
            {activeMaterial === 'steel' && (
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                className="drop-shadow-2xl transition-all duration-300"
                aria-label="Diagram of a cylindrical stainless steel flask absorbing heat"
              >
                <defs>
                  <linearGradient id="steelBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="35%" stopColor="#94A3B8" />
                    <stop offset="55%" stopColor="#E2E8F0" />
                    <stop offset="80%" stopColor="#64748B" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
                  <linearGradient id="stagnantWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FB923C" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#EA580C" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Stainless Steel Cap */}
                <rect x="94" y="24" width="32" height="16" rx="3" fill="#64748B" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="94" y1="32" x2="126" y2="32" stroke="#94A3B8" strokeWidth="1" />

                {/* Flask Neck Collar */}
                <rect x="98" y="40" width="24" height="10" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />

                {/* Water Core Inside Steel Container */}
                <rect x="80" y="72" width="60" height="104" rx="4" fill="url(#stagnantWaterGrad)" />

                {/* Cylindrical Sleek Steel Body (Double Wall Outline) */}
                <rect
                  x="74"
                  y="50"
                  width="72"
                  height="134"
                  rx="6"
                  fill="none"
                  stroke="url(#steelBodyGrad)"
                  strokeWidth="5"
                  className="drop-shadow-[0_0_10px_rgba(203,213,225,0.25)]"
                />

                {/* Metallic Reflection Stripe */}
                <line x1="114" y1="54" x2="114" y2="180" stroke="#FFFFFF" strokeWidth="2" opacity="0.45" />

                {/* Heat Conduction Rays Entering Steel Wall */}
                <g className="animate-pulse">
                  <path d="M54 100 L68 100" stroke="#F97316" strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M54 130 L68 130" stroke="#F97316" strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M166 100 L152 100" stroke="#F97316" strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M166 130 L152 130" stroke="#F97316" strokeWidth="2" strokeDasharray="3 2" />
                </g>
              </svg>
            )}

            {/* Vessel Label */}
            <div className="mt-3 text-center">
              <span className="font-display text-sm font-bold text-[#FAF5F0]">
                {activeMaterial === 'clay'
                  ? ui.coolingExtras.matkaTitle
                  : activeMaterial === 'plastic'
                  ? ui.coolingExtras.plasticTitle
                  : ui.coolingExtras.steelTitle}
              </span>
              <span className="block font-mono text-[11px] text-[#D8C7B8] mt-0.5">
                {activeMaterial === 'clay'
                  ? ui.coolingExtras.matkaSub
                  : activeMaterial === 'plastic'
                  ? ui.coolingExtras.plasticSub
                  : ui.coolingExtras.steelSub}
              </span>
            </div>
          </div>

          {/* Micro-Pore Toggle (For Clay) */}
          {activeMaterial === 'clay' && (
            <button
              onClick={() => setShowPores(!showPores)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#E5A344]/40 bg-black/60 px-3.5 py-1 text-[11px] font-mono font-semibold text-amber-300 transition-all hover:bg-[#E5A344] hover:text-black"
            >
              <Wind className="h-3 w-3" />
              <span>{showPores ? ui.coolingExtras.microPoresOn : ui.coolingExtras.microPoresOff}</span>
            </button>
          )}
        </div>

        {/* Right: Thermal Simulator Controls (6 cols) */}
        <div className="flex flex-col justify-between lg:col-span-6 space-y-4">
          {/* Material Comparison Selector */}
          <div>
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#E5A344] mb-2">
              {ui.coolingExtras.selectMaterial}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'clay', label: ui.coolingExtras.clay.label, note: ui.coolingExtras.clay.note },
                { id: 'plastic', label: ui.coolingExtras.plastic.label, note: ui.coolingExtras.plastic.note },
                { id: 'steel', label: ui.coolingExtras.steel.label, note: ui.coolingExtras.steel.note },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMaterial(m.id as 'clay' | 'plastic' | 'steel')}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                    activeMaterial === m.id
                      ? 'border-[#E5A344] bg-[#B8582B]/25 text-amber-300 font-bold shadow-lg scale-102'
                      : 'border-white/10 bg-black/30 text-[#D8C7B8] hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-sans font-semibold">{m.label}</span>
                  <span className="text-[10px] font-mono text-[#D8C7B8]/70 mt-0.5">{m.note}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ambient Heat Slider */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5">
            <div className="flex items-center justify-between text-xs font-mono text-[#D8C7B8] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Thermometer className="h-4 w-4 text-[#F59E0B]" />
                <span>{ui.coolingExtras.summerTemp}</span>
              </span>
              <span className="font-bold text-sm text-[#F59E0B]">{ambientTemp}°C</span>
            </div>
            <input
              type="range"
              min="28"
              max="46"
              step="1"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(parseInt(e.target.value, 10))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#E5A344]"
              aria-label="Outdoor ambient temperature slider"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#D8C7B8]/60 mt-1">
              <span>28°C</span>
              <span>38°C</span>
              <span>46°C</span>
            </div>
          </div>

          {/* Temperature Comparison Readout */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-white/10 bg-black/40 p-3">
              <p className="text-[10px] font-mono uppercase text-[#D8C7B8]">{ui.coolingExtras.outsideAir}</p>
              <p className="font-display text-2xl font-bold text-orange-400 mt-0.5">{ambientTemp}°C</p>
            </div>

            <div
              className={`rounded-xl border p-3 ${
                activeMaterial === 'clay'
                  ? 'border-sky-400/40 bg-sky-950/40 text-sky-300'
                  : 'border-red-500/40 bg-red-950/40 text-red-300'
              }`}
            >
              <p className="text-[10px] font-mono uppercase font-bold">{ui.coolingExtras.waterInside}</p>
              <p className="font-display text-2xl font-bold mt-0.5">{currentWaterTemp}°C</p>
            </div>
          </div>

          {/* Concise Scientific Fact */}
          <div className="rounded-2xl bg-black/40 p-3.5 border border-white/10 text-xs text-[#D8C7B8] leading-relaxed flex items-start gap-2.5">
            {activeMaterial === 'clay' ? (
              <>
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-amber-300">{ui.coolingExtras.clay.label}:</strong> {ui.coolingExtras.clay.fact}
                </p>
              </>
            ) : activeMaterial === 'plastic' ? (
              <>
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-red-300">{ui.coolingExtras.plastic.label}:</strong> {ui.coolingExtras.plastic.fact}
                </p>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-orange-300">{ui.coolingExtras.steel.label}:</strong> {ui.coolingExtras.steel.fact}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
