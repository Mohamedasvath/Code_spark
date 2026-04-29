import { Search, Bell, Sun, Moon, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const PAGE_TITLES = {
  '/':          { title: 'Dashboard',  crumb: 'Overview' },
  '/clients':   { title: 'Clients',    crumb: 'Manage Clients' },
  '/contacts':  { title: 'Contacts',   crumb: 'Incoming Messages' },
  '/invoices':  { title: 'Invoices',   crumb: 'Billing & Payments' },
  '/settings':  { title: 'Settings',   crumb: 'Configuration' },
}

const Navbar = ({ collapsed, onMobileMenuToggle }) => {
  const location = useLocation()
  const meta = PAGE_TITLES[location.pathname] || { title: 'Admin', crumb: 'CodeSpark' }

  return (
    <header className={`navbar${collapsed ? ' collapsed' : ''}`}>
      <div className="navbar-left">
        {/* Mobile hamburger */}
        <button
          className="navbar-toggle"
          onClick={onMobileMenuToggle}
          id="mobile-menu-btn"
          style={{ display: 'none' }}
        >
          <Menu size={18} />
        </button>
        {/* Desktop hamburger (handled by sidebar) */}
        <style>{`
          @media (max-width: 768px) {
            #mobile-menu-btn { display: flex !important; }
          }
        `}</style>

        <div className="page-title-bar">
          <span className="page-title">{meta.title}</span>
          <span className="page-breadcrumb">CodeSpark Admin / {meta.crumb}</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <Search size={15} />
          <input placeholder="Search anything…" id="global-search" />
        </div>

        <button className="navbar-btn" title="Notifications" id="notif-btn">
          <Bell size={16} />
          <span className="notif-dot" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
