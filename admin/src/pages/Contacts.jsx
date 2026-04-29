import { useState, useEffect } from 'react'
import { Search, Eye, Trash2, X, MessageSquare, Phone, Mail, DollarSign } from 'lucide-react'
import { getContacts, deleteContact } from '../services/api'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import API from '../services/api'

/* ── View Modal ────────────────────────────────────────────────── */
const ViewModal = ({ contact, onClose }) => {
  if (!contact) return null
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal" style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{contact.name}</h2>
            <span className={`badge ${contact.status==='New'?'badge-info':contact.status==='Contacted'?'badge-success':'badge-neutral'}`}
              style={{ marginTop:4, display:'inline-flex' }}>
              {contact.status}
            </span>
          </div>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <div className="detail-grid" style={{ marginBottom:16 }}>
            {[
              ['Email', contact.email],
              ['Phone', contact.phone || '—'],
              ['Project Type', contact.projectType || '—'],
              ['Budget', contact.budget ? `₹${contact.budget.toLocaleString()}` : '—'],
              ['Received', format(new Date(contact.createdAt), 'dd MMM yyyy, hh:mm a')],
            ].map(([l, v]) => (
              <div key={l} className="detail-item">
                <span className="detail-label">{l}</span>
                <span className="detail-value">{v}</span>
              </div>
            ))}
          </div>
          {contact.message && (
            <div style={{ padding:'14px 16px', background:'var(--color-surface-2)',
              borderRadius:8, border:'1px solid var(--color-border)' }}>
              <p style={{ fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase',
                letterSpacing:'0.07em', color:'var(--text-muted)', marginBottom:8 }}>Message</p>
              <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.7 }}>
                {contact.message}
              </p>
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

/* ── Delete Confirm ─────────────────────────────────────────────── */
const DeleteModal = ({ contact, onClose, onConfirm, loading }) => {
  if (!contact) return null
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal" style={{ maxWidth:420 }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ color:'var(--color-danger)' }}>Delete Contact</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <p style={{ color:'var(--text-secondary)' }}>
            Delete inquiry from <strong style={{ color:'var(--text-primary)' }}>{contact.name}</strong>? This cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Contacts Page ──────────────────────────────────────────────── */
const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filterStatus, setFS]   = useState('')
  const [view, setView]         = useState(null)
  const [del, setDel]           = useState(null)
  const [delLoading, setDL]     = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await getContacts()
      setContacts(data)
    } catch { toast.error('Failed to load contacts') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleStatusChange = async (id, status) => {
    try {
      // Using PUT on contact — backend may not have this, so we do a partial update
      await API.put(`/contact/${id}`, { status })
      setContacts(c => c.map(x => x._id === id ? { ...x, status } : x))
      toast.success('Status updated')
    } catch {
      toast.error('Could not update status')
    }
  }

  const handleDelete = async () => {
    setDL(true)
    try {
      await deleteContact(del._id)
      toast.success('Contact deleted')
      setDel(null)
      load()
    } catch { toast.error('Delete failed') }
    finally { setDL(false) }
  }

  const filtered = contacts.filter(c => {
    const q = search.toLowerCase()
    const mQ = !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
      || c.phone?.includes(q) || c.projectType?.toLowerCase().includes(q)
    const mS = !filterStatus || c.status === filterStatus
    return mQ && mS
  })

  const newCount = contacts.filter(c => c.status === 'New').length

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Contacts</h1>
          <p>{newCount} new inquiries · {contacts.length} total</p>
        </div>
      </div>

      {/* Summary mini-cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'New',       color:'var(--color-info)',    count: contacts.filter(c=>c.status==='New').length },
          { label:'Contacted', color:'var(--color-success)', count: contacts.filter(c=>c.status==='Contacted').length },
          { label:'Closed',    color:'var(--text-muted)',    count: contacts.filter(c=>c.status==='Closed').length },
        ].map(({ label, color, count }) => (
          <div key={label} className="card" style={{ padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:'1.6rem', fontWeight:800, color, fontFamily:'var(--font-heading)' }}>{count}</div>
              <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginTop:2 }}>{label}</div>
            </div>
            <MessageSquare size={28} color={color} opacity={0.4} />
          </div>
        ))}
      </div>

      <div className="card">
        {/* Filters */}
        <div className="filters-bar">
          <div className="search-input-wrap" style={{ maxWidth:280 }}>
            <Search size={14} color="var(--text-muted)" />
            <input
              placeholder="Search contacts…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="contact-search"
            />
          </div>
          <select className="filter-select" value={filterStatus} onChange={e => setFS(e.target.value)} id="contact-status-filter">
            <option value="">All Status</option>
            {['New','Contacted','Closed'].map(s => <option key={s}>{s}</option>)}
          </select>
          {(search || filterStatus) && (
            <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setFS('') }}>
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
                <th>Name</th>
                <th>Contact Info</th>
                <th>Project Type</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Received</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1,2,3,4].map(i => (
                    <tr key={i}>
                      {[1,2,3,4,5,6,7].map(j => (
                        <td key={j}><div style={{ height:13, background:'var(--color-surface-2)', borderRadius:4, animation:'pulse 1.5s ease infinite' }} /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                ? (
                  <tr><td colSpan={7}>
                    <div className="empty-state">
                      <MessageSquare size={36} />
                      <h3>No contacts found</h3>
                      <p>Inquiries from your website will appear here</p>
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
                        <span style={{ fontWeight:600, color:'var(--text-primary)', fontSize:'0.85rem' }}>{c.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.8rem', color:'var(--text-secondary)' }}>
                          <Mail size={11} />{c.email}
                        </div>
                        {c.phone && (
                          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.75rem', color:'var(--text-muted)' }}>
                            <Phone size={10} />{c.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ fontSize:'0.85rem', color:'var(--text-secondary)' }}>{c.projectType || '—'}</td>
                    <td style={{ fontSize:'0.85rem', color:'var(--color-success)', fontWeight:600 }}>
                      {c.budget ? `₹${c.budget.toLocaleString()}` : '—'}
                    </td>
                    <td>
                      <select
                        value={c.status}
                        onChange={e => handleStatusChange(c._id, e.target.value)}
                        className="filter-select"
                        style={{ fontSize:'0.78rem', padding:'4px 10px' }}
                      >
                        {['New','Contacted','Closed'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>
                      {format(new Date(c.createdAt), 'dd MMM yyyy')}
                    </td>
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button className="btn btn-icon btn-secondary btn-sm" title="View" onClick={() => setView(c)}>
                          <Eye size={13} />
                        </button>
                        <button className="btn btn-icon btn-danger btn-sm" title="Delete" onClick={() => setDel(c)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <ViewModal contact={view} onClose={() => setView(null)} />
      <DeleteModal contact={del} onClose={() => setDel(null)} onConfirm={handleDelete} loading={delLoading} />
    </div>
  )
}

export default Contacts
