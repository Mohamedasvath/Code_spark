import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Globe, Save, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import API from '../services/api'

const Settings = () => {
  const { admin } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  /* ── Profile form ── */
  const [profile, setProfile] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
  })

  /* ── Password form ── */
  const [pwForm, setPwForm] = useState({ currentPassword:'', newPassword:'', confirmPassword:'' })
  const [showPw, setShowPw] = useState({ current:false, new:false, confirm:false })
  const [pwLoading, setPwLoading] = useState(false)

  const handleProfileSave = (e) => {
    e.preventDefault()
    toast.success('Profile settings saved!')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (pwForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setPwLoading(true)
    try {
      await API.put('/auth/change-password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      toast.success('Password changed successfully!')
      setPwForm({ currentPassword:'', newPassword:'', confirmPassword:'' })
    } catch {
      toast.error('Password change failed. Check current password.')
    } finally {
      setPwLoading(false)
    }
  }

  const TABS = [
    { id:'profile',  label:'Profile',       icon: User },
    { id:'security', label:'Security',      icon: Lock },
    { id:'about',    label:'About',         icon: Globe },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:24 }}>
        {/* ── Tab sidebar ── */}
        <div className="card" style={{ padding:'12px', height:'fit-content', position:'sticky', top:'calc(var(--navbar-height) + 28px)' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`nav-item${activeTab === t.id ? ' active' : ''}`}
              style={{ width:'100%', marginBottom:2 }}
            >
              <t.icon size={17} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div>
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Profile Information</h3>
              </div>
              <div className="card-body">
                {/* Avatar section */}
                <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:28,
                  padding:'20px', background:'var(--color-surface-2)', borderRadius:12,
                  border:'1px solid var(--color-border)' }}>
                  <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--gradient-primary)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.5rem', fontWeight:800, color:'white', flexShrink:0,
                    boxShadow:'var(--shadow-primary)' }}>
                    {admin?.name?.slice(0,2).toUpperCase() || 'AD'}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'1.1rem', color:'var(--text-primary)' }}>{admin?.name}</div>
                    <div style={{ color:'var(--text-muted)', fontSize:'0.85rem' }}>{admin?.email}</div>
                    <div style={{ marginTop:4 }}>
                      <span className="badge badge-primary">Administrator</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleProfileSave}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" value={profile.name}
                        onChange={e => setProfile(p => ({...p, name:e.target.value}))} placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input className="form-input" type="email" value={profile.email}
                        onChange={e => setProfile(p => ({...p, email:e.target.value}))} placeholder="admin@codespark.com" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" id="save-profile-btn">
                    <Save size={15} /> Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Change Password</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handlePasswordChange} style={{ maxWidth:480 }}>
                  {[
                    { key:'currentPassword', label:'Current Password', field:'current' },
                    { key:'newPassword',     label:'New Password',     field:'new' },
                    { key:'confirmPassword', label:'Confirm Password', field:'confirm' },
                  ].map(({ key, label, field }) => (
                    <div key={key} className="form-group">
                      <label className="form-label">{label}</label>
                      <div style={{ position:'relative' }}>
                        <input
                          type={showPw[field] ? 'text' : 'password'}
                          className="form-input"
                          value={pwForm[key]}
                          onChange={e => setPwForm(f => ({...f, [key]:e.target.value}))}
                          placeholder="••••••••"
                          style={{ paddingRight:44 }}
                        />
                        <button type="button"
                          onClick={() => setShowPw(s => ({...s, [field]:!s[field]}))}
                          style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                            color:'var(--text-muted)', display:'flex', alignItems:'center' }}>
                          {showPw[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary" disabled={pwLoading} id="change-pwd-btn">
                    <Lock size={15} /> {pwLoading ? 'Changing…' : 'Change Password'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* About */}
          {activeTab === 'about' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">About CodeSpark Admin</h3>
              </div>
              <div className="card-body">
                <div style={{ display:'grid', gap:12 }}>
                  {[
                    ['Version', '1.0.0'],
                    ['Backend URL', import.meta.env.VITE_API_URL || 'http://localhost:5000/api'],
                    ['Framework', 'React + Vite'],
                    ['Database', 'MongoDB'],
                    ['Auth', 'JWT (7 days expiry)'],
                  ].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between',
                      alignItems:'center', padding:'12px 16px',
                      background:'var(--color-surface-2)', borderRadius:8,
                      border:'1px solid var(--color-border)' }}>
                      <span style={{ fontSize:'0.85rem', color:'var(--text-muted)', fontWeight:600 }}>{k}</span>
                      <span style={{ fontSize:'0.85rem', color:'var(--text-primary)', fontFamily:'monospace' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:20, padding:'16px', background:'var(--color-primary-glow)',
                  borderRadius:10, border:'1px solid rgba(99,102,241,0.2)' }}>
                  <p style={{ fontSize:'0.875rem', color:'var(--color-primary-light)', lineHeight:1.7 }}>
                    <strong>CodeSpark Admin</strong> is a professional freelance management dashboard built to streamline client management, project tracking, and invoicing for CodeSpark agency.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
