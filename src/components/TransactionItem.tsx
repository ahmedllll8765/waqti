import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { isRTL } = useLanguage();
  const isCredit = transaction.type === 'credit';
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`py-4 border-b border-gray-100 last:border-0 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCredit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
        </div>
        
        <div className={`${isRTL ? 'mr-3' : 'ml-3'} flex-1`}>
          <h4 className="font-medium text-gray-800">
            {transaction.description}
          </h4>
          <p className="text-sm text-gray-500">
            {formatDate(transaction.date)}
          </p>
        </div>
        
        <div className={`font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
          {isCredit ? '+' : '-'}{transaction.amount} {transaction.amount === 1 ? 'Hour' : 'Hours'}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;