import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
  const navigate = useNavigate()

  return (
    <div style={{ position: 'relative' }}>
      {/* Botão flutuante "← Início" */}
      <div style={{
        position: 'fixed',
        top: '14px',
        left: '14px',
        zIndex: 9999,
      }}>
        <button
          onClick={() => navigate('/')}
          title="Voltar ao início"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '20px',
            border: 'none',
            background: 'rgba(15, 23, 42, 0.82)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'white',
            fontSize: '0.78rem',
            fontWeight: '700',
            fontFamily: 'system-ui, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 2px 14px rgba(0,0,0,0.28)',
            letterSpacing: '0.01em',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(15,23,42,0.96)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(15,23,42,0.82)'}
        >
          ← Início
        </button>
      </div>

      {children}
    </div>
  )
}
