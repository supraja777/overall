import React, { useState, useEffect, useRef } from 'react';
import { processConversation } from '../utils/processConversation';
import { getFullContextForCompression } from '../utils/storage';

interface Message {
  role: 'recruiter' | 'ai' | 'system';
  content: string;
}

const RightSection = ({ jobDescription, candidate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Hello. I’ve indexed the current candidates. How can I assist with your talent evaluation today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isJdOpen, setIsJdOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState("idle");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, actionStatus]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'recruiter', content: input };
    const historyWithUser = [...messages, userMessage];
    
    setMessages(historyWithUser);
    setInput('');
    setIsTyping(true);
    setActionStatus('idle'); // Reset status on new message

    try {
      const storageRaw = getFullContextForCompression();
      let candidateContext = "";
      
      if (storageRaw) {
        const parsed = JSON.parse(storageRaw);
        candidateContext = (parsed.analyses || []).map((a: any) => 
          `[DOMAIN: ${a.domain}]\n${a.report}`
        ).join("\n\n---\n\n");
      }

      const payloadWithContext: Message[] = [
        {
          role: 'system',
          content: `You are an elite recruitment AI. 
                    ACTIVE_JD: "${jobDescription}"
                    CANDIDATE_DATA: "${candidateContext}"
                    MANDATE: Every response must cross-reference candidate data against the JD. 
                    If the user asks to "mail", "invite", or "send a test", confirm you can do it.`
        },
        ...historyWithUser
      ];

      const aiResponse = await processConversation(payloadWithContext);
      
      // Intent Detection Logic
      const lowerRes = aiResponse.toLowerCase();
    
        if (lowerRes.includes('coding invite') || lowerRes.includes('test sent')) {
          setActionStatus("Coding invite sent");
        } else if (lowerRes.includes('email') || lowerRes.includes('mail sent')) {
          setActionStatus("Email Sent");
        } else if (lowerRes.includes('sms') || lowerRes.includes('text sent')) {
          setActionStatus("Text Sent");
        }

      setMessages([...historyWithUser, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      setMessages([...historyWithUser, { role: 'ai', content: "System Error: Intelligence layer offline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.statusGroup}>
          <div style={styles.statusDot} />
          <span style={styles.headerTitle}>NEURAL COLLAB</span>
        </div>
        <span style={styles.modelBadge}>LLAMA 3.3</span>
      </div>

      <div style={styles.jdWrapper}>
        <button 
          onClick={() => setIsJdOpen(!isJdOpen)} 
          style={{ ...styles.jdToggle, borderBottom: isJdOpen ? '1px solid #1e293b' : 'none' }}
        >
          <div style={styles.jdToggleLeft}>
            <div style={styles.jdDot} />
            <span>JOB_DESCRIPTION_CONTEXT</span>
          </div>
          <span style={{ transform: isJdOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}>▼</span>
        </button>
        
        {isJdOpen && (
          <div style={styles.jdContent} className="jd-scroll-area">
            {jobDescription || "Awaiting JD sync..."}
          </div>
        )}
      </div>

      <div style={styles.chatArea} className="custom-scroll">
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

        {/* TASK COMPLETION UI */}
        {actionStatus !== 'idle' && (
        <div style={styles.eventLogWrapper}>
          <div style={styles.eventLine} />
          
          <div style={styles.eventContent}>
            
            <div style={styles.eventBody}>
              <span style={styles.eventSubject}>{actionStatus.toUpperCase()}</span>
              <span style={styles.eventConnector}> transmitted to </span>
              <span style={styles.eventTarget}>{candidate.name.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}

        {isTyping && (
          <div style={styles.typingIndicator}>
            <span style={styles.typingDot} />
            <span>Analyzing context...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputArea}>
        <div style={styles.inputWrapper}>
          <textarea
            style={styles.textarea}
            placeholder="Discuss candidate suitability..."
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
            style={{ ...styles.sendBtn, opacity: (isTyping || !input.trim()) ? 0.2 : 1 }}
          >
            ↑
          </button>
        </div>
        <div style={styles.inputHint}>ENTER TO COMMIT // SHIFT+ENTER FOR NEW LINE</div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  // --- MAIN LAYOUT ---
  container: { 
    width: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#09090b', 
    borderLeft: '1px solid #1e293b', 
    height: '100vh', 
    fontFamily: '"Inter", "Roboto", sans-serif',
    position: 'relative' 
  },

  // --- HEADER SECTION ---
  header: { 
    padding: '24px', 
    borderBottom: '1px solid #1e293b', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    background: '#09090b'
  },
  statusGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  statusDot: { 
    width: '6px', 
    height: '6px', 
    background: '#10b981', 
    borderRadius: '50%', 
    boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)' 
  },
  headerTitle: { 
    fontSize: '11px', 
    fontWeight: 900, 
    color: '#f8fafc', 
    letterSpacing: '2px', 
    fontFamily: 'monospace' 
  },
  modelBadge: { 
    fontSize: '9px', 
    color: '#475569', 
    border: '1px solid #1e293b', 
    padding: '3px 8px', 
    borderRadius: '4px', 
    fontFamily: 'monospace',
    background: '#020617'
  },

  // --- JOB DESCRIPTION DROPDOWN ---
  jdWrapper: { background: '#0c0c0e', borderBottom: '1px solid #1e293b' },
  jdToggle: { 
    width: '100%', 
    padding: '14px 24px', 
    background: 'none', 
    border: 'none', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    color: '#64748b', 
    fontSize: '10px', 
    fontWeight: 800, 
    cursor: 'pointer', 
    fontFamily: 'monospace',
    transition: 'color 0.2s'
  },
  jdToggleLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  jdDot: { width: '4px', height: '4px', background: '#be185d', borderRadius: '50%' },
  jdContent: { 
    padding: '20px 24px', 
    fontSize: '13px', 
    color: '#94a3b8', 
    lineHeight: '1.6', 
    maxHeight: '180px', 
    overflowY: 'auto', 
    backgroundColor: '#020617',
    scrollbarWidth: 'thin',
    scrollbarColor: '#1e293b transparent'
  },

  // --- CHAT CONTENT AREA ---
  chatArea: { 
    flex: 1, 
    padding: '24px', 
    overflowY: 'auto', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '28px',
    scrollBehavior: 'smooth'
  },
  messageWrapper: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px', 
    width: '100%' 
  },
  roleLabel: { 
    fontSize: '9px', 
    fontWeight: 800, 
    color: '#475569', 
    letterSpacing: '1px', 
    fontFamily: 'monospace',
    marginBottom: '2px'
  },
  bubble: { 
    padding: '16px 20px', 
    borderRadius: '12px', 
    fontSize: '14px', 
    lineHeight: '1.6', 
    maxWidth: '92%', 
    color: '#e2e8f0', 
    wordBreak: 'break-word',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },

  // --- PROFESSIONAL SYSTEM EVENT LOG (Action Status) ---
  eventLogWrapper: {
    display: 'flex',
    gap: '16px',
    margin: '12px 0',
    padding: '0 4px',
    animation: 'fadeInLog 0.4s ease-out',
  },
  eventLine: {
    width: '2px',
    background: '#be185d',
    borderRadius: '2px',
    flexShrink: 0,
  },
  eventContent: {
    flex: 1,
    background: '#0c0c0e',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '12px 16px',
    fontFamily: 'monospace',
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '6px',
  },
  eventMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '9px',
    fontWeight: 900,
    color: '#10b981',
  },
  eventTime: {
    fontSize: '9px',
    color: '#475569',
  },
  eventBody: {
    fontSize: '11px',
    lineHeight: '1.4',
    color: '#94a3b8',
  },
  eventSubject: {
    color: '#f8fafc',
    fontWeight: 800,
  },
  eventTarget: {
    color: '#be185d',
    fontWeight: 800,
    textDecoration: 'underline',
    textDecorationColor: 'rgba(190, 24, 93, 0.3)',
  },

  // --- TYPING & INPUT ---
  typingIndicator: { 
    fontSize: '11px', 
    color: '#475569', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px',
    fontFamily: 'monospace'
  },
  typingDot: { 
    width: '4px', 
    height: '4px', 
    background: '#be185d', 
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite' 
  },
  inputArea: { padding: '24px', borderTop: '1px solid #1e293b', background: '#09090b' },
  inputWrapper: { position: 'relative', width: '100%' },
  textarea: { 
    width: '100%', 
    background: '#020617', 
    border: '1px solid #1e293b', 
    borderRadius: '12px', 
    padding: '16px 50px 16px 16px', 
    color: '#fff', 
    fontSize: '14px', 
    outline: 'none', 
    resize: 'none', 
    height: '100px', 
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    focus: { borderColor: '#be185d' }
  },
  sendBtn: { 
    position: 'absolute', 
    right: '12px', 
    bottom: '12px', 
    width: '32px', 
    height: '32px', 
    background: '#fff', 
    color: '#000', 
    border: 'none', 
    borderRadius: '8px', 
    fontWeight: 900, 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    transition: 'transform 0.1s active'
  },
  inputHint: { 
    fontSize: '8px', 
    color: '#334155', 
    marginTop: '12px', 
    textAlign: 'center', 
    fontFamily: 'monospace',
    letterSpacing: '1px' 
  }
};

export default RightSection;