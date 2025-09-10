import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import { SearchProvider } from './context/searchContext'
import { IssueProvider } from './context/issueContext'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


// localStorage.clear();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <IssueProvider>
    <SearchProvider >
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
    </Router>
    </SearchProvider>
    </IssueProvider>
    </>
  )
}

export default App
