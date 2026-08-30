import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../i18n'
import {
  LayoutDashboard, Sprout, Leaf, CloudSun, MessageCircle,
  Shield, BookOpen, Heart, Bell, User, Menu, X, Globe, LogOut,
  ChevronDown, ChevronRight, Store, Activity
} from 'lucide-react'
import AIStatusIndicator from './AIStatusIndicator'
import { useAppContext } from '../context/AppContext'

// Primary nav — always visible in header
const PRIMARY_NAV = [
  { path: '/', icon: LayoutDashboard, key: 'nav.dashboard' },
  { path: '/farm', icon: Sprout, key: 'nav.my_farm' },
  { path: '/health', icon: Leaf, key: 'nav.plant_health' },
  { path: '/weather', icon: CloudSun, key: 'nav.weather' },
  { path: '/insurance', icon: Shield, key: 'nav.insurance' },
]

// Secondary nav — lives in sidebar drawer
const SECONDARY_NAV = [
  { path: '/market', icon: Store, key: 'Market Prices' },
  { path: '/monitoring', icon: Activity, key: 'Live Monitoring' },
  { path: '/chat', icon: MessageCircle, key: 'nav.advisory' },
  { path: '/library', icon: BookOpen, key: 'nav.library' },
  { path: '/impact', icon: Heart, key: 'nav.impact' },
  { path: '/notifications', icon: Bell, key: 'nav.notifications' },
  { path: '/profile', icon: User, key: 'nav.profile' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const { alerts } = useAppContext()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
  const unreadCount = alerts?.filter(a => !a.is_read)?.length || alerts?.length || 0

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('agri_lang', code)
    setLangOpen(false)
  }

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0]

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(245, 241, 232, 0.95)'
            : 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(79,138,91,0.22)' : 'rgba(79,138,91,0.12)'}`,
          boxShadow: scrolled ? '0 4px 24px rgba(16,37,27,0.08)' : '0 1px 8px rgba(16,37,27,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Left: Drawer Toggle + Logo */}
            <div className="flex items-center gap-3">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{
                  background: drawerOpen ? 'rgba(79,138,91,0.12)' : 'transparent',
                  color: drawerOpen ? 'var(--agri-green)' : 'var(--color-muted)',
                  border: `1px solid ${drawerOpen ? 'rgba(79,138,91,0.25)' : 'rgba(79,138,91,0.12)'}`,
                  cursor: 'pointer',
                }}
                aria-label="Toggle navigation drawer"
              >
                {drawerOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 no-underline group">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #4F8A5B 0%, #183528 100%)',
                  }}
                >
                  <Sprout size={20} color="#fff" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-base font-bold leading-tight tracking-tight"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--agri-deep)' }}
                  >
                    {t('app_name')}
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 ml-1 mb-0.5" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                    Krishi Saarthi · AI
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Primary Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.60)',
                border: '1px solid rgba(79,138,91,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {PRIMARY_NAV.map(({ path, icon: Icon, key }) => {
                const active = location.pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium no-underline transition-all duration-200"
                    style={{
                      color: active ? '#ffffff' : 'var(--color-muted)',
                      background: active
                        ? 'linear-gradient(135deg, #4F8A5B 0%, #183528 100%)'
                        : 'transparent',
                      fontWeight: active ? 700 : 500,
                      boxShadow: active ? '0 3px 12px rgba(79,138,91,0.30)' : 'none',
                    }}
                  >
                    <Icon size={15} style={{ color: active ? '#ffffff' : 'var(--color-muted)' }} />
                    <span>{t(key)}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <AIStatusIndicator compact />

              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: langOpen ? 'rgba(79,138,91,0.10)' : 'rgba(255,255,255,0.60)',
                    border: '1px solid rgba(79,138,91,0.18)',
                    color: 'var(--agri-deep)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <Globe size={14} style={{ color: 'var(--agri-green)' }} />
                  <span className="hidden sm:inline">{currentLang.native}</span>
                  <ChevronDown size={12} style={{ color: 'var(--color-muted)' }} />
                </button>
                {langOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 py-1.5 rounded-2xl min-w-[170px] z-50 animate-scale-in"
                    style={{
                      background: 'rgba(255,255,255,0.96)',
                      border: '1px solid rgba(79,138,91,0.15)',
                      boxShadow: '0 12px 40px rgba(16,37,27,0.12)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors"
                        style={{
                          background: i18n.language === lang.code ? 'rgba(79,138,91,0.10)' : 'transparent',
                          color: i18n.language === lang.code ? 'var(--agri-green)' : 'var(--agri-deep)',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: i18n.language === lang.code ? 700 : 500,
                        }}
                      >
                        <span>{lang.native}</span>
                        <span style={{ color: 'var(--color-muted)', fontSize: 11 }}>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <Link
                to="/notifications"
                className="relative p-2 rounded-xl transition-all duration-200 no-underline"
                style={{
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(79,138,91,0.14)',
                }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 rounded-full text-[10px] font-extrabold flex items-center justify-center text-white"
                    style={{ background: 'var(--color-alert)', minWidth: 17, height: 17 }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full no-underline transition-all duration-200"
                style={{
                  background: location.pathname === '/profile'
                    ? 'rgba(79,138,91,0.12)'
                    : 'rgba(255,255,255,0.60)',
                  border: '1px solid rgba(79,138,91,0.18)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                  style={{ background: 'linear-gradient(135deg, var(--color-turmeric), var(--color-turmeric-dark))' }}
                >
                  K
                </div>
                <span className="text-xs font-bold" style={{ color: 'var(--agri-deep)' }}>Karthik</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-xl"
                style={{
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(79,138,91,0.14)',
                  cursor: 'pointer',
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <LayoutDashboard size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Primary Nav Dropdown ── */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t px-4 py-4"
            style={{
              borderColor: 'rgba(79,138,91,0.12)',
              background: 'rgba(245,241,232,0.97)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="grid grid-cols-3 gap-2">
              {PRIMARY_NAV.map(({ path, icon: Icon, key }) => {
                const active = location.pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-xs font-semibold no-underline text-center transition-all"
                    style={{
                      color: active ? '#ffffff' : 'var(--agri-deep)',
                      background: active
                        ? 'linear-gradient(135deg, #4F8A5B, #183528)'
                        : 'rgba(255,255,255,0.70)',
                      border: `1px solid ${active ? 'transparent' : 'rgba(79,138,91,0.14)'}`,
                    }}
                  >
                    <Icon size={20} />
                    {t(key)}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* ── Sidebar Drawer Backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ background: 'rgba(16, 37, 27, 0.30)', backdropFilter: 'blur(3px)' }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Drawer Panel ── */}
      <aside
        className="fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: 280,
          background: 'rgba(245, 241, 232, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(79,138,91,0.15)',
          boxShadow: drawerOpen ? '8px 0 40px rgba(16,37,27,0.12)' : 'none',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'rgba(79,138,91,0.12)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #4F8A5B 0%, #183528 100%)' }}
            >
              <Sprout size={20} color="#fff" />
            </div>
            <div>
              <div
                className="text-sm font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--agri-deep)' }}
              >
                {t('app_name')}
              </div>
              <div className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
                Krishi Saarthi · Field AI
              </div>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-xl transition-colors"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Primary Nav */}
        <div className="px-3 pt-4 pb-2">
          <div
            className="text-[10px] font-extrabold uppercase tracking-wider px-3 mb-2"
            style={{ color: 'var(--color-muted)' }}
          >
            {t('nav.main') || 'Main Workspace'}
          </div>
          {PRIMARY_NAV.map(({ path, icon: Icon, key }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium no-underline mb-1 transition-all"
                style={{
                  color: active ? '#ffffff' : 'var(--agri-deep)',
                  background: active
                    ? 'linear-gradient(135deg, #4F8A5B, #183528)'
                    : 'transparent',
                }}
              >
                <Icon size={17} />
                {t(key)}
                {active && <ChevronRight size={14} className="ml-auto" style={{ color: '#ffffff' }} />}
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        <div className="mx-5 my-1 border-t" style={{ borderColor: 'rgba(79,138,91,0.12)' }} />

        {/* Secondary Nav */}
        <div className="px-3 pb-2">
          <div
            className="text-[10px] font-extrabold uppercase tracking-wider px-3 mb-2"
            style={{ color: 'var(--color-muted)' }}
          >
            {t('nav.tools') || 'AI Intelligence Tools'}
          </div>
          {SECONDARY_NAV.map(({ path, icon: Icon, key }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium no-underline mb-1 transition-all"
                style={{
                  color: active ? 'var(--agri-green)' : 'var(--agri-deep)',
                  background: active ? 'rgba(79,138,91,0.10)' : 'transparent',
                }}
              >
                <Icon size={17} />
                {t(key)}
                {path === '/notifications' && unreadCount > 0 && (
                  <span
                    className="ml-auto text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--color-alert)' }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex-1" />

        {/* Drawer Footer */}
        <div
          className="px-5 py-4 border-t"
          style={{
            borderColor: 'rgba(79,138,91,0.12)',
            background: 'rgba(255,255,255,0.50)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg, var(--color-turmeric), var(--color-turmeric-dark))' }}
            >
              K
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--agri-deep)' }}>Karthik</div>
              <div className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Sriperumbudur, TN</div>
            </div>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: 'rgba(192,57,43,0.07)',
              color: 'var(--color-alert)',
              border: '1.5px solid rgba(192,57,43,0.18)',
              cursor: 'pointer',
            }}
          >
            <LogOut size={14} /> {t('nav.logout')}
          </button>
        </div>
      </aside>
    </>
  )
}
