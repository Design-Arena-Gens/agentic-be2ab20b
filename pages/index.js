import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Could not process request' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Simple AI Agent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={styles.container}>
        <div style={styles.chatBox}>
          <h1 style={styles.title}>🤖 Simple AI Agent</h1>
          <div style={styles.messages}>
            {messages.length === 0 && (
              <div style={styles.emptyState}>
                Hello! I'm a simple AI agent. Ask me anything!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage)
                }}
              >
                <strong>{msg.role === 'user' ? 'You' : 'Agent'}:</strong> {msg.content}
              </div>
            ))}
            {loading && (
              <div style={styles.loading}>
                <div style={styles.loadingDot}></div>
                <div style={styles.loadingDot}></div>
                <div style={styles.loadingDot}></div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={styles.input}
              disabled={loading}
            />
            <button type="submit" style={styles.button} disabled={loading}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  chatBox: {
    width: '100%',
    maxWidth: '800px',
    height: '600px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  title: {
    margin: 0,
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '24px',
    textAlign: 'center'
  },
  messages: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  emptyState: {
    textAlign: 'center',
    color: '#999',
    marginTop: '50px',
    fontSize: '18px'
  },
  message: {
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '80%',
    wordWrap: 'break-word'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
    color: 'white'
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    color: '#333'
  },
  form: {
    display: 'flex',
    padding: '20px',
    borderTop: '1px solid #eee',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #eee',
    borderRadius: '25px',
    outline: 'none',
    transition: 'border 0.3s'
  },
  button: {
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s'
  },
  loading: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
    alignSelf: 'flex-start'
  },
  loadingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#667eea',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out both'
  }
};
