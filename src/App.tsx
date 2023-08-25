import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Settings } from './Types'
import * as Generator from 'generate-password-browser'
import './App.css'

function App() {
  const defaultSettings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
    lowercase: true,
    strict: true
  }

  const [password, setpassword] = useState('')

  const [settings, setSettings] = useState(defaultSettings)

  const generate = useCallback(() => {
    const password = Generator.generate(settings)
    setpassword(password)
  }, [settings])

  useEffect(() => {
    generate()
  }, [settings, generate])

  const updateSettings = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.id === 'length'
        ? Number(e.target.value)
        : Boolean(e.target.checked)

    setSettings({ ...settings, [e.target.id]: value })
  }

  return (
    <>
      <h1>Password generator</h1>
      <div>
        <h3>Your password :</h3>
        <article>{password}</article>
      </div>
      <div>
        <label htmlFor="length">Password length : {settings.length}</label>
        <input
          type="range"
          name="length"
          min="10"
          max="50"
          id="length"
          defaultValue={settings.length}
          onChange={updateSettings}
        />

        <label htmlFor="uppercase">
          <input
            role="switch"
            type="checkbox"
            name="uppercase"
            id="uppercase"
            value={'' + settings.uppercase}
            onChange={updateSettings}
          />
          Will have uppercase letters
        </label>

        <label htmlFor="numbers">
          <input
            role="switch"
            type="checkbox"
            name="numbers"
            id="numbers"
            checked={settings.numbers}
            value={'' + settings.numbers}
            onChange={updateSettings}
          />
          Will have numbers
        </label>

        <label htmlFor="symbols">
          <input
            role="switch"
            type="checkbox"
            name="symbols"
            id="symbols"
            value={'' + settings.symbols}
            onChange={updateSettings}
          />
          Will have symbols
        </label>

        <button onClick={generate}>Generate</button>
      </div>
    </>
  )
}

export default App
