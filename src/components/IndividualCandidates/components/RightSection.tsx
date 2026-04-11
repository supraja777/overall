import React, { useState, useEffect, useRef } from 'react';
import { processConversation } from '../utils/processConversation';

interface Message {
  role: 'recruiter' | 'ai';
  content: string;
}

const RightSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Hello. I’ve indexed the current candidates. How can I assist with your talent evaluation today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    // 1. Add Recruiter message to local state
    const userMessage: Message = { role: 'recruiter', content: input };
    const historyWithUser = [...messages, userMessage];
    setMessages(historyWithUser);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Send the full history to the utility (which calls Groq)
      const aiResponse = await processConversation(historyWithUser);
      
      // 3. Add AI response to local state
      setMessages([...historyWithUser, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      setMessages([...historyWithUser, { role: 'ai', content: "System Error: Failed to reach the intelligence layer." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar Header */}
      <div style={styles.header}>
        <div style={styles.statusGroup}>
          <div style={styles.statusDot} />
          <span style={styles.headerTitle}>NEURAL COLLAB</span>
        </div>
        <span style={styles.modelBadge}>LLAMA 3.3</span>
      </div>

      {/* Message Feed */}
      <div style={styles.chatArea}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            ...styles.messageWrapper,
            alignItems: msg.role === 'recruiter' ? 'flex-end' : 'flex-start'
          }}>
            <div style={styles.roleLabel}>
              {msg.role === 'recruiter' ? '✦ RECRUITER' : '🤖 AI ANALYST'}
            </div>
            <div style={{
              ...styles.bubble,
              backgroundColor: msg.role === 'recruiter' ? '#312e81' : '#18181b',
              border: msg.role === 'recruiter' ? '1px solid #4338ca' : '1px solid #27272a',
              borderBottomRightRadius: msg.role === 'recruiter' ? '2px' : '12px',
              borderBottomLeftRadius: msg.role === 'ai' ? '2px' : '12px',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={styles.typingIndicator}>
            <div className="dot-flashing" />
            <span style={{ marginLeft: '12px' }}>Analyzing context...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={styles.inputArea}>
        <div style={styles.inputWrapper}>
          <textarea
            style={styles.textarea}
            placeholder="Discuss candidates..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend} 
            disabled={isTyping || !input.trim()}
            style={{
              ...styles.sendBtn,
              opacity: (isTyping || !input.trim()) ? 0.5 : 1
            }}
          >
            ↑
          </button>
        </div>
        <div style={styles.inputHint}>Press Enter to send, Shift+Enter for new line</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { 
    width: '340px', 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#09090b', 
    borderLeft: '1px solid #1e293b',
    height: '100vh'
  },
  header: { 
    padding: '20px 24px', 
    borderBottom: '1px solid #1e293b', 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  statusDot: { width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' },
  headerTitle: { fontSize: '10px', fontWeight: 900, color: '#f8fafc', letterSpacing: '1px' },
  modelBadge: { fontSize: '9px', color: '#475569', border: '1px solid #1e293b', padding: '2px 6px', borderRadius: '4px' },
  chatArea: { 
    flex: 1, 
    padding: '24px 20px', 
    overflowY: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '24px' 
  },
  messageWrapper: { display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '100%' },
  roleLabel: { fontSize: '9px', fontWeight: 800, color: '#475569', letterSpacing: '0.5px' },
  bubble: { 
    padding: '12px 16px', 
    borderRadius: '12px', 
    fontSize: '13px', 
    lineHeight: '1.5', 
    maxWidth: '85%', 
    color: '#e2e8f0',
    wordBreak: 'break-word'
  },
  typingIndicator: { fontSize: '11px', color: '#475569', display: 'flex', alignItems: 'center', marginTop: '10px' },
  inputArea: { padding: '20px', background: '#09090b' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'flex-end' },
  textarea: { 
    width: '100%', 
    background: '#020617', 
    border: '1px solid #1e293b', 
    borderRadius: '12px', 
    padding: '12px 45px 12px 12px', 
    color: 'white', 
    fontSize: '13px', 
    outline: 'none', 
    resize: 'none', 
    height: '100px',
    boxSizing: 'border-box'
  },
  sendBtn: { 
    position: 'absolute',
    right: '8px',
    bottom: '8px',
    width: '30px',
    height: '30px',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 900,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputHint: { fontSize: '9px', color: '#334155', marginTop: '8px', textAlign: 'center' }
};

export default RightSection;