import { useEffect, useState } from 'react'
import {
  Users, MessageSquare, FileText, TrendingUp,
  DollarSign, Clock, CheckCircle, AlertCircle,
  ArrowUpRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { getClients, getContacts } from '../services/api'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

/* ─── Custom Tooltip ─────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
      borderRadius: 8, padding: '10px 14px', fontSize: '0.8rem'
    }}>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' && p.name?.toLowerCase().includes('revenue')
            ? `₹${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  )
}

/* ─── Stat Card ──────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, gradient, change, suffix = '' }) => (
  <div className="stat-card" style={{ '--stat-color': gradient }}>
    <div className="stat-card-top">
      <div>
        <div className="stat-value">{value}{suffix}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-icon" style={{ background: color + '18' }}>
        <Icon size={22} color={color} />
      </div>
    </div>
    <span className={`stat-change ${change >= 0 ? 'up' : 'neutral'}`}>
      <ArrowUpRight size={12} />{change >= 0 ? '+' : ''}{change} this month
    </span>
  </div>
)

/* ─── Skeleton ───────────────────────────────────────────────────── */
const Skeleton = ({ h = 20, w = '100%', mb = 0 }) => (
  <div style={{
    height: h, width: w, borderRadius: 6, marginBottom: mb,
    background: 'linear-gradient(90deg, var(--color-surface-2) 25%, var(--color-surface-3) 50%, var(--color-surface-2) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear'
  }} />
)

/* ─── Helper ─────────────────────────────────────────────────────── */
const statusBadge = (s) => {
  const map = {
    New: 'badge-info', 'In Discussion': 'badge-warning',
    Confirmed: 'badge-primary', Completed: 'badge-success'
  }
  return map[s] || 'badge-neutral'
}

const payBadge = (s) => {
  const map = { Pending: 'badge-warning', Partial: 'badge-info', Paid: 'badge-success' }
  return map[s] || 'badge-neutral'
}

const PIE_COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']

/* ─── Dashboard ─────────────────────────────────────────────────── */
const Dashboard = () => {
  const [clients, setClients] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [cl, co] = await Promise.all([getClients(), getContacts()])
        setClients(cl.data)
        setContacts(co.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  /* ── Derived Stats ── */
  const totalRevenue    = clients.reduce((s, c) => s + (c.price || 0), 0)
  const totalCollected  = clients.reduce((s, c) => s + (c.advance || 0), 0)
  const totalPending    = clients.reduce((s, c) => s + (c.remaining || 0), 0)
  const completedCount  = clients.filter(c => c.status === 'Completed').length
  const newContacts     = contacts.filter(c => c.status === 'New').length

  /* ── Status Distribution ── */
  const statusData = ['New', 'In Discussion', 'Confirmed', 'Completed'].map(s => ({
    name: s, value: clients.filter(c => c.status === s).length
  })).filter(d => d.value > 0)

  /* ── Monthly revenue from createdAt ── */
  const monthlyMap = {}
  clients.forEach(c => {
    const mon = format(new Date(c.createdAt), 'MMM')
    monthlyMap[mon] = (monthlyMap[mon] || 0) + (c.price || 0)
  })
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const revenueData = months
    .filter(m => monthlyMap[m] !== undefined)
    .map(m => ({ month: m, revenue: monthlyMap[m] }))

  /* ── Payment chart ── */
  const payData = [
    { name: 'Collected', amount: totalCollected },
    { name: 'Pending',   amount: totalPending },
  ]

  const recentClients = [...clients]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)

  return (
    <div>
      <style>{`
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
      `}</style>

      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with CodeSpark.</p>
        </div>
        <Link to="/clients" className="btn btn-primary" id="dash-add-client">
          <Users size={15} /> Add Client
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      {loading ? (
        <div className="stat-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="stat-card">
              <Skeleton h={40} mb={12} />
              <Skeleton h={20} w="60%" />
            </div>
          ))}
        </div>
      ) : (
        <div className="stat-grid">
          <StatCard
            icon={Users} label="Total Clients" value={clients.length}
            color="#6366f1" gradient="var(--gradient-primary)" change={clients.length}
          />
          <StatCard
            icon={DollarSign} label="Total Revenue" value={`₹${(totalRevenue/1000).toFixed(0)}K`}
            color="#10b981" gradient="linear-gradient(135deg,#10b981,#06b6d4)" change={totalRevenue > 0 ? '+' : 0}
          />
          <StatCard
            icon={Clock} label="Pending Amount" value={`₹${(totalPending/1000).toFixed(0)}K`}
            color="#f59e0b" gradient="linear-gradient(135deg,#f59e0b,#ef4444)" change={0}
          />
          <StatCard
            icon={MessageSquare} label="New Inquiries" value={newContacts}
            color="#06b6d4" gradient="var(--gradient-secondary)" change={newContacts}
          />
        </div>
      )}

      {/* ── Charts Row ── */}
      <div className="content-grid" style={{ marginBottom: 24 }}>
        {/* Revenue Area Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Revenue Overview</h3>
            <span className="badge badge-success">This Year</span>
          </div>
          <div className="card-body">
            {loading ? <Skeleton h={260} /> : (
              revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false}
                      tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1"
                      strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: '#6366f1', r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-state" style={{ padding: 40 }}>
                  <TrendingUp size={40} />
                  <p>No revenue data yet</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Project Status Pie */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Project Status</h3>
            <span className="badge badge-primary">{clients.length} Projects</span>
          </div>
          <div className="card-body">
            {loading ? <Skeleton h={260} /> : (
              statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                      paddingAngle={3} dataKey="value">
                      {statusData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={v => (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{v}</span>
                    )} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-state" style={{ padding: 40 }}>
                  <CheckCircle size={40} />
                  <p>No projects yet</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Payment Bar Chart ── */}
      <div className="content-grid" style={{ marginBottom: 24, gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Payment Summary</h3>
          </div>
          <div className="card-body">
            {loading ? <Skeleton h={200} /> : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={payData} barCategoryGap="40%" margin={{ top:5, right:10, left:0, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fontSize:11, fill:'#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize:11, fill:'#64748b' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" name="Amount" radius={[6,6,0,0]}>
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Inquiries</h3>
            <Link to="/contacts" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="card-body" style={{ padding: '16px 20px' }}>
            {loading ? (
              [1,2,3].map(i => <Skeleton key={i} h={44} mb={8} />)
            ) : recentContacts.length === 0 ? (
              <div className="empty-state"><AlertCircle size={32} /><p>No inquiries yet</p></div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {recentContacts.map(c => (
                  <div key={c._id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div className="avatar" style={{ width:34, height:34, fontSize:'0.75rem' }}>
                      {c.name?.slice(0,2).toUpperCase()}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:'0.85rem', fontWeight:600, color:'var(--text-primary)',
                        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {c.name}
                      </div>
                      <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>
                        {c.projectType || 'General inquiry'}
                      </div>
                    </div>
                    <span className={`badge ${c.status === 'New' ? 'badge-info' : c.status === 'Contacted' ? 'badge-success' : 'badge-neutral'}`}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Recent Clients Table ── */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Clients</h3>
          <Link to="/clients" className="btn btn-secondary btn-sm">View All</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Project</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1,2,3].map(i => (
                    <tr key={i}>
                      {[1,2,3,4,5,6].map(j => (
                        <td key={j}><Skeleton h={14} /></td>
                      ))}
                    </tr>
                  ))
                : recentClients.length === 0
                ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state"><Users size={36} /><h3>No clients yet</h3><p>Add your first client to get started</p></div>
                    </td>
                  </tr>
                )
                : recentClients.map(c => (
                    <tr key={c._id}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div className="avatar" style={{ width:32, height:32, fontSize:'0.72rem' }}>
                            {c.name?.slice(0,2).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight:600, color:'var(--text-primary)', fontSize:'0.85rem' }}>{c.name}</div>
                            <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{c.email || c.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color:'var(--text-primary)', fontWeight:500 }}>{c.projectName || '—'}</td>
                      <td style={{ color:'var(--color-success)', fontWeight:600 }}>₹{c.price?.toLocaleString()}</td>
                      <td><span className={`badge ${payBadge(c.paymentStatus)}`}>{c.paymentStatus}</span></td>
                      <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                      <td style={{ fontSize:'0.78rem' }}>{format(new Date(c.createdAt), 'dd MMM yyyy')}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
