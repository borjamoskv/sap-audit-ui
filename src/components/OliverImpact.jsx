import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AlertTriangle, Siren, FileWarning } from 'lucide-react';

const data = [
  { name: 'Verisure', impact: -513.58, prob: 85, status: 'CRÍTICO' },
  { name: 'Atlantic Aviation', impact: -119.56, prob: 85, status: 'CRÍTICO' },
  { name: 'Ebro Foods', impact: -12.4, prob: 15, status: 'WATCH' },
  { name: 'CIE Automotive', impact: -8.2, prob: 10, status: 'BAJO' }
];

const totalExposure = data.reduce((sum, d) => sum + d.impact, 0);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-lg p-3 shadow-2xl text-xs font-mono min-w-[180px]">
      <p className="text-gray-200 font-bold mb-2">{d.name}</p>
      <div className="space-y-1">
        <div className="flex justify-between"><span className="text-gray-500">Impacto:</span><span className="text-[#ff3366] font-bold">{d.impact}M €</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Probabilidad:</span><span className="text-gray-300">{d.prob}%</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Estado:</span><span className={d.prob > 50 ? 'text-[#ff3366]' : 'text-[#d4af37]'}>{d.status}</span></div>
      </div>
    </div>
  );
};

export default function OliverImpact() {
  return (
    <div className="panel-notch p-6 flex flex-col relative overflow-hidden animate-fade-in-up delay-5">
      {/* Multiple glows for drama */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#ff3366] opacity-[0.07] blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#ff3366] opacity-[0.04] blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex justify-between items-start mb-5 z-10">
        <div>
          <h3 className="text-[#ff3366] font-sans font-bold text-base flex items-center gap-2 text-glow-crimson">
            <div className="w-6 h-6 rounded bg-[#ff3366]/15 flex items-center justify-center animate-pulse-glow">
              <AlertTriangle size={14} />
            </div>
            OLIVER · Impacto Regulatorio
          </h3>
          <p className="text-gray-600 font-mono text-[10px] mt-1.5 tracking-wide">
            Exposición bajo CNMV / NIIF 9 · Provisión requerida
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-3xl font-black font-sans text-white tracking-tight animate-count-up">
            {totalExposure.toFixed(0)}M
          </p>
          <div className="flex items-center gap-1.5 justify-end mt-1">
            <Siren size={10} className="text-[#ff3366]" />
            <p className="text-[#ff3366] font-mono text-[10px] uppercase font-bold tracking-wider">
              Exposición Total
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full text-xs font-mono z-10" style={{ minHeight: '180px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#151515" horizontal={false} vertical={true} />
            <XAxis type="number" stroke="transparent" tick={{ fill: '#444', fontSize: 10 }} tickLine={false} domain={[-600, 0]} tickFormatter={(v) => `${v}M`} />
            <YAxis dataKey="name" type="category" stroke="transparent" tick={{ fill: '#aaa', fontSize: 10 }} tickLine={false} width={100} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
            <Bar dataKey="impact" radius={[0, 6, 6, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.prob > 50 ? '#ff3366' : '#d4af37'} 
                  fillOpacity={entry.prob > 50 ? 0.85 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Action buttons */}
      <div className="mt-4 pt-4 border-t border-[#151515] z-10 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#111] hover:bg-[#161616] border border-[#222] text-gray-400 hover:text-gray-200 py-2.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-300">
          <FileWarning size={12} />
          Generar Informe
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#ff3366]/10 hover:bg-[#ff3366]/20 border border-[#ff3366]/30 text-[#ff3366] py-2.5 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,51,102,0.1)] hover:shadow-[0_0_30px_rgba(255,51,102,0.2)]">
          <Siren size={12} />
          Provisión Inmediata
        </button>
      </div>
    </div>
  );
}
