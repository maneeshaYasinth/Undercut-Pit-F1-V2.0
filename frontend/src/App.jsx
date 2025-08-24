import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen items-center justify-center bg-blue-900 text-white">
      <h1 className="text-4xl font-bold">Frontend is working 🚀</h1>
    </div>
  );
}

export default App
