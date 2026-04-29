import { useState, useEffect } from 'react'
import {
  Plus, Search, Pencil, Trash2, Eye, X, Phone,
  Mail, Building2, MapPin, Calendar, DollarSign,
  ChevronDown, Filter, Users
} from 'lucide-react'
import {
  getClients, createClient, updateClient, deleteClient
} from '../services/api'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

/* ─── Helpers ───────────────────────────────────────────────────── */
const statusBadge  = s =>
  ({ New:'badge-info','In Discussion':'badge-warning',Confirmed:'badge-primary',Completed:'badge-success' })[s] || 'badge-neutral'
const payBadge = s =>
  ({ Pending:'badge-warning',Partial:'badge-info',Paid:'badge-success' })[s] || 'badge-neutral'

const EMPTY_FORM = {
  name:'', phone:'', email:'', company:'', website:'', address:'', city:'', state:'', country:'',
  projectName:'', projectType:'', price:'', advance:'', remaining:'',
  paymentStatus:'Pending', deadline:'', status:'New', notes:''
}

/* ─── Client Form Modal ─────────────────────────────────────────── */
const ClientModal = ({ open, onClose, initial = null, onSaved }) => {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initial) {
      setForm({
        ...EMPTY_FORM, ...initial,
        deadline: initial.deadline ? format(new Date(initial.deadline), 'yyyy-MM-dd') : '',
        price: initial.price ?? '',
        advance: initial.advance ?? '',
        remaining: initial.remaining ?? '',
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [initial, open])

  const set = (e) => {
    const { name, value } = e.target
    setForm(f => {
      const updated = { ...f, [name]: value }
      if (name === 'price' || name === 'advance') {
        const p = parseFloat(updated.price) || 0
        const a = parseFloat(updated.advance) || 0
        updated.remaining = p - a
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.price) {
      toast.error('Name, phone and price are required')
      return
    }
    setLoading(true)
    try {
      if (initial) {
        await updateClient(initial._id, form)
        toast.success('Client updated successfully!')
      } else {
        await createClient(form)
        toast.success('Client added successfully!')
      }
      onSaved()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2 className="modal-title">{initial ? 'Edit Client' : 'Add New Client'}</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* ── Personal Info ── */}
            <p style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase',
              letterSpacing:'0.1em', color:'var(--text-muted)', marginBottom:12 }}>
              Personal Information
            </p>
            <div className="form-grid" style={{ marginBottom:0 }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input name="name" value={form.name} onChange={set} className="form-input" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input name="phone" value={form.phone} onChange={set} className="form-input" placeholder="+91 98765 43210" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input name="email" type="email" value={form.email} onChange={set} className="form-input" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input name="company" value={form.company} onChange={set} className="form-input" placeholder="Acme Corp" />
              </div>
              <div className="form-group">
                <label className="form-label">Website</label>
                <input name="website" value={form.website} onChange={set} className="form-input" placeholder="https://example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input name="city" value={form.city} onChange={set} className="form-input" placeholder="Mumbai" />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input name="state" value={form.state} onChange={set} className="form-input" placeholder="Maharashtra" />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input name="country" value={form.country} onChange={set} className="form-input" placeholder="India" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input name="address" value={form.address} onChange={set} className="form-input" placeholder="123 Main Street" />
            </div>

            {/* ── Project Info ── */}
            <p style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase',
              letterSpacing:'0.1em', color:'var(--text-muted)', margin:'16px 0 12px' }}>
              Project Information
            </p>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input name="projectName" value={form.projectName} onChange={set} className="form-input" placeholder="E-Commerce Website" />
              </div>
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select name="projectType" value={form.projectType} onChange={set} className="form-select">
                  <option value="">Select type…</option>
                  {['Web Design','Web Development','Mobile App','E-Commerce','SEO','Branding','Other']
                    .map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Total Price (₹) *</label>
                <input name="price" type="number" value={form.price} onChange={set} className="form-input" placeholder="50000" required />
              </div>
              <div className="form-group">
                <label className="form-label">Advance Paid (₹)</label>
                <input name="advance" type="number" value={form.advance} onChange={set} className="form-input" placeholder="20000" />
              </div>
              <div className="form-group">
                <label className="form-label">Remaining (₹) — auto</label>
                <input name="remaining" type="number" value={form.remaining} onChange={set} className="form-input"
                  style={{ color:'var(--color-warning)' }} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input name="deadline" type="date" value={form.deadline} onChange={set} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Payment Status</label>
                <select name="paymentStatus" value={form.paymentStatus} onChange={set} className="form-select">
                  {['Pending','Partial','Paid'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Project Status</label>
                <select name="status" value={form.status} onChange={set} className="form-select">
                  {['New','In Discussion','Confirmed','Completed'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea name="notes" value={form.notes} onChange={set} className="form-textarea"
                placeholder="Any additional notes about this client…" rows={3} />
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading} id="save-client-btn">
              {loading ? 'Saving…' : (initial ? 'Update Client' : 'Add Client')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── View Modal ─────────────────────────────────────────────────── */
const ViewModal = ({ client, onClose }) => {
  if (!client) return null
  const rows = [
    ['Phone', client.phone], ['Email', client.email || '—'],
    ['Company', client.company || '—'], ['Website', client.website || '—'],
    ['City', client.city || '—'], ['State', client.state || '—'],
    ['Country', client.country || '—'], ['Address', client.address || '—'],
    ['Project', client.projectName || '—'], ['Type', client.projectType || '—'],
    ['Price', `₹${client.price?.toLocaleString()}`],
    ['Advance', `₹${client.advance?.toLocaleString()}`],
    ['Remaining', `₹${client.remaining?.toLocaleString()}`],
    ['Deadline', client.deadline ? format(new Date(client.deadline),'dd MMM yyyy') : '—'],
  ]
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div className="avatar">{client.name?.slice(0,2).toUpperCase()}</div>
            <div>
              <h2 className="modal-title">{client.name}</h2>
              <div style={{ display:'flex', gap:8, marginTop:4 }}>
                <span className={`badge ${statusBadge(client.status)}`}>{client.status}</span>
                <span className={`badge ${payBadge(client.paymentStatus)}`}>{client.paymentStatus}</span>
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            {rows.map(([label, value]) => (
              <div key={label} className="detail-item">
                <span className="detail-label">{label}</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
          {client.notes && (
            <div style={{ marginTop:16, padding:'12px 16px',
              background:'var(--color-surface-2)', borderRadius:8,
              border:'1px solid var(--color-border)' }}>
              <p style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase',
                letterSpacing:'0.07em', color:'var(--text-muted)', marginBottom:6 }}>Notes</p>
              <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.6 }}>{client.notes}</p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Delete Confirm ─────────────────────────────────────────────── */
const DeleteModal = ({ client, onClose, onConfirm, loading }) => {
  if (!client) return null
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ color:'var(--color-danger)' }}>Delete Client</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <p style={{ color:'var(--text-secondary)' }}>
            Are you sure you want to delete <strong style={{ color:'var(--text-primary)' }}>{client.name}</strong>?
            This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading} id="confirm-delete-btn">
            {loading ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Clients Page ───────────────────────────────────────────────── */
const Clients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPay, setFilterPay] = useState('')

  const [addOpen, setAddOpen]       = useState(false)
  const [editClient, setEditClient] = useState(null)
  const [viewClient, setViewClient] = useState(null)
  const [delClient, setDelClient]   = useState(null)
  const [delLoading, setDelLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getClients()
      setClients(data)
    } catch { toast.error('Failed to load clients') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async () => {
    setDelLoading(true)
    try {
      await deleteClient(delClient._id)
      toast.success('Client deleted')
      setDelClient(null)
      load()
    } catch { toast.error('Delete failed') }
    finally { setDelLoading(false) }
  }

  const filtered = clients.filter(c => {
    const q = search.toLowerCase()
    const matchQ = !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
      || c.phone?.includes(q) || c.projectName?.toLowerCase().includes(q)
    const matchS = !filterStatus || c.status === filterStatus
    const matchP = !filterPay || c.paymentStatus === filterPay
    return matchQ && matchS && matchP
  })

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1>Clients</h1>
          <p>{clients.length} total clients in your database</p>
        </div>
        <button className="btn btn-primary" onClick={() => setAddOpen(true)} id="add-client-btn">
          <Plus size={15} /> Add Client
        </button>
      </div>

      {/* Table Card */}
      <div className="card">
        {/* Filters */}
        <div className="filters-bar">
          <div className="search-input-wrap" style={{ maxWidth: 280 }}>
            <Search size={14} color="var(--text-muted)" />
            <input
              placeholder="Search clients…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="client-search"
            />
          </div>
          <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} id="status-filter">
            <option value="">All Status</option>
            {['New','In Discussion','Confirmed','Completed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="filter-select" value={filterPay} onChange={e => setFilterPay(e.target.value)} id="pay-filter">
            <option value="">All Payments</option>
            {['Pending','Partial','Paid'].map(s => <option key={s}>{s}</option>)}
          </select>
          {(search || filterStatus || filterPay) && (
            <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setFilterStatus(''); setFilterPay('') }}>
              <X size={13} /> Clear
            </button>
          )}
          <span style={{ marginLeft:'auto', fontSize:'0.78rem', color:'var(--text-muted)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Project</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1,2,3,4,5].map(i => (
                    <tr key={i}>
                      {[1,2,3,4,5,6,7,8].map(j => (
                        <td key={j}><div style={{ height:14, background:'var(--color-surface-2)',
                          borderRadius:4, animation:'pulse 1.5s ease infinite' }} /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                ? (
                  <tr><td colSpan={8}>
                    <div className="empty-state">
                      <Users size={40} />
                      <h3>No clients found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td></tr>
                )
                : filtered.map(c => (
                  <tr key={c._id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div className="avatar" style={{ width:33, height:33, fontSize:'0.72rem' }}>
                          {c.name?.slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight:600, color:'var(--text-primary)', fontSize:'0.85rem' }}>{c.name}</div>
                          <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>{c.company || 'Individual'}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize:'0.8rem' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5, color:'var(--text-secondary)' }}>
                          <Phone size={11} />{c.phone}
                        </div>
                        {c.email && (
                          <div style={{ display:'flex', alignItems:'center', gap:5, color:'var(--text-muted)', fontSize:'0.72rem', marginTop:2 }}>
                            <Mail size={10} />{c.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight:500, color:'var(--text-primary)', fontSize:'0.85rem' }}>{c.projectName || '—'}</div>
                      <div style={{ fontSize:'0.7rem', color:'var(--text-muted)' }}>{c.projectType || ''}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight:700, color:'var(--color-success)', fontSize:'0.9rem' }}>₹{c.price?.toLocaleString()}</div>
                      <div style={{ fontSize:'0.7rem', color:'var(--color-warning)' }}>₹{c.remaining?.toLocaleString()} left</div>
                    </td>
                    <td><span className={`badge ${payBadge(c.paymentStatus)}`}>{c.paymentStatus}</span></td>
                    <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
                    <td style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>
                      {c.deadline ? format(new Date(c.deadline),'dd MMM yy') : '—'}
                    </td>
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button className="btn btn-icon btn-secondary btn-sm" title="View"
                          onClick={() => setViewClient(c)}><Eye size={13} /></button>
                        <button className="btn btn-icon btn-secondary btn-sm" title="Edit"
                          onClick={() => setEditClient(c)}><Pencil size={13} /></button>
                        <button className="btn btn-icon btn-danger btn-sm" title="Delete"
                          onClick={() => setDelClient(c)}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ClientModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={load}
      />
      <ClientModal
        open={!!editClient}
        initial={editClient}
        onClose={() => setEditClient(null)}
        onSaved={load}
      />
      <ViewModal
        client={viewClient}
        onClose={() => setViewClient(null)}
      />
      <DeleteModal
        client={delClient}
        onClose={() => setDelClient(null)}
        onConfirm={handleDelete}
        loading={delLoading}
      />
    </div>
  )
}

export default Clients
