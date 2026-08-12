import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Layout from './components/Layout.jsx'

// Lazy loading: cada módulo carrega apenas quando acessado
const LaoshiVocab   = lazy(() => import('./components/LaoshiVocab.jsx'))
const HSK2Completo  = lazy(() => import('./components/HSK2Completo.jsx'))
const HSK3Completo  = lazy(() => import('./components/HSK3Completo.jsx'))
const HSK4Completo  = lazy(() => import('./components/HSK4Completo.jsx'))
const HSK5Completo  = lazy(() => import('./components/HSK5Completo.jsx'))
const HSK6Completo  = lazy(() => import('./components/HSK6Completo.jsx'))

function Loading() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', background: '#FAFAF8', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{ fontSize: '3rem' }}>🇨🇳</div>
      <div style={{ fontFamily: 'system-ui', color: '#64748B', fontSize: '1rem' }}>
        Carregando módulo…
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/vocab" element={
          <Suspense fallback={<Loading />}>
            <Layout title="Vocabulário Completo HSK 1–9">
              <LaoshiVocab />
            </Layout>
          </Suspense>
        } />

        <Route path="/hsk2" element={
          <Suspense fallback={<Loading />}>
            <Layout title="HSK 2 · Programa Completo">
              <HSK2Completo />
            </Layout>
          </Suspense>
        } />

        <Route path="/hsk3" element={
          <Suspense fallback={<Loading />}>
            <Layout title="HSK 3 · Programa Completo">
              <HSK3Completo />
            </Layout>
          </Suspense>
        } />

        <Route path="/hsk4" element={
          <Suspense fallback={<Loading />}>
            <Layout title="HSK 4 · Programa Completo">
              <HSK4Completo />
            </Layout>
          </Suspense>
        } />

        <Route path="/hsk5" element={
          <Suspense fallback={<Loading />}>
            <Layout title="HSK 5 · Programa Completo">
              <HSK5Completo />
            </Layout>
          </Suspense>
        } />

        <Route path="/hsk6" element={
          <Suspense fallback={<Loading />}>
            <Layout title="HSK 6 · Programa Completo">
              <HSK6Completo />
            </Layout>
          </Suspense>
        } />
      </Routes>
    </HashRouter>
  )
}
