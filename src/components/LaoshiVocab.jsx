import { useState, useMemo, useEffect, useRef } from 'react'
import { RAW } from '../data/hskVocab.js'

const ink = '#0F172A'
const muted = '#64748B'
const bdr = '#E2E8F0'
const sand = '#FAFAF8'

// Cores por tom — mesma convenção usada nos programas de estudo
const TONE = ['#9CA3AF', '#0891B2', '#059669', '#7C3AED', '#DC2626']

const NIVEIS = [
  { id: 1, rotulo: 'HSK 1', total: 300 },
  { id: 2, rotulo: 'HSK 2', total: 200 },
  { id: 3, rotulo: 'HSK 3', total: 500 },
  { id: 4, rotulo: 'HSK 4', total: 1000 },
  { id: 5, rotulo: 'HSK 5', total: 1600 },
  { id: 6, rotulo: 'HSK 6', total: 1800 },
  { id: 7, rotulo: 'HSK 7–9', total: 5600 },
]

const POR_PAGINA = 60

// ── pinyin ────────────────────────────────────────────────────────────────
const MARCAS = {
  ā: ['a', 1], á: ['a', 2], ǎ: ['a', 3], à: ['a', 4],
  ē: ['e', 1], é: ['e', 2], ě: ['e', 3], è: ['e', 4],
  ī: ['i', 1], í: ['i', 2], ǐ: ['i', 3], ì: ['i', 4],
  ō: ['o', 1], ó: ['o', 2], ǒ: ['o', 3], ò: ['o', 4],
  ū: ['u', 1], ú: ['u', 2], ǔ: ['u', 3], ù: ['u', 4],
  ǖ: ['ü', 1], ǘ: ['ü', 2], ǚ: ['ü', 3], ǜ: ['ü', 4],
  ń: ['n', 2], ň: ['n', 3], ǹ: ['n', 4],
}

/** Remove diacríticos para permitir busca sem acento: "nihao" acha "nǐ hǎo". */
function semTom(s) {
  let out = ''
  for (const c of s.toLowerCase()) {
    const m = MARCAS[c]
    out += m ? m[0] : c
  }
  return out.replace(/ü/g, 'v')
}

/** Tom de uma sílaba: 0 = neutro. */
function tomDe(silaba) {
  for (const c of silaba) {
    const m = MARCAS[c]
    if (m) return m[1]
  }
  return 0
}

function Pinyin({ texto }) {
  const partes = texto.split(/(\s+|\/)/)
  return (
    <span>
      {partes.map((p, i) =>
        /^\s+$/.test(p) || p === '/' ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} style={{ color: TONE[tomDe(p)] }}>{p}</span>
        )
      )}
    </span>
  )
}

// ── dados ─────────────────────────────────────────────────────────────────
function carregar() {
  return RAW.trim().split('\n').map((linha, i) => {
    const [h, py, pos, nivel, pt] = linha.split('|')
    return {
      i,
      h,
      py,
      pos,
      nivel: +nivel,
      pt,
      busca: (h + '\u0000' + semTom(py).replace(/\s/g, '') + '\u0000' + (pt || '').toLowerCase()),
    }
  })
}

