import React, { useState } from 'react';
import { FileSignature } from 'lucide-react';

interface FileUploadState {
  deed: File | null;
  amendments: File[];
}

const TrustDeedAndAmendments: React.FC = () => {
  const [files, setFiles] = useState<FileUploadState>({
    deed: null,
    amendments: []
  });

  const isValidFileType = (file: File): boolean => {
    const validTypes = ['application/pdf', 'image/png'];
    return validTypes.includes(file.type);
  };

  const handleDeedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFileType(file)) {
      setFiles(prev => ({ ...prev, deed: file }));
    }
  };

  const handleDeedDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDeedDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && isValidFileType(file)) {
      setFiles(prev => ({ ...prev, deed: file }));
    }
  };

  const handleAmendmentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).filter(file => isValidFileType(file));
    setFiles(prev => ({ ...prev, amendments: [...prev.amendments, ...newFiles] }));
  };

  const handleAmendmentsDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleAmendmentsDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newFiles = Array.from(event.dataTransfer.files || []).filter(file => isValidFileType(file));
    setFiles(prev => ({ ...prev, amendments: [...prev.amendments, ...newFiles] }));
  };

  const removeDeed = () => {
    setFiles(prev => ({ ...prev, deed: null }));
  };

  const removeAmendment = (index: number) => {
    setFiles(prev => ({
      ...prev,
      amendments: prev.amendments.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Trust deed</label>
        {!files.deed ? (
          <div
            onDragOver={handleDeedDragOver}
            onDrop={handleDeedDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-colors duration-200"
          >
            <input
              type="file"
              id="trust-deed"
              accept=".pdf,.png"
              onChange={handleDeedUpload}
              className="hidden"
            />
            <label htmlFor="trust-deed" className="cursor-pointer block">
              <FileSignature className="w-5 h-5 text-fundtap-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Upload deed</p>
              <p className="text-xs text-gray-600">Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PDF or PNG</p>
            </label>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3 min-w-0">
              <FileSignature className="w-4 h-4 text-fundtap-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{files.deed.name}</p>
                <p className="text-xs text-gray-500">{(files.deed.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeDeed}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex-shrink-0 ml-4"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">Amendments (optional)</label>
        {files.amendments.length === 0 ? (
          <div
            onDragOver={handleAmendmentsDragOver}
            onDrop={handleAmendmentsDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-colors duration-200"
          >
            <input
              type="file"
              id="trust-amendments"
              accept=".pdf,.png"
              onChange={handleAmendmentsUpload}
              multiple
              className="hidden"
            />
            <label htmlFor="trust-amendments" className="cursor-pointer block">
              <FileSignature className="w-5 h-5 text-fundtap-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Upload amendments</p>
              <p className="text-xs text-gray-600">Drag and drop or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PDF or PNG</p>
            </label>
          </div>
        ) : (
          <div className="space-y-2">
            {files.amendments.map((file, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3 min-w-0">
                  <FileSignature className="w-4 h-4 text-fundtap-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAmendment(index)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex-shrink-0 ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
            <div
              onDragOver={handleAmendmentsDragOver}
              onDrop={handleAmendmentsDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-colors duration-200"
            >
              <input
                type="file"
                id="trust-amendments-add"
                accept=".pdf,.png"
                onChange={handleAmendmentsUpload}
                multiple
                className="hidden"
              />
              <label htmlFor="trust-amendments-add" className="cursor-pointer block text-xs">
                <p className="text-gray-600">Add more amendments</p>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustDeedAndAmendments;