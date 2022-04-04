import React, { useState, useEffect } from "react";
import Editor from "./Editor.js";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHTML] = useLocalStorage("html", "")
  const [css, setCSS] = useLocalStorage("css", "")
  const [js, setJS] = useLocalStorage("js", "")
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>`)
    }, 250)

    return () => clearTimeout(timeout)

  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor displayName="HTML" language="xml" value={html} onChange={setHTML} />
        <Editor displayName="CSS" language="css" value={css} onChange={setCSS} />
        <Editor displayName="Javascript" language="javascript" value={js} onChange={setJS} />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>

    </>
  )
}

export default App;