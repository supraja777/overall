import React, { useMemo } from 'react';
import LeetCodeTop from './leetcode_top';
import LeetCodeAnalysis from './leetcode_analysis';

const LeetCodeMaster = ({ data, isExpanded }: { data: any, isExpanded: boolean }) => {
  const parsedData = useMemo(() => {
    if (!data) return null;
    try {
      const raw = data.content ? data.content : data;
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) { return null; }
  }, [data]);

  if (!parsedData) return null;

  return (
    <div style={isExpanded ? styles.expandedContainer : styles.gridContainer}>
      <div style={styles.fixedHeader}>
        <LeetCodeTop 
          solved={parsedData.total_solved || parsedData.profile_summary?.total_solved} 
          breakdown={parsedData.problem_breakdown} 
          consistency={parsedData.algorithmic_consistency}
          profile={parsedData.profile_summary}
          topics={parsedData.top_topics}
          review={parsedData.quick_verdict} // Passing the review string here
        />
      </div>
      
      {isExpanded && (
        <div style={styles.scrollArea} className="custom-scroll">
          <LeetCodeAnalysis 
            verdict={parsedData.quick_verdict}
            topics={parsedData.top_topics}
            languages={parsedData.language_proficiency}
          />
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  gridContainer: { height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#020617', padding: '20px', boxSizing: 'border-box' },
  expandedContainer: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#020617', overflow: 'hidden', padding: '24px', boxSizing: 'border-box' },
  fixedHeader: { flexShrink: 0, marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  scrollArea: { flex: 1, overflowY: 'auto' }
};

export default LeetCodeMaster;