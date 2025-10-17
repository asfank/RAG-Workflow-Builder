const nodeTypes = [
  { id: 'user-query', label: 'User Query', type: 'input', color: '#10b981' },
  { id: 'knowledge-base', label: 'KnowledgeBase', type: 'default', color: '#8b5cf6' },
  { id: 'llm-engine', label: 'LLM Engine', type: 'default', color: '#3b82f6' },
  { id: 'output', label: 'Output', type: 'output', color: '#ef4444' },
]

export default function Sidebar() {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, label }))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Node Library</h3>
      <div style={styles.nodeList}>
        {nodeTypes.map((node) => (
          <div
            key={node.id}
            draggable
            onDragStart={(e) => onDragStart(e, node.type, node.label)}
            style={{ ...styles.node, backgroundColor: node.color }}
          >
            {node.label}
          </div>
        ))}
      </div>
      <div style={styles.instructions}>
        <p style={styles.instructionText}>Drag nodes to the canvas to build your workflow</p>
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #e5e7eb',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 15px 0',
    color: '#1f2937',
  },
  nodeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  node: {
    padding: '12px 16px',
    borderRadius: '6px',
    cursor: 'grab',
    color: 'white',
    fontWeight: '500',
    fontSize: '14px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  instructions: {
    marginTop: 'auto',
    padding: '15px',
    backgroundColor: '#e0e7ff',
    borderRadius: '6px',
  },
  instructionText: {
    fontSize: '12px',
    color: '#4338ca',
    margin: 0,
    lineHeight: '1.5',
  },
}