export default function LaoshiVocab() {
  const todas = useMemo(carregar, [])

  const [nivel, setNivel] = useState(1)
  const [termo, setTermo] = useState('')
  const [mostrarPinyin, setMostrarPinyin] = useState(true)
  const [soPendentes, setSoPendentes] = useState(false)
  const [pagina, setPagina] = useState(0)
  const topo = useRef(null)

  const resultados = useMemo(() => {
    const t = termo.trim().toLowerCase()
    const alvo = semTom(t).replace(/\s/g, '')
    return todas.filter(e => {
      if (e.nivel !== nivel) return false
      if (soPendentes && e.pt) return false
      if (!t) return true
      return e.busca.includes(t) || e.busca.includes(alvo)
    })
  }, [todas, nivel, termo, soPendentes])

  useEffect(() => { setPagina(0) }, [nivel, termo, soPendentes])

  const totalPaginas = Math.max(1, Math.ceil(resultados.length / POR_PAGINA))
  const visiveis = resultados.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA)

  const traduzidas = useMemo(
    () => todas.filter(e => e.nivel === nivel && e.pt).length,
    [todas, nivel]
  )
  const totalNivel = NIVEIS.find(n => n.id === nivel).total

  function irPara(p) {
    setPagina(p)
    topo.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const btnBase = {
    fontFamily: 'inherit', fontSize: '.85rem', cursor: 'pointer',
    border: `1px solid ${bdr}`, borderRadius: 8, padding: '7px 13px',
    background: '#fff', color: muted,
  }

  return (
    <div ref={topo} style={{ background: sand, color: ink, fontFamily: 'system-ui, sans-serif' }}>

      {/* Níveis */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {NIVEIS.map(n => {
          const ativo = n.id === nivel
          return (
            <button
              key={n.id}
              onClick={() => setNivel(n.id)}
              aria-pressed={ativo}
              style={{
                ...btnBase,
                padding: '9px 15px',
                fontWeight: ativo ? 600 : 400,
                background: ativo ? ink : '#fff',
                color: ativo ? '#fff' : muted,
                borderColor: ativo ? ink : bdr,
              }}
            >
              {n.rotulo}
            </button>
          )
        })}
      </div>

      {/* Busca e opções */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 14 }}>
        <input
          value={termo}
          onChange={e => setTermo(e.target.value)}
          placeholder="Buscar por caractere, pinyin ou tradução"
          style={{
            flex: '1 1 260px', fontFamily: 'inherit', fontSize: '.95rem',
            padding: '10px 14px', borderRadius: 10, border: `1px solid ${bdr}`,
            background: '#fff', color: ink, outline: 'none',
          }}
        />
        <button onClick={() => setMostrarPinyin(v => !v)} style={btnBase}>
          {mostrarPinyin ? 'Ocultar pinyin' : 'Mostrar pinyin'}
        </button>
        <button
          onClick={() => setSoPendentes(v => !v)}
          style={{ ...btnBase, borderColor: soPendentes ? ink : bdr, color: soPendentes ? ink : muted }}
        >
          {soPendentes ? 'Ver todas' : 'Só sem tradução'}
        </button>
      </div>

      {/* Contagem */}
      <p style={{ fontSize: '.85rem', color: muted, margin: '0 0 18px' }}>
        {resultados.length === todas.filter(e => e.nivel === nivel).length
          ? `${totalNivel} palavras neste nível`
          : `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'}`}
        {' · '}
        {traduzidas === totalNivel
          ? 'traduzido por completo'
          : `${traduzidas} traduzidas, ${totalNivel - traduzidas} pendentes`}
      </p>

      {/* Lista */}
      {visiveis.length === 0 ? (
        <p style={{ color: muted, padding: '40px 0', textAlign: 'center' }}>
          Nada encontrado. Tente outro caractere, pinyin sem acento ou parte da tradução.
        </p>
      ) : (
        <div style={{
          display: 'grid', gap: 10,
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        }}>
          {visiveis.map(e => (
            <div key={e.i} style={{
              background: '#fff', border: `1px solid ${bdr}`, borderRadius: 12,
              padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{ fontSize: '1.5rem', lineHeight: 1.2, letterSpacing: '.02em' }}>
                {e.h}
              </div>
              {mostrarPinyin && (
                <div style={{ fontSize: '.9rem' }}><Pinyin texto={e.py} /></div>
              )}
              <div style={{ fontSize: '.88rem', color: e.pt ? ink : muted, lineHeight: 1.4 }}>
                {e.pt || 'tradução pendente'}
              </div>
              {e.pos && (
                <div style={{ fontSize: '.72rem', color: muted, marginTop: 2 }}>{e.pos}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 12, margin: '26px 0 8px',
        }}>
          <button onClick={() => irPara(pagina - 1)} disabled={pagina === 0}
            style={{ ...btnBase, opacity: pagina === 0 ? .35 : 1 }}>
            Anterior
          </button>
          <span style={{ fontSize: '.85rem', color: muted }}>
            {pagina + 1} de {totalPaginas}
          </span>
          <button onClick={() => irPara(pagina + 1)} disabled={pagina >= totalPaginas - 1}
            style={{ ...btnBase, opacity: pagina >= totalPaginas - 1 ? .35 : 1 }}>
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
