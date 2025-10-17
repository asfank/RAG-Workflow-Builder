export default function ConfigPanel({ selectedNode, onUpdateNode }) {
  if (!selectedNode) {
    return (
      <div style={styles.panel}>
        <h3 style={styles.title}>Node Configuration</h3>
        <p style={styles.emptyState}>Select a node to configure its properties</p>
      </div>
    )
  }

  const handleChange = (field, value) => {
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      [field]: value,
    })
  }

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Node Configuration</h3>
      <div style={styles.section}>
        <label style={styles.label}>Node Type</label>
        <div style={styles.value}>{selectedNode.data.label}</div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Node ID</label>
        <div style={styles.valueSmall}>{selectedNode.id}</div>
      </div>

      {selectedNode.data.label === 'User Query' && (
        <div style={styles.section}>
          <label style={styles.label}>Placeholder Text</label>
          <input
            type="text"
            value={selectedNode.data.placeholder || ''}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            placeholder="Enter your question..."
            style={styles.input}
          />
        </div>
      )}

      {selectedNode.data.label === 'LLM Engine' && (
        <>
          <div style={styles.section}>
            <label style={styles.label}>System Prompt</label>
            <textarea
              value={selectedNode.data.prompt || ''}
              onChange={(e) => handleChange('prompt', e.target.value)}
              placeholder="You are a helpful assistant..."
              style={styles.textarea}
              rows={4}
            />
          </div>
          <div style={styles.section}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedNode.data.useContext || false}
                onChange={(e) => handleChange('useContext', e.target.checked)}
                style={styles.checkbox}
              />
              Use Context from KnowledgeBase
            </label>
          </div>
        </>
      )}

      {selectedNode.data.label === 'KnowledgeBase' && (
  <div style={styles.section}>
    <label style={styles.label}>Document / Drive Link</label>
    <input
      type="text"
      value={selectedNode.data.documentLink || ''}
      onChange={(e) => handleUpdateNode(selectedNode.id, { documentLink: e.target.value })} // ✅ Persistent field
      placeholder="Paste Google Drive / File Link..."
      style={styles.input}
    />
  </div>
)}


      {selectedNode.data.label === 'Output' && (
        <div style={styles.section}>
          <label style={styles.label}>Output Format</label>
          <select
            value={selectedNode.data.format || 'text'}
            onChange={(e) => handleChange('format', e.target.value)}
            style={styles.input}
          >
            <option value="text">Plain Text</option>
            <option value="markdown">Markdown</option>
            <option value="json">JSON</option>
          </select>
        </div>
      )}
    </div>
  )
}

const styles = {
  panel: {
    width: '300px',
    backgroundColor: '#f8f9fa',
    borderLeft: '1px solid #e5e7eb',
    padding: '20px',
    overflowY: 'auto',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1f2937',
  },
  emptyState: {
    color: '#6b7280',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '40px',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#374151',
  },
  value: {
    padding: '10px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600',
  },
  valueSmall: {
    padding: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#6b7280',
    fontFamily: 'monospace',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#374151',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '8px',
    cursor: 'pointer',
  },
}
