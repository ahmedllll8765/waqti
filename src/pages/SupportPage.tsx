import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';
import Button from '../components/Button';

const SupportPage: React.FC = () => {
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('faq');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    {
      question: 'How does the time exchange system work?',
      answer: 'Our platform uses time as currency. When you provide a service, you earn time credits that you can use to receive services from others. Each service has an hourly rate, and transactions are made using these time credits.'
    },
    {
      question: 'How do I become a service provider?',
      answer: 'To become a service provider, you need to register an account, verify your identity and expertise, and create a service listing. We have a verification process to ensure the quality of services offered on our platform.'
    },
    {
      question: 'Is there a minimum or maximum time credit limit?',
      answer: 'New users start with 2 hours of credit. There is no maximum limit to how many hours you can earn, but you can only book services if you have sufficient time credits in your balance.'
    },
    {
      question: 'What happens if I need to cancel a booking?',
      answer: 'You can cancel a booking up to 24 hours before the scheduled time without any penalty. Late cancellations may result in a partial deduction of time credits.'
    },
    {
      question: 'How are service quality and safety ensured?',
      answer: 'We verify all service providers through our expertise verification system. Additionally, we have a rating and review system that helps maintain service quality. All transactions are recorded and monitored for safety.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, email, message });
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Support Options */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className={`text-3xl font-bold mb-8 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-center'}`}>
            How Can We Help You?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Mail className="w-12 h-12 text-[#2E86AB] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email within 24 hours</p>
              <a href="mailto:support@waqti.com" className="text-[#2E86AB] hover:underline">
                support@waqti.com
              </a>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Phone className="w-12 h-12 text-[#2E86AB] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Available 9 AM - 6 PM GST</p>
              <a href="tel:+97140000000" className="text-[#2E86AB] hover:underline">
                +971 4 000 0000
              </a>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-12 h-12 text-[#2E86AB] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <button className="text-[#2E86AB] hover:underline">
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'faq'
                  ? 'border-b-2 border-[#2E86AB] text-[#2E86AB]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              <HelpCircle className="inline-block mr-2" size={18} />
              Frequently Asked Questions
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'contact'
                  ? 'border-b-2 border-[#2E86AB] text-[#2E86AB]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              <Mail className="inline-block mr-2" size={18} />
              Contact Us
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'faq' ? (
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-semibold mb-2 text-[#2E86AB]">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;