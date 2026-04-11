import React from 'react';

const CandidateInformation = ({ candidate, fullHeight }: any) => {
  return (
    <div style={{
      ...styles.biometricCard,
      height: fullHeight ? '100%' : '48px',
      minHeight: fullHeight ? '400px' : '48px', // Prevents total collapse
      flex: fullHeight ? 1 : '0 0 48px', // Rigid flex-basis in navbar mode
      padding: fullHeight ? '32px' : '0 16px',
      background: fullHeight ? styles.biometricCard.background : 'rgba(15, 23, 42, 0.8)',
      border: fullHeight ? styles.biometricCard.border : '1px solid rgba(255, 255, 255, 0.1)',
      justifyContent: 'center',
    }}>
      
      {!fullHeight ? (
        /* 🚀 NAVBAR VIEW: Rigid 48px Header */
        <div style={styles.navBarView}>
          <div style={{
            ...styles.photo,
            width: '28px',
            height: '28px',
            fontSize: '12px',
            borderRadius: '6px',
            backgroundImage: candidate?.photo ? `url(${candidate.photo})` : 'none',
          }}>
            {!candidate?.photo && <span>{candidate?.name?.charAt(0) || '?'}</span>}
          </div>
          
          <div style={styles.navTextGroup}>
            <h1 style={{ ...styles.candidateName, fontSize: '13px', letterSpacing: '1px' }}>
              {candidate?.name?.toUpperCase() || "SUBJECT_NODE"}
            </h1>
            <span style={styles.navSubtext}>DATA_STREAM_ACTIVE</span>
          </div>

          <div style={styles.navStatusBadge}>
            <div style={styles.livePulse} />
            LIVE_UPLINK
          </div>
        </div>
      ) : (
        /* 📊 FULL BIOMETRIC HERO VIEW */
        <div style={styles.fullContentWrapper}>
          <div style={styles.cardHeader}>
            <div style={styles.dotGroup}>
              <div style={{ ...styles.glowingDot, background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <div style={{ ...styles.glowingDot, background: '#be185d', boxShadow: '0 0 10px #be185d' }} />
            </div>
            <span style={styles.systemTag}>UPLINK_STATUS::ACTIVE</span>
            <div style={styles.idBadge}>ID_{candidate?.id?.slice(0, 8).toUpperCase() || "NODE_ERR"}</div>
          </div>

          <div style={styles.cardMain}>
            <div style={styles.avatarWrapper}>
              <div style={{
                  ...styles.photo,
                  width: '90px',
                  height: '90px',
                  fontSize: '32px',
                  border: '2px solid #be185d',
                  backgroundImage: candidate?.photo ? `url(${candidate.photo})` : 'none',
                }}>
                {!candidate?.photo && <span>{candidate?.name?.charAt(0) || '?'}</span>}
              </div>
              <div style={styles.avatarGlow} />
            </div>

            <div style={styles.contactGroup}>
              <h1 style={styles.candidateName}>{candidate?.name?.toUpperCase() || "UNKNOWN_SUBJECT"}</h1>
              <div style={styles.contactList}>
                <div style={styles.contactItem}><span style={styles.pinkIcon}>✉</span> {candidate?.email}</div>
                <div style={styles.contactItem}><span style={styles.pinkIcon}>📞</span> {candidate?.phone}</div>
              </div>
            </div>
          </div>
          
          <div style={styles.jdCard}>
            <div style={styles.jdHeader}>
              <span style={styles.jdLabel}>NEURAL_ALIGNMENT_JD</span>
              <div style={styles.pinkLine} />
            </div>
            <p style={styles.jdText}>{candidate?.jobDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  biometricCard: {
    width: '100%',
    borderRadius: '16px',
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0) 60%), rgba(15, 23, 42, 0.4)`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `inset 0 0 15px rgba(255, 255, 255, 0.05)`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box'
  },
  fullContentWrapper: { display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, minHeight: 0 },
  navBarView: { display: 'flex', alignItems: 'center', gap: '12px', width: '100%', height: '100%' },
  navTextGroup: { display: 'flex', flexDirection: 'column' },
  navSubtext: { fontSize: '8px', color: '#475569', fontFamily: 'var(--font-mono)' },
  navStatusBadge: { marginLeft: 'auto', fontSize: '8px', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px' },
  livePulse: { width: '4px', height: '4px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' },
  dotGroup: { display: 'flex', gap: '6px' },
  glowingDot: { width: '6px', height: '6px', borderRadius: '50%' },
  systemTag: { fontSize: '9px', color: '#475569', fontFamily: 'var(--font-mono)', letterSpacing: '1px' },
  idBadge: { marginLeft: 'auto', fontSize: '10px', color: '#be185d', fontFamily: 'var(--font-mono)' },
  cardMain: { display: 'flex', alignItems: 'center', gap: '30px', flexShrink: 0 },
  avatarWrapper: { position: 'relative' },
  photo: { borderRadius: '12px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#be185d', fontFamily: 'var(--font-mono)' },
  avatarGlow: { position: 'absolute', width: '110px', height: '110px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(190, 24, 93, 0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  contactGroup: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  candidateName: { margin: 0, color: '#f1f5f9', fontFamily: 'var(--font-mono)', fontWeight: 500 },
  contactList: { display: 'flex', gap: '16px' },
  contactItem: { fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' },
  pinkIcon: { color: '#be185d' },
  jdCard: { flex: 1, padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  jdHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  jdLabel: { fontSize: '10px', color: '#be185d', fontFamily: 'var(--font-mono)' },
  pinkLine: { flex: 1, height: '1px', background: 'linear-gradient(to right, #be185d, transparent)' },
  jdText: { fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6', overflowY: 'auto' }
};

export default CandidateInformation;