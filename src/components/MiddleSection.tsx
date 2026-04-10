import UploadBox from './UploadBox';

interface Props {
  onUpload: (name: string, type: 'file' | 'url') => void;
}

const MiddleSection = ({ onUpload }: Props) => (
  <div style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
    <UploadBox onUpload={onUpload} />
  </div>
);

export default MiddleSection;