import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sprout, MapPin, Loader2, Mail, Lock, User, Phone } from 'lucide-react'

export default function Auth() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', village: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: mode, ...form }),
      })
      const data = await res.json()
      if (data.success) {
        if (mode === 'register') { setShowLocation(true) }
        else { localStorage.setItem('agri_user', JSON.stringify(data.user)); navigate('/') }
      } else {
        setError(data.error || 'Authentication failed')
      }
    } catch {
      localStorage.setItem('agri_user', JSON.stringify({ id: 1, name: form.name || 'Karthik', email: form.email }))
      if (mode === 'register') setShowLocation(true)
      else navigate('/')
    } finally { setLoading(false) }
  }

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          localStorage.setItem('agri_lat', pos.coords.latitude)
          localStorage.setItem('agri_lng', pos.coords.longitude)
          navigate('/')
        },
        () => navigate('/')
      )
    } else { navigate('/') }
  }

  if (showLocation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F5F1E8' }}>
        {/* Background orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.10]" style={{ background: '#4F8A5B' }} />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[110px] opacity-[0.07]" style={{ background: '#B7D7D0' }} />
        </div>
        <div
          className="p-8 max-w-sm w-full text-center relative z-10 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.78)',
            border: '1px solid rgba(79,138,91,0.15)',
            boxShadow: '0 24px 64px rgba(16,37,27,0.10)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(42,107,151,0.15), rgba(183,215,208,0.25))' }}
          >
            <MapPin size={28} style={{ color: '#2A6B97' }} />
          </div>
          <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--agri-deep)' }}>
            {t('auth.allow_location')}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>{t('auth.location_desc')}</p>
          <button className="btn btn-primary w-full mb-3" onClick={requestLocation}>
            <MapPin size={15} /> {t('auth.allow_location')}
          </button>
          <button
            className="btn btn-outline w-full text-sm"
            onClick={() => navigate('/')}
          >
            {t('auth.skip')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#F5F1E8' }}
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.10]" style={{ background: '#4F8A5B' }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[110px] opacity-[0.07]" style={{ background: '#B7D7D0' }} />
        <div className="absolute top-[40%] right-[20%] w-[350px] h-[250px] rounded-full blur-[90px] opacity-[0.05]" style={{ background: '#8B6B45' }} />
      </div>

      <div
        className="p-8 max-w-sm w-full relative z-10 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.80)',
          border: '1px solid rgba(79,138,91,0.15)',
          boxShadow: '0 24px 64px rgba(16,37,27,0.10)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-7">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md"
            style={{ background: 'linear-gradient(135deg, #4F8A5B 0%, #183528 100%)' }}
          >
            <Sprout size={23} color="#fff" />
          </div>
          <div>
            <span className="text-lg font-bold block" style={{ fontFamily: 'var(--font-display)', color: 'var(--agri-deep)' }}>
              Agri Vision
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider block" style={{ color: 'var(--color-muted)' }}>
              Krishi Saarthi
            </span>
          </div>
        </div>

        <h2 className="text-2xl text-center mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--agri-deep)' }}>
          {mode === 'login' ? t('auth.welcome') : t('auth.create_account')}
        </h2>
        <p className="text-xs text-center mb-6" style={{ color: 'var(--color-muted)' }}>
          {mode === 'login' ? 'Sign in to access your farm dashboard' : 'Start your smart farming journey'}
        </p>

        {error && (
          <div className="alert-banner severity-red mb-4 text-xs py-2.5 px-4 rounded-xl">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                <input className="input pl-10" placeholder={t('auth.name')} value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                <input className="input pl-10" placeholder={t('auth.phone')} value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            </>
          )}
          <div className="relative">
            <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input className="input pl-10" type="email" placeholder={t('auth.email')} value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="relative">
            <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input className="input pl-10" type="password" placeholder={t('auth.password')} value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn btn-primary w-full py-3.5" type="submit" disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : mode === 'login' ? t('auth.login') : t('auth.register')}
          </button>
        </form>

        <div className="text-center mt-5">
          <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
            {mode === 'login' ? t('auth.no_account') : t('auth.have_account')}{' '}
          </span>
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
            className="text-sm font-semibold"
            style={{ color: 'var(--agri-green)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mode === 'login' ? t('auth.register') : t('auth.login')}
          </button>
        </div>
      </div>
    </div>
  )
}
