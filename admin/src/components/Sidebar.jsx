import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, MessageSquare, FileText,
  Settings, LogOut, Zap, ChevronLeft, ChevronRight,
  FolderOpen
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const NAV = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
    ]
  },
  {
    section: 'Management',
    items: [
      { label: 'Clients',   icon: Users,         to: '/clients' },
      { label: 'Contacts',  icon: MessageSquare, to: '/contacts' },
      { label: 'Invoices',  icon: FileText,       to: '/invoices' },
    ]
  },
  {
    section: 'System',
    items: [
      { label: 'Settings',  icon: Settings, to: '/settings' },
    ]
  }
]

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const initials = admin?.name
    ? admin.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD'

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={onMobileClose} />
      )}

      <aside className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Zap size={20} color="white" strokeWidth={2.5} />
          </div>
          <span className="sidebar-logo-text">CodeSpark</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV.map((section) => (
            <div key={section.section}>
              <div className="nav-section-title">{section.section}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={mobileOpen ? onMobileClose : undefined}
                  className={({ isActive }) =>
                    `nav-item${isActive ? ' active' : ''}`
                  }
                >
                  <item.icon size={18} />
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={onToggle}
          className="nav-item"
          style={{ margin: '0 10px 8px', borderTop: '1px solid var(--color-border)', paddingTop: 12 }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          <span className="nav-label" style={{ fontSize: '0.82rem' }}>Collapse Sidebar</span>
        </button>

        {/* User */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{admin?.name || 'Admin'}</div>
            <div className="sidebar-user-role">Administrator</div>
          </div>
          <button
            onClick={handleLogout}
            style={{ color: 'var(--text-muted)', flexShrink: 0 }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
