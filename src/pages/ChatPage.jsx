import React, { useState } from 'react'
import {
  Send,
  Image as ImageIcon,
  Search,
  MoreVertical,
  ChevronLeft
} from 'lucide-react'

const ChatPage = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Okela bạn',
      time: '10:30'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Oki được',
      time: '09:15'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Mình xác nhận được rồi',
      time: '08:45'
    }
  ])

  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        sender: 'other',
        text: 'Chào bạn, bạn khỏe không?',
        time: '10:15'
      },
      { id: 2, sender: 'user', text: 'Khỏe, bạn thế nào?', time: '10:20' },
      { id: 3, sender: 'other', text: 'Mình cũng khỏe lắm', time: '10:25' },
      { id: 4, sender: 'user', text: 'Okela bạn', time: '10:30' }
    ],
    2: [
      { id: 1, sender: 'other', text: 'Hôm nay sao bạn?', time: '09:00' },
      { id: 2, sender: 'user', text: 'Bình thường thôi', time: '09:10' },
      { id: 3, sender: 'other', text: 'Oki được', time: '09:15' }
    ],
    3: [
      {
        id: 1,
        sender: 'other',
        text: 'Bạn có nhận được hàng không?',
        time: '08:30'
      },
      { id: 2, sender: 'user', text: 'Đã nhận được', time: '08:40' },
      { id: 3, sender: 'other', text: 'Mình xác nhận được rồi', time: '08:45' }
    ]
  })

  const [messageInput, setMessageInput] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const currentChat = conversations.find((c) => c.id === selectedChat)
  const currentMessages = messages[selectedChat] || []

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId)
  }

  const handleBackToList = () => {
    setSelectedChat(null)
  }

  const handleSendMessage = () => {
    if (messageInput.trim() || selectedImage) {
      const newMessage = {
        id: currentMessages.length + 1,
        sender: 'user',
        text: messageInput || '[Hình ảnh]',
        time: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      setMessages({
        ...messages,
        [selectedChat]: [...currentMessages, newMessage]
      })
      setMessageInput('')
      setSelectedImage(null)
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='flex h-[90vh] bg-white'>
      {/* Sidebar - Danh sách tin nhắn */}
      <div
        className={`${
          selectedChat ? 'hidden md:flex' : 'flex'
        } w-full md:w-96 bg-white border-r border-gray-200 flex-col overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
          <h2 className='text-3xl font-bold'>Tin nhắn</h2>
          <button className='p-2 hover:bg-gray-100 rounded-full transition'>
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className='flex items-center gap-2 px-4 py-3 bg-gray-100 mx-4 rounded-full'>
          <Search size={18} className='text-gray-600' />
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='bg-transparent outline-none flex-1 text-sm'
          />
        </div>

        {/* Conversations List */}
        <div className='flex-1 overflow-y-auto py-2'>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition border-l-4 ${
                selectedChat === conv.id
                  ? 'bg-blue-50 border-l-blue-500'
                  : 'hover:bg-gray-100 border-l-transparent'
              }`}
              onClick={() => handleSelectChat(conv.id)}
            >
              <img
                src={conv.avatar}
                alt={conv.name}
                className='w-14 h-14 rounded-full object-cover flex-shrink-0'
              />
              <div className='flex-1 min-w-0'>
                <h4 className='text-sm font-medium text-black'>{conv.name}</h4>
                <p className='text-xs text-gray-600 truncate'>
                  {conv.lastMessage}
                </p>
              </div>
              <span className='text-xs text-gray-600 flex-shrink-0'>
                {conv.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`${
          !selectedChat ? 'hidden md:flex' : 'flex'
        } flex-1 flex-col bg-white`}
      >
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className='flex justify-between items-center px-4 md:px-5 py-3 border-b border-gray-200 bg-white'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={handleBackToList}
                  className='md:hidden p-2 hover:bg-gray-100 rounded-full transition'
                >
                  <ChevronLeft size={24} />
                </button>
                <img
                  src={currentChat.avatar}
                  alt={currentChat.name}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div>
                  <h3 className='text-sm font-semibold text-black'>
                    {currentChat.name}
                  </h3>
                  <p className='text-xs text-gray-600'>Đang hoạt động</p>
                </div>
              </div>
              <button className='p-2 hover:bg-gray-100 rounded-full transition'>
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages Display */}
            <div className='flex-1 overflow-y-auto px-4 md:px-5 py-4 flex flex-col gap-2'>
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    <p className='text-sm break-words'>{msg.text}</p>
                    <span
                      className={`text-xs block mt-1 ${
                        msg.sender === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-600'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Area */}
            <div className='px-4 md:px-5 py-4 border-t border-gray-200 bg-white'>
              {/* Image Preview */}
              {selectedImage && (
                <div className='relative mb-3 w-20 h-20'>
                  <img
                    src={selectedImage}
                    alt='preview'
                    className='w-full h-full rounded-lg object-cover'
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className='absolute -top-2 -right-2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition text-lg'
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Input Container */}
              <div className='flex gap-2 md:gap-3 items-end'>
                {/* Image Upload */}
                <label className='cursor-pointer flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-blue-500 flex-shrink-0'>
                  <ImageIcon size={20} />
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageSelect}
                    className='hidden'
                  />
                </label>

                {/* Message Input */}
                <input
                  type='text'
                  placeholder='Nhập tin nhắn...'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className='flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500 transition font-sans'
                />

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  className='flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-blue-500 flex-shrink-0'
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className='hidden md:flex flex-col items-center justify-center h-full text-gray-500'>
            <p className='text-lg'>Chọn một cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
