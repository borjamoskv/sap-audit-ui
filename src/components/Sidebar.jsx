import { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Database, 
  TerminalSquare,
  Zap,
  ChevronRight
} from 'lucide-react';

const items = [
  { icon: Activity, label: 'Overview', id: 'overview' },
  { icon: TerminalSquare, label: 'TOM Engine', id: 'tom' },
  { icon: ShieldAlert, label: 'OLIVER Impact', id: 'oliver' },
  { icon: Database, label: 'Ledger Audit', id: 'ledger' },
];

export default function Sidebar({ active = 'overview', onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <aside className="w-[260px] h-full bg-gradient-to-b from-[#0c0c0c] to-[#080808] border-r border-[#161616] flex flex-col pt-6 pb-5 px-4 shadow-[4px_0_40px_rgba(0,0,0,0.7)] animate-fade-in-left relative overflow-hidden">
      {/* Subtle scan line */}
      <div className="scan-overlay absolute inset-0 pointer-events-none z-0"></div>

      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-12 z-10">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ccff00] to-[#99cc00] flex items-center justify-center text-[#0a0a0a] font-black text-sm shadow-[0_0_20px_rgba(204,255,0,0.2)]">
          <Zap size={18} strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-gray-100 font-bold tracking-wider text-sm uppercase">CORTEX Audit</h1>
          <p className="text-gray-600 text-[10px] font-mono tracking-widest">MOSKV-1 · v5.0</p>
        </div>
      </div>

      {/* Section label */}
      <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em] px-3 mb-3 z-10">Módulos</p>

      {/* Nav */}
      <nav className="flex-1 space-y-1 z-10">
        {items.map((item, idx) => {
          const isActive = active === item.id;
          return (
            <button 
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className={`animate-fade-in-up delay-${idx + 1} w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#141414] text-[#ccff00] border border-[#222] shadow-[0_0_15px_rgba(204,255,0,0.06)]' 
                  : 'text-gray-500 hover:text-gray-200 hover:bg-[#0e0e0e] border border-transparent'
              }`}
            >
              <span className="flex items-center gap-3">
                <item.icon size={16} className={`transition-all duration-300 ${isActive ? 'text-[#ccff00]' : 'opacity-50 group-hover:opacity-90'}`} />
                <span className={`font-medium ${isActive ? 'text-glow-cyber' : ''}`}>{item.label}</span>
              </span>
              {isActive && <ChevronRight size={14} className="text-[#ccff00] opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent my-4 z-10"></div>

      {/* Status + Agent Info */}
      <div className="z-10 space-y-3 px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06d6a0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06d6a0]"></span>
            </span>
            System Online
          </div>
          <span className="text-[10px] font-mono text-gray-600">00:35:41</span>
        </div>

        <div className="bg-[#0a0a0a] border border-[#161616] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded bg-[#ff3366]/20 flex items-center justify-center">
              <ShieldAlert size={11} className="text-[#ff3366]" />
            </div>
            <span className="text-[10px] font-mono text-gray-400">Alerta Activa</span>
          </div>
          <p className="text-[10px] font-mono text-[#ff3366] leading-relaxed">
            OLIVER detectó exposición de -€633M. Acción requerida.
          </p>
        </div>
      </div>
    </aside>
  );
}
