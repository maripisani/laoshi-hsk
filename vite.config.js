import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  IMPORTANTE: substitua 'laoshi-hsk' pelo nome EXATO do seu repositório no GitHub
// Exemplo: se o repo se chama "meu-mandarim", troque para base: '/meu-mandarim/'
export default defineConfig({
  plugins: [react()],
  base: '/laoshi-hsk/',
})
