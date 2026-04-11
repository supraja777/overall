import React from 'react';

interface Experience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  skills_used: string[];
}

interface Education {
  institution: string;
  degree: string | null;
  timeline: string;
  cgpa: string | null;
  key_courses: string[];
}

interface ResumeAnalysisProps {
  neuralValidation?: string;
  detailedExperience?: Experience[];
  detailedEducation?: Education[];
}

const ResumeAnalysis = ({ 
  neuralValidation = "Neural sync in progress...", 
  detailedExperience = [], 
  detailedEducation = [] 
}: ResumeAnalysisProps) => {
  
  return (
    <div style={styles.container}>
      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.01);
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(190, 24, 93, 0.3);
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: #be185d;
            box-shadow: 0 0 10px #be185d;
          }
        `}
      </style>

      <div style={styles.scrollWrapper} className="custom-scroll">
        
        {/* 1. NEURAL REPORT */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>NEURAL_REPORT</span>
          </div>
          <p style={styles.validationText}>{neuralValidation}</p>
        </div>

        <div style={styles.divider} />

        {/* 2. EXPERIENCE TIMELINE */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>EXPERIENCE_TIMELINE</span>
          </div>
          <div style={styles.list}>
            {detailedExperience && detailedExperience.length > 0 ? (
              detailedExperience.map((exp, idx) => (
                <div key={idx} style={styles.experienceBlock}>
                  <div style={styles.entryHeader}>
                    <span style={styles.companyName}>{exp.company?.toUpperCase()}</span>
                    <span style={styles.durationTag}>{exp.duration}</span>
                  </div>
                  <div style={styles.roleTitle}>{exp.role}</div>
                  
                  <ul style={styles.highlightsList}>
                    {exp.highlights?.map((item, i) => (
                      <li key={i} style={styles.highlightItem}>{item}</li>
                    ))}
                  </ul>

                  {exp.skills_used && exp.skills_used.length > 0 && (
                    <div style={styles.skillTagContainer}>
                      {exp.skills_used.map((skill, i) => (
                        <span key={i} style={styles.miniTag}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={styles.emptyText}>NO_PROFESSIONAL_HISTORY_DETECTED</div>
            )}
          </div>
        </div>

        <div style={styles.divider} />

        {/* 3. ACADEMIC RECORDS */}
        <div style={styles.section}>
          <div style={styles.highlightHeader}>
            <span style={styles.label}>ACADEMIC_RECORDS</span>
          </div>
          <div style={styles.list}>
            {detailedEducation && detailedEducation.length > 0 ? (
              detailedEducation.map((edu, idx) => (
                <div key={idx} style={styles.eduBlock}>
                  <div style={styles.entryHeader}>
                    <span style={styles.schoolName}>{edu.institution}</span>
                    <span style={styles.durationTag}>{edu.timeline}</span>
                  </div>
                  
                  <div style={styles.degreeRow}>
                    <span style={styles.degreeText}>{edu.degree}</span>
                    {edu.cgpa && (
                      <span style={styles.cgpaBadge}>GPA: {edu.cgpa}</span>
                    )}
                  </div>

                  {edu.key_courses && edu.key_courses.length > 0 && (
                    <div style={styles.courseworkWrapper}>
                      <span style={styles.subLabel}>RELEVANT_COURSEWORK: </span>
                      <span style={styles.courseList}>{edu.key_courses.join(", ")}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={styles.emptyText}>NO_ACADEMIC_DATA_AVAILABLE</div>
            )}
          </div>
        </div>

        <div style={{ height: '40px', flexShrink: 0 }} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { 
    width: '100%', 
    height: '100%', 
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  scrollWrapper: { 
    flex: 1,
    display: 'flex', 
    flexDirection: 'column', 
    gap: '32px', 
    overflowY: 'auto',
    paddingRight: '12px' 
  },
  divider: { 
    height: '1px', 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    width: '100%',
    flexShrink: 0 
  },
  section: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '16px' 
  },
  highlightHeader: {
    background: 'rgba(30, 41, 59, 0.5)',
    padding: '4px 12px',
    borderRadius: '4px',
    borderLeft: '3px solid #be185d',
    alignSelf: 'flex-start'
  },
  label: { 
    fontSize: '11px', 
    fontWeight: 900, 
    color: '#f8fafc', 
    fontFamily: 'var(--font-mono)', 
    letterSpacing: '2.5px' 
  },
  validationText: { 
    fontSize: '13px', 
    color: '#94a3b8', 
    lineHeight: '1.6', 
    margin: 0,
    paddingLeft: '4px'
  },
  list: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '24px' 
  },
  experienceBlock: { 
    borderLeft: '1px solid rgba(190, 24, 93, 0.3)', 
    paddingLeft: '16px', 
    position: 'relative' 
  },
  entryHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '4px' 
  },
  companyName: { 
    fontSize: '12px', 
    color: '#be185d', 
    fontFamily: 'var(--font-mono)', 
    fontWeight: 600,
    letterSpacing: '1px' 
  },
  durationTag: { 
    fontSize: '10px', 
    color: '#475569',
    fontFamily: 'var(--font-mono)' 
  },
  roleTitle: { 
    fontSize: '14px', 
    color: '#f1f5f9', 
    fontWeight: 500, 
    marginBottom: '8px' 
  },
  highlightsList: { 
    margin: '8px 0', 
    paddingLeft: '18px', 
    color: '#94a3b8', 
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  highlightItem: { 
    lineHeight: '1.4' 
  },
  skillTagContainer: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '6px', 
    marginTop: '12px' 
  },
  miniTag: { 
    fontSize: '9px', 
    background: 'rgba(190, 24, 93, 0.05)', 
    color: '#be185d', 
    padding: '2px 8px', 
    borderRadius: '4px', 
    border: '1px solid rgba(190, 24, 93, 0.2)',
    fontFamily: 'var(--font-mono)'
  },
  eduBlock: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '8px',
    paddingLeft: '4px'
  },
  schoolName: { 
    fontSize: '14px', 
    color: '#f1f5f9', 
    fontWeight: 600 
  },
  degreeRow: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px' 
  },
  degreeText: { 
    fontSize: '12px', 
    color: '#94a3b8' 
  },
  cgpaBadge: { 
    fontSize: '10px', 
    color: '#10b981', 
    background: 'rgba(16, 185, 129, 0.1)', 
    padding: '2px 8px', 
    borderRadius: '4px', 
    border: '1px solid rgba(16, 185, 129, 0.2)',
    fontFamily: 'var(--font-mono)' 
  },
  courseworkWrapper: { 
    marginTop: '4px', 
    padding: '10px', 
    background: 'rgba(255, 255, 255, 0.02)', 
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.03)' 
  },
  subLabel: { 
    fontSize: '9px', 
    color: '#475569', 
    fontFamily: 'var(--font-mono)',
    display: 'block',
    marginBottom: '4px' 
  },
  courseList: { 
    fontSize: '11px', 
    color: '#64748b', 
    lineHeight: '1.4' 
  },
  emptyText: { 
    fontSize: '11px', 
    color: '#334155', 
    fontFamily: 'var(--font-mono)' 
  }
};

export default ResumeAnalysis;