import { useState, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import WorkflowCanvas from '../components/WorkflowCanvas'
import ConfigPanel from '../components/ConfigPanel'
import { supabase } from '../utils/supabase'

export default function Builder() {
  const [selectedNode, setSelectedNode] = useState(null)

  const handleSelectNode = useCallback((node) => {
    setSelectedNode(node)
  }, [])

  const handleUpdateNode = useCallback((nodeId, newData) => {
    setSelectedNode((prev) =>
      prev && prev.id === nodeId ? { ...prev, data: newData } : prev
    )
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>RAG Workflow Builder</h1>
        <button onClick={handleSignOut} style={styles.signOutButton}>
          Sign Out
        </button>
      </header>
      <div style={styles.main}>
        <Sidebar />
        <WorkflowCanvas
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          onUpdateNode={handleUpdateNode}
        />
        <ConfigPanel
          selectedNode={selectedNode}
          onUpdateNode={handleUpdateNode}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
  },
  signOutButton: {
    padding: '8px 16px',
    backgroundColor: '#374151',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
}
