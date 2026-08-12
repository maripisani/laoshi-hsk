import { useNavigate } from 'react-router-dom'

const MODULES = [
  {
    id: 'vocab',
    path: '/vocab',
    emoji: '📖',
    title: '词汇大纲',
    subtitle: 'Vocabulário Completo',
    desc: 'Browser de todos os vocábulos oficiais com pinyin colorido por tom, filtros por nível (HSK 1–9) e busca integrada.',
    stats: ['HSK 1 ao 9', '~11.000 palavras', 'GF0025-2021'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
    accent: '#3b82f6',
    badge: '📚 Vocabulário',
  },
  {
    id: 'hsk2',
    path: '/hsk2',
    emoji: '二',
    title: 'HSK 2',
    subtitle: 'Programa Completo',
    desc: '12 semanas estruturadas do nível básico: vocabulário, gramática com exemplos, diálogos bilíngues e quizzes corrigidos.',
    stats: ['12 semanas', '~772 palavras novas', '41 pontos gramaticais'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)',
    accent: '#6366F1',
    badge: '📗 Programa',
  },
  {
    id: 'hsk3',
    path: '/hsk3',
    emoji: '三',
    title: 'HSK 3',
    subtitle: 'Programa Completo',
    desc: '12 semanas do elementar ao pré-intermediário: estrutura 把, linguagem abstrata e opinião em mandarim.',
    stats: ['12 semanas', '~973 palavras novas', '44 pontos gramaticais'],
    gradient: 'linear-gradient(135deg, #2e1065 0%, #7c3aed 100%)',
    accent: '#7C3AED',
    badge: '📘 Programa',
  },
  {
    id: 'hsk4',
    path: '/hsk4',
    emoji: '四',
    title: 'HSK 4',
    subtitle: 'Programa Completo',
    desc: '12 semanas intermediário: conectivos formais, 成语 iniciais e primeiro contato com registro escrito culto.',
    stats: ['12 semanas', '~1.000 palavras novas', '45+ pontos gramaticais'],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338CA 100%)',
    accent: '#4338CA',
    badge: '📙 Programa',
  },
  {
    id: 'hsk5',
    path: '/hsk5',
    emoji: '五',
    title: 'HSK 5',
    subtitle: 'Programa Completo',
    desc: '12 semanas avançado: literatura, argumentação sofisticada, 成语 complexos e retórica formal.',
    stats: ['12 semanas', '~1.140 palavras novas', 'Nível avançado'],
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
    accent: '#dc2626',
    badge: '📕 Programa',
  },
  {
    id: 'hsk6',
    path: '/hsk6',
    emoji: '六',
    title: 'HSK 6',
    subtitle: 'Programa Completo',
    desc: '12 semanas quase-nativo: filosofia clássica, literatura 文言文 e domínio de registro acadêmico e jornalístico.',
    stats: ['12 semanas', '~1.140 palavras novas', 'Quase-nativo'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #374151 100%)',
    accent: '#6b7280',
    badge: '🏆 Programa',
  },
]

const STATS_GLOBAIS = [
  { v: '5', l: 'Programas' },
  { v: '60', l: 'Semanas' },
  { v: '~5.000', l: 'Palavras nos programas' },
  { v: '215+', l: 'Pontos gramaticais' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      background: '#FAFAF8',
      minHeight: '100vh',
    }}>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #0f172a 100%)',
        padding: 'clamp(32px,6vw,56px) 20px clamp(28px,5vw,44px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 'clamp(2rem,8vw,3.5rem)', marginBottom: '10px' }}>🇨🇳</div>
        <div style={{
          fontSize: '0.7rem', color: '#94a3b8',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Novo HSK 3.0 · GF0025-2021
        </div>
        <h1 style={{
          margin: '0 0 6px',
          color: '#f8fafc',
          fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          老师 · Laoshi
        </h1>
        <p style={{ margin: '0 0 28px', color: '#94a3b8', fontSize: 'clamp(0.85rem,2vw,1rem)' }}>
          Seu programa completo de mandarim — HSK 2 ao HSK 6
        </p>

        {/* Stats globais */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '10px', flexWrap: 'wrap',
        }}>
          {STATS_GLOBAIS.map(s => (
            <div key={s.l} style={{
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '12px',
              padding: '10px 20px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ color: '#f1f5f9', fontWeight: '800', fontSize: '1.2rem' }}>{s.v}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GRID DE MÓDULOS ────────────────────────────────── */}
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '32px 16px 52px' }}>

        <div style={{
          fontSize: '0.72rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#94a3b8',
          marginBottom: '18px',
        }}>
          Módulos disponíveis
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '14px',
        }}>
          {MODULES.map(m => (
            <ModuleCard key={m.id} module={m} onClick={() => navigate(m.path)} />
          ))}
        </div>

        {/* Nota HSK 1 */}
        <div style={{
          marginTop: '22px',
          background: '#FEF9C3',
          borderRadius: '12px',
          padding: '14px 18px',
          border: '1px solid #FDE047',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>📌</span>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#713f12', lineHeight: 1.5 }}>
            <strong>HSK 1:</strong> Disponível no módulo <em>Vocabulário Completo</em> — use o filtro &quot;HSK 1&quot; para explorar todas as 500 palavras com pinyin e tradução. Programa de 12 semanas HSK 1 em desenvolvimento.
          </p>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #E2E8F0',
        fontSize: '0.7rem',
        color: '#94a3b8',
        background: 'white',
      }}>
        老师 (Laoshi) · Novo HSK 3.0 · GF0025-2021
      </div>
    </div>
  )
}

// ── Card de módulo ───────────────────────────────────────
function ModuleCard({ module: m, onClick }) {
  const handleMouseEnter = e => {
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.boxShadow = `0 10px 30px ${m.accent}28`
    e.currentTarget.style.borderColor = m.accent
  }
  const handleMouseLeave = e => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'
    e.currentTarget.style.borderColor = '#E2E8F0'
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '18px',
        padding: '0',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Cabeçalho colorido */}
      <div style={{ background: m.gradient, padding: '22px 22px 18px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.68rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              {m.badge}
            </div>
            <div style={{
              color: 'white',
              fontWeight: '900',
              fontSize: 'clamp(1.6rem, 4vw, 2rem)',
              lineHeight: 1,
              marginTop: '6px',
              fontFamily: m.emoji.match(/[一-龯]/) ? "'Noto Serif SC', serif" : 'inherit',
            }}>
              {m.emoji}
            </div>
            <div style={{
              color: 'white',
              fontWeight: '800',
              fontSize: '1.15rem',
              marginTop: '4px',
            }}>
              {m.title}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
              {m.subtitle}
            </div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1.4rem', marginTop: '2px' }}>
            →
          </span>
        </div>
      </div>

      {/* Corpo */}
      <div style={{ padding: '16px 22px 18px', flex: 1 }}>
        <p style={{
          margin: '0 0 12px',
          fontSize: '0.82rem',
          color: '#475569',
          lineHeight: 1.55,
        }}>
          {m.desc}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {m.stats.map(s => (
            <span key={s} style={{
              background: '#F1F5F9',
              borderRadius: '20px',
              padding: '3px 10px',
              fontSize: '0.7rem',
              color: '#64748B',
              fontWeight: '600',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
