import React, { useRef, useState } from 'react';
import { Upload, FileText, Plus, X } from 'lucide-react';

export const ACCEPT_STATEMENTS = '.pdf,.jpg,.jpeg,.png,.heic,.webp';
export const MIME_STATEMENTS = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/webp',
];
export const HINT_STATEMENTS = 'PDF, JPG, PNG, HEIC or WEBP';

export const ACCEPT_DOCUMENTS = '.pdf';
export const MIME_DOCUMENTS = ['application/pdf'];
export const HINT_DOCUMENTS = 'PDF only';

interface MultiFileUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  accept: string;
  mimeTypes: string[];
  label: string;
  hint: string;
  maxFiles?: number;
  disabled?: boolean;
  id: string;
}

const MultiFileUploader: React.FC<MultiFileUploaderProps> = ({
  files,
  onChange,
  accept,
  mimeTypes,
  label,
  hint,
  maxFiles,
  disabled = false,
  id,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidFile = (file: File): boolean => {
    if (mimeTypes.includes(file.type)) return true;
    const ext = file.name.split('.').pop()?.toLowerCase();
    const acceptedExts = accept.split(',').map(a => a.trim().replace('.', ''));
    return !!ext && acceptedExts.includes(ext);
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || disabled) return;
    setError(null);

    const valid: File[] = [];
    let rejected = false;

    Array.from(incoming).forEach(file => {
      if (!isValidFile(file)) {
        rejected = true;
        return;
      }
      if (maxFiles && files.length + valid.length >= maxFiles) return;
      valid.push(file);
    });

    if (rejected) {
      setError('Some files were skipped — unsupported file type');
    }

    if (valid.length > 0) {
      onChange([...files, ...valid]);
    }
  };

  const removeFile = (index: number) => {
    if (disabled) return;
    onChange(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const canAddMore = !maxFiles || files.length < maxFiles;
  const allowMultipleSelect = !maxFiles || maxFiles > 1;

  if (files.length === 0) {
    return (
      <div>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-colors duration-200"
        >
          <input
            ref={inputRef}
            type="file"
            id={id}
            accept={accept}
            multiple={allowMultipleSelect}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />
          <label htmlFor={id} className="cursor-pointer block">
            <Upload className="w-5 h-5 text-fundtap-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
            <p className="text-xs text-gray-500">{hint}</p>
          </label>
        </div>
        {error && (
          <p className="text-xs text-red-600 mt-1.5">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${file.size}-${index}`}
            className="border border-gray-200 rounded-lg p-3.5 flex items-center justify-between bg-gray-50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-4 h-4 text-fundtap-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-600 flex-shrink-0 ml-4 p-1 rounded-md hover:bg-red-50 transition-colors duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {canAddMore && !disabled && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-colors duration-200"
          >
            <input
              ref={addMoreInputRef}
              type="file"
              id={`${id}-add`}
              accept={accept}
              multiple={allowMultipleSelect}
              onChange={handleInputChange}
              disabled={disabled}
              className="hidden"
            />
            <label htmlFor={`${id}-add`} className="cursor-pointer flex items-center justify-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-fundtap-primary" />
              <span className="text-xs font-medium text-fundtap-primary">Add more</span>
            </label>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
};

export default MultiFileUploader;
