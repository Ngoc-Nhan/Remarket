import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { getConversationsAPI, getMessagesAPI, sendMessageAPI } from '@/apis'
import { getSocket, initializeSocket } from '@/sockets/messageSocket'
import { toast } from 'sonner'
import {
  Send,
  Image as ImageIcon,
  Search,
  MoreVertical,
  ChevronLeft
} from 'lucide-react'

const ChatPage = () => {
  const { user: currentUser } = useAuthStore()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const messagesEndRef = useRef(null)

  // Sử dụng ref để lưu trữ giá trị state mới nhất cho listener của socket
  const selectedConversationRef = useRef(selectedConversation)
  useEffect(() => {
    selectedConversationRef.current = selectedConversation
  }, [selectedConversation])

  // 0. Initialize socket connection
  useEffect(() => {
    initializeSocket()

    return () => {
      const socket = getSocket()
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  // 1. Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const convs = await getConversationsAPI()
        console.log(convs)
        setConversations(convs)
      } catch (error) {
        toast.error('Lỗi khi tải danh sách cuộc trò chuyện.')
        console.error(error)
      }
    }
    fetchConversations()
  }, [])

  // 2. Handle selecting a chat from URL or list
  useEffect(() => {
    const otherUserIdFromUrl = searchParams.get('user')
    if (otherUserIdFromUrl && conversations.length > 0) {
      const conv = conversations.find(
        (c) => c.otherParticipant._id === otherUserIdFromUrl
      )
      if (conv) {
        setSelectedConversation(conv)
      }
    }
  }, [searchParams, conversations])

  // 3. Fetch messages when a conversation is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return
      setIsLoadingMessages(true)
      try {
        const msgs = await getMessagesAPI(
          selectedConversation.otherParticipant._id
        )
        setMessages(msgs)
      } catch (error) {
        toast.error('Lỗi khi tải tin nhắn.')
        console.error(error)
      } finally {
        setIsLoadingMessages(false)
      }
    }
    fetchMessages()
  }, [selectedConversation])

  // 4. Setup Socket.IO listener
  useEffect(() => {
    const socket = getSocket()
    if (!socket) return

    const handleNewMessage = (newMessage) => {
      const currentSelectedConv = selectedConversationRef.current
      // Cập nhật tin nhắn nếu nó thuộc về cuộc trò chuyện đang mở
      if (
        currentSelectedConv &&
        newMessage.conversationId === currentSelectedConv._id
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }

      // Cập nhật tin nhắn cuối cùng và đưa cuộc trò chuyện lên đầu danh sách
      setConversations((prevConvs) => {
        let conversationExists = false
        const updatedConvs = prevConvs.map((conv) => {
          if (conv._id === newMessage.conversationId) {
            conversationExists = true
            return { ...conv, lastMessage: newMessage }
          }
          return conv
        })

        // Nếu không tìm thấy cuộc trò chuyện (trường hợp tin nhắn đầu tiên), bạn có thể thêm logic để fetch lại danh sách hoặc thêm mới.
        // Hiện tại, chỉ sắp xếp lại.
        return updatedConvs.sort(
          (a, b) =>
            new Date(b.lastMessage?.createdAt || 0) -
            new Date(a.lastMessage?.createdAt || 0)
        )
      })
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('newMessage', handleNewMessage)
    }
  }, []) // Chạy một lần duy nhất khi component mount

  // 5. Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSelectChat = useCallback(
    (conversation) => {
      setSelectedConversation(conversation)
      // Update URL without reloading page
      navigate(`/messages?user=${conversation.otherParticipant._id}`, {
        replace: true
      })
    },
    [navigate]
  )

  const handleBackToList = useCallback(() => {
    setSelectedConversation(null)
    navigate('/messages', { replace: true })
  }, [navigate])

  const handleSendMessage = useCallback(
    async (e) => {
      // Ngăn form submit nếu dùng thẻ <form>
      if (e) e.preventDefault()

      if (!messageInput.trim() || !selectedConversation) return

      const payload = {
        receiverId: selectedConversation.otherParticipant._id,
        message: messageInput
      }

      try {
        // Backend sẽ emit 'newMessage' qua socket, client không cần tự thêm tin nhắn
        await sendMessageAPI(payload)
        setMessageInput('')
      } catch (error) {
        toast.error('Gửi tin nhắn thất bại.')
        console.error(error)
      }
    },
    [messageInput, selectedConversation]
  )

  // Placeholder for image upload logic
  const handleImageSelect = (e) => {
    toast.info('Chức năng gửi ảnh đang được phát triển.')
  }

  return (
    <div className='flex h-[90vh] bg-white'>
      {/* Sidebar - Danh sách tin nhắn */}
      <div
        className={`${
          selectedConversation ? 'hidden md:flex' : 'flex'
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
              key={conv._id}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition border-l-4 ${
                selectedConversation?._id === conv._id
                  ? 'bg-blue-50 border-l-blue-500'
                  : 'hover:bg-gray-100 border-l-transparent'
              }`}
              onClick={() => handleSelectChat(conv)}
            >
              <img
                src={
                  conv?.otherParticipant?.avatar ||
                  'https://bom.edu.vn/public/upload/2024/12/ad06bd849ba4028c25ede6b743be3a64.webp'
                }
                alt={conv?.otherParticipant?.displayName}
                className='w-14 h-14 rounded-full object-cover flex-shrink-0'
              />
              <div className='flex-1 min-w-0'>
                <h4 className='text-sm font-medium text-black'>
                  {conv?.otherParticipant?.displayName}
                </h4>
                <p className='text-xs text-gray-600 truncate'>
                  {conv.lastMessage?.senderId === currentUser._id && 'Bạn: '}
                  {conv.lastMessage?.message || 'Bắt đầu cuộc trò chuyện'}
                </p>
              </div>
              <span className='text-xs text-gray-600 flex-shrink-0'>
                {conv.lastMessage &&
                  new Date(conv.lastMessage.createdAt).toLocaleTimeString(
                    'vi-VN',
                    { hour: '2-digit', minute: '2-digit' }
                  )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`${
          !selectedConversation ? 'hidden md:flex' : 'flex'
        } flex-1 flex-col bg-white`}
      >
        {selectedConversation ? (
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
                  src={
                    selectedConversation?.otherParticipant?.avatar ||
                    'https://bom.edu.vn/public/upload/2024/12/ad06bd849ba4028c25ede6b743be3a64.webp'
                  }
                  alt={selectedConversation.otherParticipant.displayName}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div>
                  <h3 className='text-sm font-semibold text-black'>
                    {selectedConversation.otherParticipant.displayName}
                  </h3>
                  <p className='text-xs text-gray-600'>Đang hoạt động</p>
                </div>
              </div>
              <button className='p-2 hover:bg-gray-100 rounded-full transition'>
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages Display */}
            <div className='flex-1 overflow-y-auto px-4 md:px-5 py-4'>
              {isLoadingMessages ? (
                <div className='flex justify-center items-center h-full'>
                  <p>Đang tải tin nhắn...</p>
                </div>
              ) : (
                <div className='flex flex-col gap-2'>
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.senderId === currentUser._id
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl ${
                          msg.senderId === currentUser._id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-black'
                        }`}
                      >
                        <p className='text-sm break-words'>{msg.message}</p>
                        <span
                          className={`text-xs block mt-1 ${
                            msg.senderId === currentUser._id
                              ? 'text-blue-100'
                              : 'text-gray-600'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
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
              <form
                onSubmit={handleSendMessage}
                className='flex gap-2 md:gap-3 items-end'
              >
                {/* Image Upload Button */}
                <label
                  htmlFor='image-upload'
                  className='cursor-pointer flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-blue-500 flex-shrink-0'
                >
                  <ImageIcon size={20} />
                  <input
                    id='image-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageSelect}
                    className='hidden'
                  />
                </label>

                {/* Text Input */}
                <input
                  type='text'
                  placeholder='Nhập tin nhắn...'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      handleSendMessage(e)
                    }
                  }}
                  className='flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500 transition font-sans'
                />

                {/* Send Button */}
                <button
                  type='submit'
                  onClick={handleSendMessage}
                  className='flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition flex-shrink-0 disabled:bg-gray-300'
                  disabled={!messageInput.trim()}
                >
                  <Send size={20} />
                </button>
              </form>
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
