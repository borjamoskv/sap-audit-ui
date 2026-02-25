import { TrendingUp, TrendingDown, AlertCircle, Shield } from 'lucide-react';

const icons = {
  up: TrendingUp,
  down: TrendingDown,
  alert: AlertCircle, 
  shield: Shield
};

export default function MetricCards() {
  const metrics = [
    { label: 'NAV Auditado', value: '€6.6B', sub: 'GORDACORP Holdings', trend: '+1.2%', bad: false, iconKey: 'shield', color: '#06d6a0' },
    { label: 'Volatilidad Mediana', value: '28.5%', sub: 'Private Equity Port.', trend: '+4.1pp', bad: true, iconKey: 'up', color: '#d4af37' },
    { label: 'Outliers IQR', value: '7', sub: 'Anomalías detectadas', trend: '+3 nuevo', bad: true, iconKey: 'alert', color: '#d4af37' },
    { label: 'Exposición OLIVER', value: '-€633M', sub: 'Impacto regulatorio', trend: 'CRÍTICA', bad: true, glow: true, iconKey: 'down', color: '#ff3366' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((m, i) => {
        const Icon = icons[m.iconKey];
        return (
          <div 
            key={i} 
            className={`animate-fade-in-up delay-${i + 1} panel-notch p-5 rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default ${
              m.glow ? 'animate-pulse-glow' : ''
            }`}
          >
            {/* Accent bar top */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }}></div>
            
            {/* Background glow */}
            {m.glow && <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-[60px] pointer-events-none" style={{ background: m.color }}></div>}

            <div className="flex items-start justify-between mb-3">
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.15em]">
                {m.label}
              </p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${m.color}15` }}>
                <Icon size={14} style={{ color: m.color }} />
              </div>
            </div>
            
            <h2 className={`text-2xl font-extrabold font-sans mb-1 animate-count-up ${m.glow ? 'text-glow-crimson' : ''}`} style={{ color: m.glow ? m.color : '#f0f0f0' }}>
              {m.value}
            </h2>
            
            <div className="flex items-center justify-between mt-1">
              <p className="text-gray-600 text-[10px] font-mono">{m.sub}</p>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full`}
                style={{ 
                  background: `${m.color}15`, 
                  color: m.color
                }}>
                {m.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
