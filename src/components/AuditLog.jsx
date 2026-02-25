import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const LOG_ENTRIES = [
  { time: '10:41:03', agent: 'TOM', level: 'INFO', msg: 'Iniciando escaneo IQR sobre portfolio Private Equity...' },
  { time: '10:41:07', agent: 'TOM', level: 'WARN', msg: 'Verisure — NAV Delta Jun: +52.13% excede Q3+1.5×IQR (15.0%)' },
  { time: '10:41:08', agent: 'TOM', level: 'WARN', msg: 'Atlantic Aviation — NAV Delta Dic: +22.03% excede umbral' },
  { time: '10:41:09', agent: 'TOM', level: 'WARN', msg: 'Atlantic Aviation — NAV Delta Sep: -14.37% bajo Q1-1.5×IQR' },
  { time: '10:41:12', agent: 'TOM', level: 'INFO', msg: '7 outliers detectados en 12 meses de datos. Derivando a OLIVER...' },
  { time: '10:41:15', agent: 'OLIVER', level: 'CRIT', msg: 'Verisure: Book Value 2.100M€ → Fair Value 1.586M€ = Impairment -513.58M€' },
  { time: '10:41:16', agent: 'OLIVER', level: 'CRIT', msg: 'Atlantic Aviation: Impairment estimado -119.56M€ (prob. 85%)' },
  { time: '10:41:18', agent: 'OLIVER', level: 'INFO', msg: 'Ebro Foods & CIE Automotive: riesgo bajo, monitoring activo' },
  { time: '10:41:22', agent: 'OLIVER', level: 'CRIT', msg: '⚡ EXPOSICIÓN TOTAL: -653.74M€ — PROVISIÓN INMEDIATA REQUERIDA' },
  { time: '10:41:25', agent: 'SYS', level: 'INFO', msg: 'Audit trail hasheado (SHA-256). Bloque #47 sellado en ledger.' },
  { time: '10:41:26', agent: 'SYS', level: 'INFO', msg: 'Reporte CNMV generado. Pendiente revisión del auditor principal.' },
];

const levelColors = {
  INFO: 'text-gray-500',
  WARN: 'text-[#d4af37]',
  CRIT: 'text-[#ff3366]',
};

const agentColors = {
  TOM: 'text-[#ccff00]',
  OLIVER: 'text-[#ff3366]',
  SYS: 'text-[#06d6a0]',
};

export default function AuditLog() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < LOG_ENTRIES.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 400 + Math.random() * 300);
      return () => clearTimeout(timer);
    }
  }, [visibleCount]);

  return (
    <div className="panel-notch p-5 animate-fade-in-up delay-6 relative overflow-hidden">
      <div className="scan-overlay absolute inset-0 pointer-events-none z-0"></div>
      
      <div className="flex items-center justify-between mb-4 z-10 relative">
        <h3 className="text-gray-200 font-sans font-bold text-base flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#06d6a0]/15 flex items-center justify-center">
            <Terminal size={13} className="text-[#06d6a0]" />
          </div>
          Audit Log · Terminal
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600">
          <span>{visibleCount}/{LOG_ENTRIES.length} eventos</span>
          {visibleCount < LOG_ENTRIES.length && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping"></span>
          )}
        </div>
      </div>

      <div className="bg-[#060606] rounded-lg border border-[#111] p-4 h-48 overflow-y-auto font-mono text-[11px] leading-relaxed z-10 relative space-y-1">
        {LOG_ENTRIES.slice(0, visibleCount).map((entry, i) => (
          <div key={i} className="flex gap-2 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
            <span className="text-gray-700 shrink-0">{entry.time}</span>
            <span className={`shrink-0 font-bold w-[52px] ${agentColors[entry.agent]}`}>[{entry.agent}]</span>
            <span className={`shrink-0 w-[38px] ${levelColors[entry.level]}`}>{entry.level}</span>
            <span className={`${entry.level === 'CRIT' ? 'text-[#ff3366]' : 'text-gray-400'}`}>{entry.msg}</span>
          </div>
        ))}
        {visibleCount < LOG_ENTRIES.length && (
          <span className="blink-cursor text-transparent">_</span>
        )}
        {visibleCount >= LOG_ENTRIES.length && (
          <div className="mt-2 pt-2 border-t border-[#111] text-[#06d6a0]">
            ✓ Auditoría completada. Todos los findings documentados.
          </div>
        )}
      </div>
    </div>
  );
}
