import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import InvoicesTable from '../InvoicesTable/InvoicesTable';
import Pagination from '../Pagination/Pagination';

const InvoicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('to-fund');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const TabButton: React.FC<{ 
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }> = ({ id, label, isActive, onClick }) => (
    <button
      id={id}
      onClick={onClick}
      className={`px-6 py-3 font-medium transition-colors duration-200 ${
        isActive 
          ? 'bg-white text-gray-800 border-b-2 border-fundtap-secondary' 
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-lg">
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Invoices</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-fundtap-secondary hover:text-fundtap-primary font-medium bg-fundtap-light rounded-lg hover:bg-fundtap-light transition-all duration-200">
            <RefreshCw size={16} className="mr-1" />
            Sync Invoices
          </button>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <div className="flex">
          <TabButton 
            id="to-fund-tab" 
            label="To Fund"
            isActive={activeTab === 'to-fund'}
            onClick={() => handleTabChange('to-fund')}
          />
          <TabButton 
            id="submitted-tab"
            label="Submitted"
            isActive={activeTab === 'submitted'}
            onClick={() => handleTabChange('submitted')}
          />
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices by number, client, or amount..."
              className="w-full px-4 py-3.5 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fundtap-secondary/20 focus:border-fundtap-secondary/30 transition-all duration-200"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <InvoicesTable />
        
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export { InvoicesSection as default };