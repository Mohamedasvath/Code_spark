import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Eye, EyeOff, LogIn, Loader, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { loginAdmin, registerAdmin } from '../services/api'
import toast from 'react-hot-toast'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      if (isLogin) {
        const { data } = await loginAdmin({ email: form.email, password: form.password })
        login(data.token, data.admin)
        toast.success(`Welcome back, ${data.admin.name}! 👋`)
        navigate('/')
      } else {
        await registerAdmin(form)
        toast.success('Registration successful. Please log in.')
        setIsLogin(true)
        setForm({ name: '', email: '', password: '' })
      }
    } catch (err) {
      toast.error(err.response?.data?.message || (isLogin ? 'Login failed. Check credentials.' : 'Registration failed.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Background orbs */}
      <div className="login-bg-orb login-bg-orb-1" />
      <div className="login-bg-orb login-bg-orb-2" />

      {/* Noise texture overlay */}
      <div style={{
        position:'absolute', inset:0, opacity:0.02,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents:'none'
      }} />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <Zap size={26} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'1.3rem',
              background:'var(--gradient-primary)', WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              CodeSpark
            </div>
            <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', marginTop:'-2px' }}>Admin Panel</div>
          </div>
        </div>

        <h1 className="login-title">{isLogin ? 'Welcome back' : 'Create an Account'}</h1>
        <p className="login-subtitle">
          {isLogin ? 'Sign in to your admin dashboard' : 'Register to manage your admin dashboard'}
        </p>

        <form onSubmit={handleSubmit} id="login-form">
          {/* Name */}
          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                autoFocus
              />
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="admin@codespark.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus={isLogin}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position:'relative' }}>
              <input
                id="password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                style={{
                  position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                  color:'var(--text-muted)', display:'flex', alignItems:'center'
                }}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width:'100%', justifyContent:'center', padding:'12px', marginTop:8, fontSize:'0.95rem' }}
          >
            {loading
              ? <><Loader size={16} className="animate-pulse" /> {isLogin ? 'Signing in…' : 'Registering…'}</>
              : <>{isLogin ? <LogIn size={16} /> : <UserPlus size={16} />} {isLogin ? 'Sign In' : 'Register'}</>
            }
          </button>
        </form>

        <div style={{ textAlign:'center', marginTop:16, fontSize:'0.85rem' }}>
          <span style={{ color:'var(--text-muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setForm({ name: '', email: '', password: '' })
            }}
            style={{ color:'var(--color-primary)', fontWeight:600 }}
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </div>

        <p style={{ textAlign:'center', marginTop:24, fontSize:'0.75rem', color:'var(--text-muted)' }}>
          Protected admin area · CodeSpark © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

export default Login
