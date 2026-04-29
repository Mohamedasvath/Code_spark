import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="admin-layout">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className={`main-wrapper${collapsed ? ' collapsed' : ''}`}>
        <Navbar
          collapsed={collapsed}
          onMobileMenuToggle={() => setMobileOpen(o => !o)}
        />
        <main className="main-content page-enter">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
