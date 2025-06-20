import React, { useState } from 'react';
import { Plus, Gift, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import TransactionItem from '../components/TransactionItem';
import { transactions } from '../data/mockData';

const WalletPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [isAddHoursModalOpen, setIsAddHoursModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [email, setEmail] = useState('');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className={`flex justify-between items-center pb-6 border-b border-gray-100 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <h2 className={`text-2xl font-bold text-[#2E86AB] flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className={`${isRTL ? 'mr-0 ml-2' : 'mr-2 ml-0'}`}>
              {t('wallet.title')}
            </span>
          </h2>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={18} />}
            onClick={() => setIsAddHoursModalOpen(true)}
          >
            {t('wallet.add')}
          </Button>
        </div>
        
        <div className="py-8 text-center">
          <p className="text-lg text-gray-600 mb-2">{t('wallet.balance')}</p>
          <h3 className="text-5xl font-bold text-[#F18F01]">
            {user?.balance} <span className="text-2xl">{t('wallet.hours')}</span>
          </h3>
          
          <div className={`flex mt-10 gap-4 justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              leftIcon={<Gift size={18} />}
            >
              {t('wallet.gift')}
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              leftIcon={<ArrowRightLeft size={18} />}
              onClick={() => setIsTransferModalOpen(true)}
            >
              {t('wallet.transfer')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-[#2E86AB] mb-6 flex items-center">
          {t('wallet.history')}
        </h3>
        
        <div className="space-y-2">
          {transactions.slice(0, 5).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
        
        {transactions.length > 5 && (
          <div className="text-center mt-6">
            <Button variant="secondary">View All Transactions</Button>
          </div>
        )}
      </div>
      
      {/* Add Hours Modal */}
      {isAddHoursModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#2E86AB] mb-6">Add Hours to Your Wallet</h3>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:border-[#2E86AB] focus:outline-none focus:ring-2 focus:ring-[#2E86AB]">
                  <i className="fas fa-credit-card text-2xl mb-2"></i>
                  <span>Credit Card</span>
                </button>
                <button className="border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:border-[#2E86AB] focus:outline-none focus:ring-2 focus:ring-[#2E86AB]">
                  <i className="fas fa-university text-2xl mb-2"></i>
                  <span>Bank Transfer</span>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Amount of Hours</label>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                  className="w-20 mx-4 text-center py-2 border border-gray-300 rounded-lg"
                />
                <button 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  onClick={() => setAmount(amount + 1)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <p className="text-center font-medium mb-6">
              Total: ${amount * 5}.00
            </p>
            
            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => setIsAddHoursModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#2E86AB] mb-6">Transfer Hours</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Recipient Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter recipient's email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Amount of Hours</label>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  min="1"
                  max={user?.balance || 1}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                  className="w-20 mx-4 text-center py-2 border border-gray-300 rounded-lg"
                />
                <button 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  onClick={() => setAmount(Math.min(user?.balance || 1, amount + 1))}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => setIsTransferModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                disabled={!email || amount < 1 || amount > (user?.balance || 0)}
              >
                Transfer Hours
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;