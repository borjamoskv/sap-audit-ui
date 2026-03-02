import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MetricCards from './components/MetricCards'
import TomRadar from './components/TomRadar'
import OliverImpact from './components/OliverImpact'
import AuditLog from './components/AuditLog'

export default function App() {
  const [activeView, setActiveView] = useState('overview')
  const [clock, setClock] = useState(new Date().toLocaleTimeString('es-ES', { hour12: false }))
  const [bioState, setBioState] = useState({
    endocrine: { cortisol: 0, dopamine: 0.5, serotonin: 0.5, adrenaline: 0, response_style: 'balanced' },
    circadian: { is_sleeping: false, phase_name: 'WAKE' }
  })

  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString('es-ES', { hour12: false })), 1000)
    
    // Simular polling del daemon status (en producción esto vendría de una API)
    const bioT = setInterval(() => {
      // Mock de actualización para ver el dinamismo en el UI
      setBioState(prev => ({
        ...prev,
        endocrine: {
          ...prev.endocrine,
          cortisol: Math.random() * 0.3 + (prev.endocrine.cortisol > 0.5 ? -0.1 : 0.05)
        }
      }))
    }, 5000)

    return () => {
      clearInterval(t)
      clearInterval(bioT)
    }
  }, [])

  const accentColor = bioState.endocrine.cortisol > 0.6 ? '#ff3366' : '#ccff00'
  const glowClass = bioState.endocrine.cortisol > 0.6 ? 'text-glow-red' : 'text-glow-cyber'

  return (
    <div className="flex h-screen bg-[#050505] text-gray-200 overflow-hidden font-sans selection:bg-[#ccff00] selection:text-[#0a0a0a]">
      <Sidebar active={activeView} onNavigate={setActiveView} />

      <main className="flex-1 flex flex-col h-full overflow-y-auto relative">
        {/* Grid background */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="z-10 relative flex-1 px-8 py-6">
          {/* Header */}
          <header className="mb-8 animate-fade-in-up">
            <div className="flex justify-between items-end border-b border-[#141414] pb-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black tracking-tight text-white transition-colors duration-500">
                    Auditoría <span style={{ color: accentColor }} className={glowClass}>"Con Efecto"</span>
                  </h1>
                  <span className={`px-2 py-0.5 border rounded text-[9px] font-mono uppercase tracking-widest font-bold transition-all duration-500 ${
                    bioState.circadian.is_sleeping 
                      ? 'bg-[#6600ff]/10 border-[#6600ff]/20 text-[#6600ff]' 
                      : 'bg-[#06d6a0]/10 border-[#06d6a0]/20 text-[#06d6a0]'
                  }`}>
                    {bioState.circadian.phase_name}
                  </span>
                </div>
                <p className="text-gray-600 font-mono text-xs tracking-wide">
                  Target: <span className="text-gray-400">GORDACORP Holdings / SAP R/3</span> · Engine: <span style={{ color: accentColor }}>TOM</span> & <span className="text-[#ff3366]">OLIVER</span> · <span className="text-gray-500">{clock}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-gray-600 uppercase tracking-wider">Lote</span>
                  <span className="text-xs font-mono text-[#06d6a0] text-glow-teal font-bold">L-6600M-EUR</span>
                </div>
                <div className="h-8 w-px bg-[#1a1a1a]"></div>
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-gray-600 uppercase tracking-wider">Scope</span>
                  <span className="text-xs font-mono text-gray-400">FY2024 · Q1-Q4</span>
                </div>
              </div>
            </div>
          </header>

          {/* KPIs — always visible */}
          <section className="mb-6">
            <MetricCards endocrine={bioState.endocrine} />
          </section>

          {/* View-based content */}
          {(activeView === 'overview' || activeView === 'tom') && (
            <section className={`${activeView === 'tom' ? '' : 'grid grid-cols-1 xl:grid-cols-2 gap-5'} mb-6`}>
              <TomRadar />
              {activeView === 'overview' && <OliverImpact />}
            </section>
          )}

          {(activeView === 'overview' || activeView === 'oliver') && activeView !== 'tom' && (
            <section className="mb-6">
              {activeView === 'oliver' && <OliverImpact />}
            </section>
          )}

          {(activeView === 'overview' || activeView === 'ledger') && (
            <section className="mb-8">
              <AuditLog />
            </section>
          )}

          {/* Print button — visible on all views */}
          <div className="mb-6 flex justify-end print:hidden">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-[#111] hover:bg-[#161616] border border-[#222] text-gray-400 hover:text-gray-200 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-300"
            >
              🖨 Exportar Informe
            </button>
          </div>
          
          {/* Footer */}
          <footer className="pt-5 border-t border-[#111] flex justify-between items-center text-[10px] font-mono text-gray-700 animate-fade-in-up delay-6">
            <div className="flex items-center gap-4">
              <span>Hash: <span className="text-gray-500">3c24f...88b</span></span>
              <span className="h-3 w-px bg-[#1a1a1a]"></span>
              <span>Bloque: <span className="text-gray-500">#47</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0]"></span>
              <span>Ledger sellado · Auditoría inmutable</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
