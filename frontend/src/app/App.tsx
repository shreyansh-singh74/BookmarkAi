import AppRouter from './router'

import {Toaster } from "sonner"
function App() {
  return (
    <>
      <Toaster position='top-right'/>
      <AppRouter />
    </>
  )
}

export default App;

