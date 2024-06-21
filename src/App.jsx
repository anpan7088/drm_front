import { useState } from 'react'
import { Button } from 'react-bootstrap'

// Bootstrap Bundle JS, bootstrap.css is imported in the App.scss
import "./scss/App.scss";
import "./scss/custom.scss"
// #mkd java script za bootstrap ne sum siguren bash dali treba oti upotrebuime komponenti react-bootstrap
// ali neka sto via red sea za sega
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
