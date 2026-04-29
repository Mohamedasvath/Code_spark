import { useState, useEffect } from 'react'
import { Plus, FileText, Trash2, Download, X, Search, Eye, Building2, MapPin, Mail, Phone } from 'lucide-react'
import { getClients, createInvoice, downloadInvoice, deleteInvoice } from '../services/api'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import API from '../services/api'

/* ── Create Invoice Modal ───────────────────────────────────────── */
const CreateModal = ({ open, onClose, clients, onSaved }) => {
  const [form, setForm] = useState({ clientId:'', projectName:'', price:'', advance:'', remaining:'', invoiceNumber:'' })
  const [loading, setLoading] = useState(false)

  const set = (e) => {
    const { name, value } = e.target
    setForm(f => {
      const u = { ...f, [name]: value }
      if (name === 'clientId' && value) {
        const cl = clients.find(c => c._id === value)
        if (cl) {
          u.projectName = cl.projectName || ''
          u.price       = cl.price       || ''
          u.advance     = cl.advance     || ''
          u.remaining   = cl.remaining   || ''
        }
      }
      if (name === 'price' || name === 'advance') {
        const p = parseFloat(u.price) || 0
        const a = parseFloat(u.advance) || 0
        u.remaining = p - a
      }
      return u
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.clientId || !form.projectName || !form.price) {
      toast.error('Client, project name and price are required')
      return
    }
    setLoading(true)
    try {
      await createInvoice(form)
      toast.success('Invoice created!')
      setForm({ clientId:'', projectName:'', price:'', advance:'', remaining:'', invoiceNumber:'' })
      onSaved()
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create invoice')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal" style={{ maxWidth:560 }}>
        <div className="modal-header">
          <h2 className="modal-title">Create Invoice</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Select Client *</label>
              <select name="clientId" value={form.clientId} onChange={set} className="form-select" required>
                <option value="">Choose a client…</option>
                {clients.map(c => (
                  <option key={c._id} value={c._id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Invoice Number</label>
              <input name="invoiceNumber" value={form.invoiceNumber} onChange={set} className="form-input"
                placeholder={`INV-${new Date().getFullYear()}-001`} />
            </div>
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input name="projectName" value={form.projectName} onChange={set} className="form-input"
                placeholder="Project name" required />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Total Price (₹) *</label>
                <input name="price" type="number" value={form.price} onChange={set} className="form-input"
                  placeholder="50000" required />
              </div>
              <div className="form-group">
                <label className="form-label">Advance Paid (₹)</label>
                <input name="advance" type="number" value={form.advance} onChange={set} className="form-input"
                  placeholder="20000" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Remaining (₹) — auto-calculated</label>
              <input name="remaining" type="number" value={form.remaining} onChange={set} className="form-input"
                style={{ color:'var(--color-warning)' }} readOnly />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading} id="create-invoice-btn">
              {loading ? 'Creating…' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Delete Confirm ─────────────────────────────────────────────── */
const DeleteModal = ({ invoice, onClose, onConfirm, loading }) => {
  if (!invoice) return null
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal" style={{ maxWidth:420 }}>
        <div className="modal-header">
          <h2 className="modal-title" style={{ color:'var(--color-danger)' }}>Delete Invoice</h2>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <p style={{ color:'var(--text-secondary)' }}>
            Delete invoice <strong style={{ color:'var(--text-primary)' }}>{invoice.invoiceNumber || invoice._id.slice(-6)}</strong>? This action cannot be undone.
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

/* ── Invoice Preview Modal ──────────────────────────────────────── */
const PreviewModal = ({ invoice, clientName, onClose, onDownload, downloading }) => {
  if (!invoice) return null
  const client = invoice.clientId || {}
  
  return (
    <div className="modal-overlay" onClick={e => { if(e.target===e.currentTarget) onClose() }}>
      <div className="modal" style={{ maxWidth: 800, padding: 0, overflow: 'hidden' }}>
        {/* Header Ribbon */}
        <div style={{ background: 'var(--gradient-primary)', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 12 }}>
               CodeSpark <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8, borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: 12 }}>Invoice</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" onClick={() => onDownload(invoice._id, invoice.invoiceNumber)} disabled={downloading === invoice._id}
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              <Download size={16} /> {downloading === invoice._id ? 'Preparing...' : 'Download PDF'}
            </button>
            <button className="btn btn-icon" onClick={onClose} style={{ background: 'transparent', color: 'white' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div style={{ padding: '40px', background: '#ffffff', color: '#1f2937' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
            {/* From */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>From</p>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', marginBottom: 4 }}>CodeSpark Agency</h3>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>
                123 Creative Street<br/>Tech Hub, Mumbai 400001<br/>
                contact@codespark.com<br/>+91 98765 43210
              </p>
            </div>
            {/* Meta */}
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f3f4f6', textTransform: 'uppercase', marginBottom: 8 }}>Invoice</h1>
              <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: 4 }}><span style={{ fontWeight: 600, color: '#111827' }}>Invoice No:</span> {invoice.invoiceNumber || invoice._id.toString().slice(-6).toUpperCase()}</p>
              <p style={{ fontSize: '0.95rem', color: '#4b5563', marginBottom: 4 }}><span style={{ fontWeight: 600, color: '#111827' }}>Date:</span> {format(new Date(invoice.createdAt || invoice.date), 'dd MMM yyyy')}</p>
              <p style={{ fontSize: '0.95rem', color: '#4b5563' }}><span style={{ fontWeight: 600, color: '#111827' }}>Status:</span> 
                <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, background: invoice.remaining === 0 ? '#d1fae5' : '#fee2e2', color: invoice.remaining === 0 ? '#059669' : '#dc2626' }}>
                  {invoice.remaining === 0 ? 'PAID' : 'DUE'}
                </span>
              </p>
            </div>
          </div>

          {/* To */}
          <div style={{ marginBottom: 40, padding: '20px', background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Billed To</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', marginBottom: 4 }}>{clientName} {client.company ? `(${client.company})` : ''}</h3>
            <div style={{ display: 'flex', gap: 24, fontSize: '0.9rem', color: '#4b5563', marginTop: 12 }}>
              {client.email && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> {client.email}</div>}
              {client.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} /> {client.phone}</div>}
              {client.address && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {client.address}</div>}
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px 0', color: '#374151', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
                <th style={{ textAlign: 'right', padding: '12px 0', color: '#374151', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '20px 0', fontSize: '1.05rem', fontWeight: 500, color: '#111827' }}>
                  {invoice.projectName || 'Web Development Service'}
                </td>
                <td style={{ padding: '20px 0', textAlign: 'right', fontSize: '1.05rem', fontWeight: 600, color: '#111827' }}>
                  ₹{(invoice.price || 0).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: 320 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem' }}>
                <span style={{ color: '#4b5563' }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#111827' }}>₹{(invoice.price || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem' }}>
                <span style={{ color: '#4b5563' }}>Advance Paid</span>
                <span style={{ fontWeight: 600, color: '#059669' }}>- ₹{(invoice.advance || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '1.2rem' }}>
                <span style={{ fontWeight: 700, color: '#111827' }}>Balance Due</span>
                <span style={{ fontWeight: 800, color: '#dc2626' }}>₹{(invoice.remaining || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: 60, textAlign: 'center', fontSize: '0.85rem', color: '#9ca3af', borderTop: '1px solid #e5e7eb', paddingTop: 24 }}>
            <p>Thank you for choosing CodeSpark. We appreciate your business!</p>
            <p>For support, contact us at +91 98765 43210</p>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ── Invoices Page ──────────────────────────────────────────────── */
const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [clients, setClients]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [createOpen, setCreate] = useState(false)
  const [preview, setPreview]   = useState(null)
  const [delInvoice, setDel]    = useState(null)
  const [delLoading, setDL]     = useState(false)
  const [dlLoading, setDlL]     = useState(null)

  const loadInvoices = async () => {
    setLoading(true)
    try {
      const [inv, cl] = await Promise.all([
        API.get('/invoices'),
        getClients()
      ])
      setInvoices(inv.data)
      setClients(cl.data)
    } catch {
      toast.error('Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadInvoices() }, [])

  const handleDownload = async (id, name) => {
    setDlL(id)
    try {
      const res = await downloadInvoice(id)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${name || id}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
      toast.success('Invoice downloaded!')
    } catch {
      toast.error('Download failed — PDF may not be generated by backend')
    } finally {
      setDlL(null)
    }
  }

  const handleDelete = async () => {
    setDL(true)
    try {
      await deleteInvoice(delInvoice._id)
      toast.success('Invoice deleted')
      setDel(null)
      loadInvoices()
    } catch { toast.error('Delete failed') }
    finally { setDL(false) }
  }

  const getClientName = (inv) => {
    if (inv.clientId?.name) return inv.clientId.name
    const cl = clients.find(c => c._id === (inv.clientId?._id || inv.clientId))
    return cl?.name || '—'
  }

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase()
    return !q || inv.projectName?.toLowerCase().includes(q)
      || inv.invoiceNumber?.toLowerCase().includes(q)
      || getClientName(inv).toLowerCase().includes(q)
  })

  const totalRevenue = invoices.reduce((s, i) => s + (i.price || 0), 0)
  const totalCollected = invoices.reduce((s, i) => s + (i.advance || 0), 0)
  const totalPending = invoices.reduce((s, i) => s + (i.remaining || 0), 0)

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Invoices</h1>
          <p>{invoices.length} invoices · ₹{totalRevenue.toLocaleString()} total billed</p>
        </div>
        <button className="btn btn-primary" onClick={() => setCreate(true)} id="create-invoice-open-btn">
          <Plus size={15} /> Create Invoice
        </button>
      </div>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Total Billed',    value:`₹${totalRevenue.toLocaleString()}`,   color:'var(--color-primary-light)' },
          { label:'Collected',       value:`₹${totalCollected.toLocaleString()}`, color:'var(--color-success)' },
          { label:'Pending',         value:`₹${totalPending.toLocaleString()}`,   color:'var(--color-warning)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding:'16px 20px' }}>
            <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color, fontFamily:'var(--font-heading)' }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filters-bar">
          <div className="search-input-wrap" style={{ maxWidth:280 }}>
            <Search size={14} color="var(--text-muted)" />
            <input placeholder="Search invoices…" value={search}
              onChange={e => setSearch(e.target.value)} id="invoice-search" />
          </div>
          <span style={{ marginLeft:'auto', fontSize:'0.78rem', color:'var(--text-muted)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Project</th>
                <th>Total</th>
                <th>Advance</th>
                <th>Remaining</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [1,2,3].map(i => (
                    <tr key={i}>
                      {[1,2,3,4,5,6,7,8].map(j => (
                        <td key={j}><div style={{ height:13, background:'var(--color-surface-2)', borderRadius:4, animation:'pulse 1.5s ease infinite' }} /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                ? (
                  <tr><td colSpan={8}>
                    <div className="empty-state">
                      <FileText size={36} />
                      <h3>No invoices yet</h3>
                      <p>Create your first invoice to track billing</p>
                    </div>
                  </td></tr>
                )
                : filtered.map(inv => (
                  <tr key={inv._id}>
                    <td>
                      <span style={{ fontFamily:'monospace', fontSize:'0.82rem', color:'var(--color-primary-light)',
                        background:'var(--color-primary-glow)', padding:'3px 8px', borderRadius:4 }}>
                        {inv.invoiceNumber || `#${inv._id.slice(-6).toUpperCase()}`}
                      </span>
                    </td>
                    <td style={{ fontWeight:600, color:'var(--text-primary)', fontSize:'0.85rem' }}>
                      {getClientName(inv)}
                    </td>
                    <td style={{ fontSize:'0.85rem', color:'var(--text-secondary)' }}>{inv.projectName || '—'}</td>
                    <td style={{ color:'var(--text-primary)', fontWeight:700 }}>₹{inv.price?.toLocaleString()}</td>
                    <td style={{ color:'var(--color-success)', fontWeight:600 }}>₹{inv.advance?.toLocaleString()}</td>
                    <td style={{ color:'var(--color-warning)', fontWeight:600 }}>₹{inv.remaining?.toLocaleString()}</td>
                    <td style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>
                      {format(new Date(inv.date || inv.createdAt), 'dd MMM yyyy')}
                    </td>
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button
                          className="btn btn-icon btn-secondary btn-sm"
                          title="Preview Invoice"
                          onClick={() => setPreview(inv)}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          className="btn btn-icon btn-secondary btn-sm"
                          title="Download PDF"
                          onClick={() => handleDownload(inv._id, inv.invoiceNumber)}
                          disabled={dlLoading === inv._id}
                        >
                          <Download size={13} />
                        </button>
                        <button className="btn btn-icon btn-danger btn-sm" title="Delete"
                          onClick={() => setDel(inv)}>
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

      <CreateModal open={createOpen} onClose={() => setCreate(false)} clients={clients} onSaved={loadInvoices} />
      <PreviewModal invoice={preview} clientName={preview ? getClientName(preview) : ''} onClose={() => setPreview(null)} onDownload={handleDownload} downloading={dlLoading} />
      <DeleteModal invoice={delInvoice} onClose={() => setDel(null)} onConfirm={handleDelete} loading={delLoading} />
    </div>
  )
}

export default Invoices
