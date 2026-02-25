import { 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Radar, Eye } from 'lucide-react';

const UPPER = 15;
const LOWER = -15;

const data = [
  { month: 'Ene', verisure: 4, atlantic: 13.48 },
  { month: 'Feb', verisure: 2, atlantic: 8 },
  { month: 'Mar', verisure: 5, atlantic: 4 },
  { month: 'Abr', verisure: 3, atlantic: -2 },
  { month: 'May', verisure: 8, atlantic: 6 },
  { month: 'Jun', verisure: 52.13, atlantic: 2 },
  { month: 'Jul', verisure: 9, atlantic: 5 },
  { month: 'Ago', verisure: 4, atlantic: 3 },
  { month: 'Sep', verisure: 2, atlantic: -14.37 },
  { month: 'Oct', verisure: 7, atlantic: 6 },
  { month: 'Nov', verisure: 1, atlantic: -2 },
  { month: 'Dic', verisure: 3, atlantic: 22.03 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-3 shadow-xl text-xs font-mono">
      <p className="text-gray-400 mb-2 font-semibold">{label} 2024</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }}></span>
          <span className="text-gray-300">{entry.name}:</span>
          <span className="font-bold" style={{ color: entry.color }}>
            {entry.value > 0 ? '+' : ''}{entry.value}%
          </span>
          {(entry.value > UPPER || entry.value < LOWER) && (
            <span className="text-[#ff3366] text-[9px] bg-[#ff3366]/15 px-1.5 rounded">OUTLIER</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default function TomRadar() {
  return (
    <div className="panel-notch p-6 flex flex-col animate-fade-in-up delay-4 relative overflow-hidden">
      {/* Scan line */}
      <div className="scan-overlay absolute inset-0 pointer-events-none z-0"></div>

      <div className="flex justify-between items-start mb-5 z-10">
        <div>
          <h3 className="text-gray-100 font-sans font-bold text-base flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#ccff00]/15 flex items-center justify-center">
              <Radar size={14} className="text-[#ccff00]" />
            </div>
            TOM · Detector de Anomalías IQR
          </h3>
          <p className="text-gray-600 font-mono text-[10px] mt-1.5 tracking-wide">
            Variación mensual del NAV (%) · Verisure & Atlantic Aviation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#111] px-2.5 py-1.5 rounded-lg border border-[#1a1a1a] text-[10px] font-mono">
            <Eye size={10} className="text-[#ccff00]" />
            <span className="text-[#ccff00]">Aislado</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 z-10">
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
          <span className="w-3 h-[2px] bg-[#ff3366] rounded"></span> Verisure
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
          <span className="w-3 h-[2px] bg-[#06d6a0] rounded"></span> Atlantic Aviation
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
          <span className="w-3 h-[2px] bg-[#d4af37] rounded" style={{ borderTop: '1px dashed #d4af37' }}></span> Umbral IQR (±15%)
        </span>
      </div>
      
      <div className="flex-1 w-full text-xs font-mono z-10" style={{ minHeight: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gradVerisure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3366" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#ff3366" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gradAtlantic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06d6a0" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#06d6a0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
            <XAxis dataKey="month" stroke="transparent" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} />
            <YAxis stroke="transparent" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} domain={[-20, 60]} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={UPPER} stroke="#d4af37" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={LOWER} stroke="#d4af37" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={0} stroke="#333" />
            
            <Area type="monotone" dataKey="verisure" name="Verisure" stroke="#ff3366" strokeWidth={2} fill="url(#gradVerisure)" dot={{ r: 3, fill: '#ff3366', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#ff3366', stroke: '#ff336633', strokeWidth: 4 }} />
            <Area type="monotone" dataKey="atlantic" name="Atlantic Avi." stroke="#06d6a0" strokeWidth={2} fill="url(#gradAtlantic)" dot={{ r: 2.5, fill: '#06d6a0', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#06d6a0', stroke: '#06d6a033', strokeWidth: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Outlier callout */}
      <div className="mt-3 pt-3 border-t border-[#141414] z-10 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[10px] font-mono bg-[#ff3366]/10 text-[#ff3366] px-2.5 py-1.5 rounded-lg border border-[#ff3366]/20">
          <span className="font-bold">⚠ JUN:</span> Verisure +52.13% — Outlier Extremo
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono bg-[#06d6a0]/10 text-[#06d6a0] px-2.5 py-1.5 rounded-lg border border-[#06d6a0]/20">
          <span className="font-bold">SEP:</span> Atlantic -14.37%
        </div>
      </div>
    </div>
  );
}
