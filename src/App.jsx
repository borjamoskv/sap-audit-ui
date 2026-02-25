import Sidebar from './components/Sidebar'
import MetricCards from './components/MetricCards'
import TomRadar from './components/TomRadar'
import OliverImpact from './components/OliverImpact'
import AuditLog from './components/AuditLog'

export default function App() {
  return (
    <div className="flex h-screen bg-[#050505] text-gray-200 overflow-hidden font-sans selection:bg-[#ccff00] selection:text-[#0a0a0a]">
      <Sidebar />

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
                  <h1 className="text-3xl font-black tracking-tight text-white">
                    Auditoría <span className="text-[#ccff00] text-glow-cyber">"Con Efecto"</span>
                  </h1>
                  <span className="px-2 py-0.5 bg-[#ff3366]/10 border border-[#ff3366]/20 rounded text-[9px] font-mono text-[#ff3366] uppercase tracking-widest font-bold">
                    Live
                  </span>
                </div>
                <p className="text-gray-600 font-mono text-xs tracking-wide">
                  Target: <span className="text-gray-400">Corporación Alba / Grupo March</span> · Engine: <span className="text-[#ccff00]">TOM</span> & <span className="text-[#ff3366]">OLIVER</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-gray-600 uppercase tracking-wider">Lote</span>
                  <span className="text-xs font-mono text-[#06d6a0] text-glow-teal font-bold">L-4600M-EUR</span>
                </div>
                <div className="h-8 w-px bg-[#1a1a1a]"></div>
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-gray-600 uppercase tracking-wider">Scope</span>
                  <span className="text-xs font-mono text-gray-400">FY2024 · Q1-Q4</span>
                </div>
              </div>
            </div>
          </header>

          {/* KPIs */}
          <section className="mb-6">
            <MetricCards />
          </section>

          {/* Analytics Grid */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
            <TomRadar />
            <OliverImpact />
          </section>

          {/* Audit Log Terminal */}
          <section className="mb-8">
            <AuditLog />
          </section>
          
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
