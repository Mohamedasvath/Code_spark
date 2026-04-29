import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ────────────────────────────────────────────────────────────
export const loginAdmin = (data) => API.post('/auth/login', data)
export const registerAdmin = (data) => API.post('/auth/register', data)

// ─── Clients ─────────────────────────────────────────────────────────
export const getClients    = ()       => API.get('/clients')
export const getClient     = (id)     => API.get(`/clients/${id}`)
export const createClient  = (data)   => API.post('/clients', data)
export const updateClient  = (id, d)  => API.put(`/clients/${id}`, d)
export const deleteClient  = (id)     => API.delete(`/clients/${id}`)

// ─── Contacts ────────────────────────────────────────────────────────
export const getContacts   = ()       => API.get('/contact')
export const getContact    = (id)     => API.get(`/contact/${id}`)
export const deleteContact = (id)     => API.delete(`/contact/${id}`)

// ─── Invoices ────────────────────────────────────────────────────────
export const createInvoice  = (data)  => API.post('/invoices', data)
export const downloadInvoice = (id)   => API.get(`/invoices/${id}`, { responseType: 'blob' })
export const deleteInvoice   = (id)   => API.delete(`/invoices/${id}`)

export default API
