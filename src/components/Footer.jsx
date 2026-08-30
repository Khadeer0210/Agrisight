import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Sprout, ArrowRight, ShieldCheck, Leaf, Mail, Globe } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className="mt-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #10251B 0%, #183528 60%, #0D1E14 100%)',
        color: '#ffffff',
        borderTop: '1px solid rgba(127,174,104,0.15)',
      }}
    >
      {/* Atmospheric green glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.12]"
          style={{ background: '#4F8A5B' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.08]"
          style={{ background: '#B7D7D0' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4F8A5B, #7FAE68)' }}
              >
                <Sprout size={22} color="#fff" />
              </div>
              <div>
                <span
                  className="text-lg font-bold block leading-none"
                  style={{ fontFamily: 'var(--font-display)', color: '#FEFEFE' }}
                >
                  AgriVision
                </span>
                <span className="text-[11px] font-medium tracking-wide" style={{ color: '#7FAE68' }}>
                  Krishi Saarthi · Field AI
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(254,254,254,0.70)' }}>
              Empowering small-scale Indian farmers with local Edge AI intelligence, precise hyper-local weather telemetry, and automated crop diagnostics.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#7FAE68' }}>
              <ShieldCheck size={14} />
              <span>100% Offline Resilient · Privacy Preserved</span>
            </div>
          </div>

          {/* Col 2: Main Hub */}
          <div>
            <h4
              className="text-xs font-extrabold uppercase tracking-widest mb-4 flex items-center gap-1.5"
              style={{ color: '#7FAE68' }}
            >
              <Leaf size={13} /> Main Hub
            </h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              {[
                { to: '/', label: 'Dashboard & Telemetry' },
                { to: '/farm', label: 'My Farm & Soil Health' },
                { to: '/health', label: 'LLaVA Plant Analyzer' },
                { to: '/weather', label: 'Weather & Climate Radar' },
                { to: '/insurance', label: 'Parametric Insurance' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="no-underline transition-colors"
                    style={{ color: 'rgba(254,254,254,0.65)' }}
                    onMouseEnter={e => e.target.style.color = '#7FAE68'}
                    onMouseLeave={e => e.target.style.color = 'rgba(254,254,254,0.65)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: AI Tools */}
          <div>
            <h4
              className="text-xs font-extrabold uppercase tracking-widest mb-4 flex items-center gap-1.5"
              style={{ color: '#7FAE68' }}
            >
              <Leaf size={13} /> AI Advisory
            </h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              {[
                { to: '/chat', label: 'Multilingual AI Chatbot' },
                { to: '/market', label: 'Mandi Market Intelligence' },
                { to: '/library', label: 'Crop Knowledge Graph' },
                { to: '/monitoring', label: 'Live Field Telemetry' },
                { to: '/impact', label: 'Climate Sustainability' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="no-underline transition-colors"
                    style={{ color: 'rgba(254,254,254,0.65)' }}
                    onMouseEnter={e => e.target.style.color = '#7FAE68'}
                    onMouseLeave={e => e.target.style.color = 'rgba(254,254,254,0.65)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Krishi Bulletin */}
          <div className="space-y-4">
            <h4
              className="text-xs font-extrabold uppercase tracking-widest mb-1 flex items-center gap-1.5"
              style={{ color: '#7FAE68' }}
            >
              <Mail size={13} /> Krishi Bulletin
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(254,254,254,0.65)' }}>
              Subscribe to get weekly climate advisories, crop prices, and pest outbreak alerts tailored for Indian agriculture.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Krishi Bulletin!') }}
              className="flex items-center gap-2 p-1 rounded-full border"
              style={{
                background: 'rgba(255,255,255,0.07)',
                borderColor: 'rgba(127,174,104,0.25)',
              }}
            >
              <input
                type="email"
                placeholder="Enter your email..."
                required
                className="bg-transparent text-xs px-3 py-2 text-white outline-none w-full"
                style={{ placeholder: 'rgba(255,255,255,0.4)' }}
              />
              <button
                type="submit"
                className="btn btn-paddy rounded-full px-4 py-2 text-xs font-bold shrink-0 flex items-center gap-1"
                style={{ padding: '8px 16px', fontSize: 12 }}
              >
                Join <ArrowRight size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6" style={{ borderColor: 'rgba(127,174,104,0.15)' }} />

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'rgba(254,254,254,0.50)' }}
        >
          <span>© {new Date().getFullYear()} AgriVision (Krishi Saarthi). Built for Indian Farmers.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="flex items-center gap-1" style={{ color: '#7FAE68', fontWeight: 600 }}>
              <Globe size={12} /> Multi-Language (EN, HI, TA, TE, KN)
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
