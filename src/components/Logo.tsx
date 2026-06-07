export function Logo({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? 'space-x-2' : 'space-x-3'}`}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#A855F7] via-[#D946EF] to-[#F472B6] opacity-30 blur-xl" />
        <span className="relative z-10 w-12 h-12 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#FB7185] shadow-xl shadow-[#C084FC]/20 flex items-center justify-center text-white">
          <svg viewBox="0 0 64 64" className="w-8 h-8">
            <defs>
              <linearGradient id="glow-flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FCD34D" />
              </linearGradient>
            </defs>
            <path d="M32 12C24 20 18 28 18 36c0 9.94 8.06 18 18 18s18-8.06 18-18c0-8-6-16-14-24-2.5 3-5.7 6.6-7 9-1.6-2.1-3.5-4.4-5-6z" fill="url(#glow-flow-gradient)" opacity="0.95" />
            <path d="M22 38c0-6 4-10 8-10s8 4 8 10c0 2-1 4-2.5 6.5C34 52 28 54 22 38z" fill="#FFFFFF" opacity="0.34" />
          </svg>
        </span>
      </div>
      <div className="leading-tight">
        <div className={`font-extrabold ${compact ? 'text-lg' : 'text-2xl'} text-slate-900`}>Glow <span className="text-[#A855F7]">&</span> Flow</div>
        {!compact && <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Salon & Spa</div>}
      </div>
    </div>
  );
}
