import React from 'react';

interface CandidateProfileProps {
  name: string;
  photoUrl?: string;
  email: string;
  phone: string;
}

const CandidateProfile = ({ name, photoUrl, email, phone }: CandidateProfileProps) => {
  const defaultPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=be185d&color=fff&bold=true`;

  return (
    <div style={styles.sidebarHeader}>
      <div style={styles.topRow}>
        <div style={styles.avatarWrapper}>
          <img src={photoUrl || defaultPhoto} alt={name} style={styles.avatar} />
          <div style={styles.statusDot} />
        </div>
        
        <div style={styles.idGroup}>
          <div style={styles.badgeWrapper}>
            <div style={styles.activeDot} />
          </div>
          <h2 style={styles.name}>{name}</h2>
        </div>
      </div>

      {/* <div style={styles.contactStack}>
        <span style={styles.infoValue}>{email}</span>
        <span style={styles.infoValue}>{phone}</span>
      </div> */}
    </div>
  );
};

const styles = {
  sidebarHeader: {
    padding: '32px 24px 10px 24px',
    backgroundColor: 'transparent', // FORCE TRANSPARENCY
    width: '100%',
    border: 'none', // REMOVE ALL BORDERS
    outline: 'none',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '16px',
  },
  avatarWrapper: {
    position: 'relative' as const,
    width: '52px',
    height: '52px',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover' as const,
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statusDot: {
    position: 'absolute' as const,
    bottom: '2px',
    right: '2px',
    width: '10px',
    height: '10px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    border: '2px solid #020617', // Match the main BG color here
  },
  idGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  badgeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '2px',
  },
  idBadge: {
    fontSize: '9px',
    fontWeight: 900,
    color: '#be185d',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '1px',
  },
  activeDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#be185d',
  },
  name: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#f8fafc',
    margin: 0,
    fontFamily: 'var(--font-sans)', 
    letterSpacing: '-0.03em',
  },
  contactStack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  infoValue: {
    fontSize: '15px',
    color: '#64748b', 
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
  },
};

export default CandidateProfile;