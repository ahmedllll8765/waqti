import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  fileUrl?: string;
  fileName?: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
  }[];
  lastMessage: Message;
  unreadCount: number;
}

interface MessagesPageProps {
  setActivePage: (page: string) => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ setActivePage }) => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participants: [
        { id: '101', name: 'Ahmed Hassan', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
        { id: user?.id || '', name: user?.name || '', avatar: user?.avatar, online: true }
      ],
      lastMessage: {
        id: '1',
        senderId: '101',
        receiverId: user?.id || '',
        content: 'Thanks for your interest in my web development service!',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: 'text',
        read: false
      },
      unreadCount: 2
    },
    {
      id: '2',
      participants: [
        { id: '102', name: 'Layla Mohamed', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', online: false },
        { id: user?.id || '', name: user?.name || '', avatar: user?.avatar, online: true }
      ],
      lastMessage: {
        id: '2',
        senderId: user?.id || '',
        receiverId: '102',
        content: 'When can we schedule the translation work?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'text',
        read: true
      },
      unreadCount: 0
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '101',
      receiverId: user?.id || '',
      content: 'Hi! I saw your request for web development services.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text',
      read: true
    },
    {
      id: '2',
      senderId: user?.id || '',
      receiverId: '101',
      content: 'Yes, I need a modern website for my business. Can you help?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: 'text',
      read: true
    },
    {
      id: '3',
      senderId: '101',
      receiverId: user?.id || '',
      content: 'Absolutely! I specialize in React and modern web technologies.',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: 'text',
      read: true
    },
    {
      id: '4',
      senderId: '101',
      receiverId: user?.id || '',
      content: 'Thanks for your interest in my web development service!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      read: false
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p.id !== user?.id && p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const otherParticipant = selectedConv?.participants.find(p => p.id !== user?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: otherParticipant?.id || '',
      content: messageText.trim(),
      timestamp: new Date(),
      type: 'text',
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: otherParticipant?.id || '',
      content: `Sent a file: ${file.name}`,
      timestamp: new Date(),
      type: 'file',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!user) {
    setActivePage('login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-[600px] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2E86AB] mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => {
              const otherUser = conversation.participants.find(p => p.id !== user.id);
              return (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-[#2E86AB]' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={otherUser?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                        alt={otherUser?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {otherUser?.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900 truncate">{otherUser?.name}</h3>
                        <span className="text-xs text-gray-500">
                          {formatLastMessageTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="ml-2 bg-[#F18F01] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={otherParticipant?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={otherParticipant?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {otherParticipant?.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{otherParticipant?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {otherParticipant?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Video size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages
                  .filter(msg => 
                    (msg.senderId === user.id && msg.receiverId === otherParticipant?.id) ||
                    (msg.senderId === otherParticipant?.id && msg.receiverId === user.id)
                  )
                  .map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === user.id
                            ? 'bg-[#2E86AB] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.type === 'file' && message.fileName && (
                          <div className="mt-2 p-2 bg-white bg-opacity-20 rounded">
                            <p className="text-xs">{message.fileName}</p>
                          </div>
                        )}
                        <p className={`text-xs mt-1 ${
                          message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="px-4 py-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="ml-2">{otherParticipant?.name} is typing...</span>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    variant="primary"
                    className="px-4 py-2"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;