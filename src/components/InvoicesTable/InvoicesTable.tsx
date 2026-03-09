import React from 'react';
import { MoreVertical } from 'lucide-react';

const InvoicesTable: React.FC = () => {
  // Sample empty rows for demonstration
  const emptyRows = Array(3).fill(null);
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50/50">
          <tr className="text-left text-gray-600 text-sm border-b border-gray-200/80">
            <th className="pb-3 pl-1 pr-3 font-medium">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-fundtap-primary focus:ring-2 focus:ring-fundtap-primary/20 transition-all duration-200"
              />
            </th>
            <th className="py-4 px-3 font-semibold tracking-wide">INVOICE</th>
            <th className="py-4 px-3 font-semibold tracking-wide">DEBTOR</th>
            <th className="py-4 px-3 font-semibold tracking-wide">INVOICE TOTAL</th>
            <th className="py-4 px-3 font-semibold tracking-wide">DUE DATE</th>
            <th className="py-4 px-3 font-semibold tracking-wide">NOTE</th>
            <th className="py-4 px-3 font-semibold tracking-wide text-right">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {emptyRows.map((_, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-fundtap-light/30 transition-all duration-200">
              <td className="py-4 pl-1 pr-3">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-fundtap-primary focus:ring-2 focus:ring-fundtap-primary/20 transition-all duration-200"
                />
              </td>
              <td className="py-4 px-3">
                <div className="h-5 bg-gray-200/70 rounded-md w-24 animate-pulse"></div>
              </td>
              <td className="py-4 px-3">
                <div className="h-5 bg-gray-200/70 rounded-md w-32 animate-pulse"></div>
              </td>
              <td className="py-4 px-3">
                <div className="h-5 bg-gray-200/70 rounded-md w-20 animate-pulse"></div>
              </td>
              <td className="py-4 px-3">
                <div className="h-5 bg-gray-200/70 rounded-md w-24 animate-pulse"></div>
              </td>
              <td className="py-4 px-3">
                <div className="h-5 bg-gray-200/70 rounded-md w-32 animate-pulse"></div>
              </td>
              <td className="py-4 px-3 text-right">
                <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <MoreVertical size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;