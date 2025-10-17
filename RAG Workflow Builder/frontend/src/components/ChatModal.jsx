import { useState } from 'react'

export default function ChatModal({ isOpen, onClose, onSend }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = { role: 'user', content: message }
    setMessages([...messages, userMessage])
    setMessage('')
    setLoading(true)

    try {
      const response = await onSend(message)
      const assistantMessage = { role: 'assistant', content: response }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        role: 'error',
        content: 'Failed to get response from workflow'
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Chat with Stack</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>

        <div style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div style={styles.emptyState}>
              Send a message to test your workflow
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.role === 'user' ? styles.userMessage :
                      msg.role === 'error' ? styles.errorMessage :
                      styles.assistantMessage)
                }}
              >
                <strong>{msg.role === 'user' ? 'You' : msg.role === 'error' ? 'Error' : 'Assistant'}:</strong>
                <div style={styles.messageContent}>{msg.content}</div>
              </div>
            ))
          )}
          {loading && (
            <div style={styles.loadingMessage}>
              <div style={styles.loader}></div>
              Processing...
            </div>
          )}
        </div>

        <div style={styles.inputContainer}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={styles.input}
            rows={3}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            style={styles.sendButton}
            disabled={loading || !message.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#6b7280',
    lineHeight: '1',
    padding: '0',
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  emptyState: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '40px',
    fontSize: '14px',
  },
  message: {
    padding: '12px 16px',
    borderRadius: '8px',
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  assistantMessage: {
    backgroundColor: '#f3f4f6',
    alignSelf: 'flex-start',
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    alignSelf: 'flex-start',
    color: '#991b1b',
  },
  messageContent: {
    marginTop: '8px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  loadingMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#6b7280',
    fontSize: '14px',
  },
  loader: {
    width: '16px',
    height: '16px',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  inputContainer: {
    padding: '20px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'none',
    fontFamily: 'inherit',
  },
  sendButton: {
    padding: '0 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}
