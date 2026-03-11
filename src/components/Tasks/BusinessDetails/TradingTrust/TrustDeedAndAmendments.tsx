import React, { useState } from 'react';
import MultiFileUploader, {
  ACCEPT_DOCUMENTS,
  MIME_DOCUMENTS,
  HINT_DOCUMENTS,
} from '../../../FileUpload/MultiFileUploader';

const TrustDeedAndAmendments: React.FC = () => {
  const [deedFiles, setDeedFiles] = useState<File[]>([]);
  const [amendmentFiles, setAmendmentFiles] = useState<File[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Trust deed</label>
        <MultiFileUploader
          id="trust-deed"
          files={deedFiles}
          onChange={setDeedFiles}
          accept={ACCEPT_DOCUMENTS}
          mimeTypes={MIME_DOCUMENTS}
          label="Upload trust deed"
          hint={HINT_DOCUMENTS}
          maxFiles={1}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Amendments (optional)</label>
        <MultiFileUploader
          id="trust-amendments"
          files={amendmentFiles}
          onChange={setAmendmentFiles}
          accept={ACCEPT_DOCUMENTS}
          mimeTypes={MIME_DOCUMENTS}
          label="Upload amendments"
          hint={HINT_DOCUMENTS}
        />
      </div>
    </div>
  );
};

export default TrustDeedAndAmendments;
