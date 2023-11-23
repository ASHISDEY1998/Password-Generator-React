import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRefer hook
  const passRefer = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*_'
    for (let index = 0; index < length; index++) {
      let num = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(num)

    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword])

  const copyToClipBoard = useCallback(
    () => {
      passRefer.current?.select()
      passRefer.current?.setSelectionRange(0, 100)
      navigator.clipboard.writeText(password)
    },
    [password],
  )


  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-purple-500 bg-gray-800'>
      <h1 className='text-white text-center mb-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' ref={passRefer} placeholder='Password' readOnly />
        <button className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0' onClick={copyToClipBoard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label className='text-white'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numAllowed} id='numInput' onChange={() => { setNumAllowed(!numAllowed) }} />
          <label className='text-white' htmlFor='numInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => { setCharAllowed(!charAllowed) }} />
          <label className='text-white' htmlFor='charInput'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
