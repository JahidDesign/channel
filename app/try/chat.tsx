"use client";

import { useEffect, useState, useRef } from "react";

type Seat = {
  id: number;
  user: null | {
    id: string;
    name: string;
  };
};

type Message = {
  id: string;
  type: "chat" | "system" | "emoji";
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
};

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

const EMOJIS = ["❤️", "👍", "😂", "🎉", "🔥", "👏", "😍", "✨"];

export default function RoomPage() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [name] = useState("User-" + Math.floor(Math.random() * 1000));
  const [userId] = useState("uid-" + Math.random().toString(36).substr(2, 9));
  const [mySeatId, setMySeatId] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [isJoining, setIsJoining] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{id: string, emoji: string, x: number}>>([]);
  const [showChat, setShowChat] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const hasInitialized = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initialSeats: Seat[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      user: null,
    }));
    setSeats(initialSeats);
    
    setTimeout(() => {
      setConnectionStatus("connected");
      addSystemMessage("Welcome to the Live Room! 🎉");
      addSystemMessage("This is a demo mode - real-time features will work when connected to Socket.IO");
      
      // Add demo users
      setTimeout(() => {
        const demoUsers = [
          { id: "demo1", name: "Alex" },
          { id: "demo2", name: "Sam" },
          { id: "demo3", name: "Jordan" }
        ];
        
        setSeats(prev => prev.map((s, idx) => {
          if (idx < 3) {
            return { ...s, user: demoUsers[idx] };
          }
          return s;
        }));
        
        addSystemMessage("👋 Alex joined the room!");
        setTimeout(() => addSystemMessage("👋 Sam joined the room!"), 1000);
        setTimeout(() => addSystemMessage("👋 Jordan joined the room!"), 2000);
        
        // Demo messages
        setTimeout(() => {
          addChatMessage("Hey everyone! 👋", "Alex", "demo1");
        }, 3000);
        
        setTimeout(() => {
          addChatMessage("Welcome! This is a demo of the live room", "Sam", "demo2");
        }, 4500);
        
        setTimeout(() => {
          const demoEmoji: Message = {
            id: Math.random().toString(36),
            type: "emoji",
            userId: "demo3",
            userName: "Jordan",
            content: "🎉",
            timestamp: Date.now(),
          };
          setMessages(prev => [...prev, demoEmoji]);
        }, 6000);
        
      }, 2000);
    }, 500);

    return () => {};
  }, []);

  const addSystemMessage = (content: string) => {
    const msg: Message = {
      id: Math.random().toString(36),
      type: "system",
      userId: "system",
      userName: "System",
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);
  };

  const addChatMessage = (content: string, userName: string, userId: string) => {
    const msg: Message = {
      id: Math.random().toString(36),
      type: "chat",
      userId,
      userName,
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);
  };

  const joinSeat = () => {
    if (mySeatId !== null) {
      return;
    }

    setIsJoining(true);
    const availableSeat = seats.find(s => s.user === null);
    
    if (!availableSeat) {
      setIsJoining(false);
      return;
    }

    setTimeout(() => {
      setSeats(prev => prev.map(s => 
        s.id === availableSeat.id 
          ? { ...s, user: { id: userId, name } }
          : s
      ));
      setMySeatId(availableSeat.id);
      setIsJoining(false);
      addSystemMessage(`👋 ${name} joined the room!`);
    }, 300);
  };

  const leaveSeat = () => {
    if (mySeatId === null) return;
    
    setSeats(prev => prev.map(s => 
      s.id === mySeatId 
        ? { ...s, user: null }
        : s
    ));
    addSystemMessage(`${name} left the room`);
    setMySeatId(null);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || mySeatId === null) return;

    addChatMessage(messageInput, name, userId);
    setMessageInput("");
    
    // Stop typing indicator
    setTypingUsers(prev => prev.filter(u => u !== name));
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleInputChange = (value: string) => {
    setMessageInput(value);
    
    if (mySeatId === null) return;
    
    // Show typing indicator
    if (value.trim() && !typingUsers.includes(name)) {
      setTypingUsers(prev => [...prev, name]);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to remove typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setTypingUsers(prev => prev.filter(u => u !== name));
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendEmoji = (emoji: string) => {
    if (mySeatId === null) return;

    const msg: Message = {
      id: Math.random().toString(36),
      type: "emoji",
      userId,
      userName: name,
      content: emoji,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);

    const floatingId = Math.random().toString(36);
    const randomX = Math.random() * 80 + 10;
    setFloatingEmojis(prev => [...prev, { id: floatingId, emoji, x: randomX }]);

    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== floatingId));
    }, 3000);

    setShowEmojiPicker(false);
  };

  const occupiedCount = seats.filter(s => s.user).length;
  const unreadCount = messages.length;

  return (
    <div className="relative h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white flex flex-col overflow-hidden">
      
      {/* Connection Status Banner */}
      {connectionStatus !== "connected" && (
        <div className={`px-4 py-2 text-center text-xs sm:text-sm ${
          connectionStatus === "error" ? "bg-red-600" :
          connectionStatus === "connecting" ? "bg-yellow-600" :
          "bg-gray-600"
        }`}>
          {connectionStatus === "connecting" && "Connecting..."}
          {connectionStatus === "disconnected" && "Reconnecting..."}
          {connectionStatus === "error" && "Connection error"}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 bg-black/20 flex-shrink-0">
        <div>
          <div className="font-semibold text-sm sm:text-lg flex items-center gap-2">
            Live Room
            <span className="text-[10px] sm:text-xs bg-yellow-600/80 px-1.5 py-0.5 rounded">DEMO</span>
          </div>
          <div className="text-xs text-purple-200">
            {occupiedCount} / {seats.length} online
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 items-center">
          {/* Mobile Chat Toggle */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="lg:hidden relative px-2 sm:px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded text-xs sm:text-sm transition-colors"
          >
            💬
            {!showChat && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {mySeatId !== null ? (
            <>
              <div className="hidden sm:flex px-2 sm:px-3 py-1 rounded bg-green-600/30 text-xs items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="hidden sm:inline">Seat {mySeatId}</span>
              </div>
              <button
                onClick={leaveSeat}
                className="rounded bg-red-600 hover:bg-red-700 px-2 sm:px-3 py-1 text-xs sm:text-sm transition-colors"
              >
                Leave
              </button>
            </>
          ) : (
            <button
              onClick={joinSeat}
              disabled={isJoining || connectionStatus !== "connected"}
              className="rounded bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-2 sm:px-4 py-1 text-xs sm:text-sm transition-colors"
            >
              {isJoining ? "Joining..." : "Join"}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Seats Section */}
        <div className={`${showChat ? 'hidden lg:flex' : 'flex'} flex-1 overflow-y-auto p-3 sm:p-6`}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-x-4 sm:gap-y-8 max-w-2xl mx-auto w-full">
            {seats.map((seat) => {
              const isMe = seat.user?.id === userId;
              const isOccupied = seat.user !== null;
              
              return (
                <div key={seat.id} className="flex flex-col items-center">
                  <div className={`
                    h-14 w-14 sm:h-20 sm:w-20 rounded-full flex items-center justify-center text-xs sm:text-sm
                    transition-all duration-300 relative
                    ${isMe ? "bg-gradient-to-br from-green-500 to-emerald-600 ring-2 sm:ring-4 ring-green-300/50" :
                      isOccupied ? "bg-gradient-to-br from-pink-500 to-purple-600" :
                      "bg-white/10 hover:bg-white/20 cursor-pointer border border-dashed sm:border-2 border-white/30"
                    }
                  `}>
                    {isOccupied ? (
                      <div className="text-center px-1 sm:px-2">
                        <div className="font-semibold text-[10px] sm:text-xs leading-tight break-words">
                          {seat.user.name}
                        </div>
                        {isMe && (
                          <div className="text-[8px] sm:text-[10px] opacity-75 mt-0.5">(You)</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xl sm:text-3xl text-white/50">＋</span>
                    )}
                  </div>
                  <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs ${isMe ? "text-green-300 font-semibold" : "opacity-70"}`}>
                    Seat {seat.id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Section - Desktop */}
        <div className="hidden lg:flex w-96 bg-black/30 backdrop-blur-sm flex-col border-l border-white/10">
          <ChatContent 
            messages={messages}
            messageInput={messageInput}
            setMessageInput={handleInputChange}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            mySeatId={mySeatId}
            userId={userId}
            sendMessage={sendMessage}
            sendEmoji={sendEmoji}
            handleKeyPress={handleKeyPress}
            messagesEndRef={messagesEndRef}
            chatContainerRef={chatContainerRef}
            typingUsers={typingUsers}
          />
        </div>

        {/* Chat Section - Mobile Overlay */}
        {showChat && (
          <div className="lg:hidden absolute inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 bg-black/40 border-b border-white/10">
              <div className="font-semibold">Live Chat</div>
              <button
                onClick={() => setShowChat(false)}
                className="text-2xl hover:text-pink-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              <ChatContent 
                messages={messages}
                messageInput={messageInput}
                setMessageInput={handleInputChange}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                mySeatId={mySeatId}
                userId={userId}
                sendMessage={sendMessage}
                sendEmoji={sendEmoji}
                handleKeyPress={handleKeyPress}
                messagesEndRef={messagesEndRef}
                chatContainerRef={chatContainerRef}
                typingUsers={typingUsers}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Emojis */}
      {floatingEmojis.map(item => (
        <div
          key={item.id}
          className="fixed bottom-0 text-3xl sm:text-5xl pointer-events-none z-40"
          style={{
            left: `${item.x}%`,
            animation: 'float-up 3s ease-out forwards'
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Mobile Bottom Indicator */}
      {mySeatId !== null && (
        <div className="lg:hidden px-3 py-2 bg-black/40 text-center text-xs text-green-300 flex-shrink-0">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            You're in Seat {mySeatId}
          </span>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-40vh) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function ChatContent({ 
  messages, 
  messageInput, 
  setMessageInput, 
  showEmojiPicker, 
  setShowEmojiPicker,
  mySeatId,
  userId,
  sendMessage,
  sendEmoji,
  handleKeyPress,
  messagesEndRef,
  chatContainerRef,
  typingUsers
}: {
  messages: Message[];
  messageInput: string;
  setMessageInput: (val: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (val: boolean) => void;
  mySeatId: number | null;
  userId: string;
  sendMessage: () => void;
  sendEmoji: (emoji: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  typingUsers: string[];
}) {
  return (
    <>
      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 min-h-0"
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === "system" ? (
              <div className="text-center text-xs text-purple-300 py-1">
                {msg.content}
              </div>
            ) : msg.type === "emoji" ? (
              <div className="text-center py-1">
                <span className="inline-block text-xs text-purple-300 mr-2">
                  {msg.userName}
                </span>
                <span className="text-2xl sm:text-3xl">{msg.content}</span>
              </div>
            ) : (
              <div className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] ${msg.userId === userId ? "bg-pink-600" : "bg-purple-700"} rounded-lg px-2 sm:px-3 py-1.5 sm:py-2`}>
                  <div className="text-[10px] sm:text-xs opacity-75 mb-0.5 sm:mb-1">{msg.userName}</div>
                  <div className="text-xs sm:text-sm break-words">{msg.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-purple-300 italic px-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
            </div>
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...`
                : typingUsers.length === 2
                ? `${typingUsers[0]} and ${typingUsers[1]} are typing...`
                : `${typingUsers.length} people are typing...`
              }
            </span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-black/20 border-t border-white/10 flex-shrink-0">
        <div className="space-y-2">
          {/* Emoji Picker */}
          {showEmojiPicker && mySeatId !== null && (
            <div className="bg-purple-800 rounded-lg p-2 flex flex-wrap gap-2 justify-center">
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => sendEmoji(emoji)}
                  className="text-xl sm:text-2xl hover:scale-125 transition-transform active:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Message Input */}
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => mySeatId !== null && setShowEmojiPicker(!showEmojiPicker)}
              disabled={mySeatId === null}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-lg sm:text-xl flex-shrink-0"
              title={mySeatId === null ? "Join a seat to use emojis" : "Emojis"}
            >
              😊
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={mySeatId === null ? "Join a seat to chat..." : "Type your message..."}
              disabled={mySeatId === null}
              className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm min-w-0 placeholder:text-white/40"
            />
            {messageInput.trim() ? (
              <button
                onClick={sendMessage}
                disabled={mySeatId === null}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-xs sm:text-sm font-semibold flex-shrink-0"
                title={mySeatId === null ? "Join a seat to send messages" : "Send message"}
              >
                Send ➤
              </button>
            ) : (
              <button
                disabled={mySeatId === null}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-lg sm:text-xl flex-shrink-0"
                title={mySeatId === null ? "Join a seat to send voice" : "Voice message (coming soon)"}
                onClick={() => mySeatId !== null && alert('🎤 Voice message feature coming soon!')}
              >
                🎤
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

//Add news

"use client";

import { useEffect, useState, useRef } from "react";

type Seat = {
  id: number;
  user: null | {
    id: string;
    name: string;
    avatar?: string;
  };
};

type Message = {
  id: string;
  type: "chat" | "system" | "emoji" | "image";
  userId: string;
  userName: string;
  content: string;
  imageUrl?: string;
  timestamp: number;
};

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

const EMOJIS = ["❤️", "👍", "😂", "🎉", "🔥", "👏", "😍", "✨"];

// Generate random avatar
const generateRandomAvatar = (userName: string) => {
  const colors = ['FF6B6B', 'F06595', 'CC5DE8', '845EF7', '5C7CFA', '339AF0', '22B8CF', '20C997', '51CF66', '94D82D', 'FCC419', 'FF922B'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const initial = userName.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${initial}&background=${color}&color=fff&size=128&bold=true`;
};

export default function RoomPage() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string>("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [userId] = useState("uid-" + Math.random().toString(36).substr(2, 9));
  const [mySeatId, setMySeatId] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [isJoining, setIsJoining] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{id: string, emoji: string, x: number}>>([]);
  const [showChat, setShowChat] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const hasInitialized = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Auto-generate username and avatar
    const randomNum = Math.floor(Math.random() * 10000);
    const generatedName = `User${randomNum}`;
    setName(generatedName);
    setAvatar(generateRandomAvatar(generatedName));

    const initialSeats: Seat[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      user: null,
    }));
    setSeats(initialSeats);
    
    setTimeout(() => {
      setConnectionStatus("connected");
      addSystemMessage("Welcome to the Live Room! 🎉");
      addSystemMessage("This is a demo mode - real-time features will work when connected to Socket.IO");
      
      // Add demo users with avatars
      setTimeout(() => {
        const demoUsers = [
          { id: "demo1", name: "Alex", avatar: generateRandomAvatar("Alex") },
          { id: "demo2", name: "Sam", avatar: generateRandomAvatar("Sam") },
          { id: "demo3", name: "Jordan", avatar: generateRandomAvatar("Jordan") }
        ];
        
        setSeats(prev => prev.map((s, idx) => {
          if (idx < 3) {
            return { ...s, user: demoUsers[idx] };
          }
          return s;
        }));
        
        addSystemMessage("👋 Alex joined the room!");
        setTimeout(() => addSystemMessage("👋 Sam joined the room!"), 1000);
        setTimeout(() => addSystemMessage("👋 Jordan joined the room!"), 2000);
        
        // Demo messages
        setTimeout(() => {
          addChatMessage("Hey everyone! 👋", "Alex", "demo1");
        }, 3000);
        
        setTimeout(() => {
          addChatMessage("Welcome! This is a demo of the live room", "Sam", "demo2");
        }, 4500);
        
        setTimeout(() => {
          const demoEmoji: Message = {
            id: Math.random().toString(36),
            type: "emoji",
            userId: "demo3",
            userName: "Jordan",
            content: "🎉",
            timestamp: Date.now(),
          };
          setMessages(prev => [...prev, demoEmoji]);
        }, 6000);
        
      }, 2000);
    }, 500);

    return () => {};
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image too large! Maximum size is 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNameSubmit = () => {
    if (name.trim().length < 2) {
      alert('Name must be at least 2 characters');
      return;
    }
    
    // Update avatar if name changed
    if (!avatar.startsWith('data:')) {
      setAvatar(generateRandomAvatar(name));
    }
    
    setShowNameModal(false);
  };

  const regenerateAvatar = () => {
    setAvatar(generateRandomAvatar(name || 'User'));
  };

  const addSystemMessage = (content: string) => {
    const msg: Message = {
      id: Math.random().toString(36),
      type: "system",
      userId: "system",
      userName: "System",
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);
  };

  const addChatMessage = (content: string, userName: string, userId: string) => {
    const msg: Message = {
      id: Math.random().toString(36),
      type: "chat",
      userId,
      userName,
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);
  };

  const joinSeat = () => {
    if (mySeatId !== null) {
      return;
    }

    setIsJoining(true);
    const availableSeat = seats.find(s => s.user === null);
    
    if (!availableSeat) {
      setIsJoining(false);
      return;
    }

    setTimeout(() => {
      setSeats(prev => prev.map(s => 
        s.id === availableSeat.id 
          ? { ...s, user: { id: userId, name, avatar } }
          : s
      ));
      setMySeatId(availableSeat.id);
      setIsJoining(false);
      addSystemMessage(`👋 ${name} joined the room!`);
    }, 300);
  };

  const changeSeat = (targetSeatId: number) => {
    if (mySeatId === null) return;
    
    const targetSeat = seats.find(s => s.id === targetSeatId);
    if (!targetSeat || targetSeat.user !== null) return;

    setSeats(prev => prev.map(s => {
      if (s.id === mySeatId) {
        return { ...s, user: null };
      }
      if (s.id === targetSeatId) {
        return { ...s, user: { id: userId, name, avatar } };
      }
      return s;
    }));
    
    setMySeatId(targetSeatId);
    addSystemMessage(`${name} moved to Seat ${targetSeatId}`);
  };

  const leaveSeat = () => {
    if (mySeatId === null) return;
    
    setSeats(prev => prev.map(s => 
      s.id === mySeatId 
        ? { ...s, user: null }
        : s
    ));
    addSystemMessage(`${name} left the room`);
    setMySeatId(null);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || mySeatId === null) return;

    addChatMessage(messageInput, name, userId);
    setMessageInput("");
    
    // Stop typing indicator
    setTypingUsers(prev => prev.filter(u => u !== name));
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleInputChange = (value: string) => {
    setMessageInput(value);
    
    if (mySeatId === null) return;
    
    // Show typing indicator
    if (value.trim() && !typingUsers.includes(name)) {
      setTypingUsers(prev => [...prev, name]);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to remove typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setTypingUsers(prev => prev.filter(u => u !== name));
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendEmoji = (emoji: string) => {
    if (mySeatId === null) return;

    const msg: Message = {
      id: Math.random().toString(36),
      type: "emoji",
      userId,
      userName: name,
      content: emoji,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);

    const floatingId = Math.random().toString(36);
    const randomX = Math.random() * 80 + 10;
    setFloatingEmojis(prev => [...prev, { id: floatingId, emoji, x: randomX }]);

    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== floatingId));
    }, 3000);

    setShowEmojiPicker(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || mySeatId === null) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large! Maximum size is 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      
      // Send image message
      const msg: Message = {
        id: Math.random().toString(36),
        type: "image",
        userId,
        userName: name,
        content: file.name,
        imageUrl,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, msg]);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const occupiedCount = seats.filter(s => s.user).length;
  const unreadCount = messages.length;

  return (
    <div className="relative h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white flex flex-col overflow-hidden">
      
      {/* Name & Avatar Setup Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Welcome to Live Room!</h2>
            
            {/* Avatar Upload */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-pink-400">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl sm:text-5xl">👤</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-pink-600 hover:bg-pink-700 rounded-full p-2 cursor-pointer shadow-lg transition-colors">
                  <span className="text-xl">📷</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={regenerateAvatar}
                  className="absolute bottom-0 left-0 bg-blue-600 hover:bg-blue-700 rounded-full p-2 shadow-lg transition-colors"
                  title="Generate new avatar"
                >
                  <span className="text-xl">🎲</span>
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-purple-200">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="Enter your name..."
                  maxLength={20}
                  autoFocus
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:outline-none focus:border-pink-400 text-white placeholder:text-white/40"
                />
                <div className="text-xs text-purple-200 mt-1 flex justify-between">
                  <span>Auto-generated: You can change it</span>
                  <span>{name.length}/20</span>
                </div>
              </div>

              <button
                onClick={handleNameSubmit}
                disabled={name.trim().length < 2}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Enter Room
              </button>
              
              <p className="text-xs text-center text-purple-200">
                💡 Tip: Click 🎲 to generate a new avatar or 📷 to upload your own
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Connection Status Banner */}
      {connectionStatus !== "connected" && (
        <div className={`px-4 py-2 text-center text-xs sm:text-sm ${
          connectionStatus === "error" ? "bg-red-600" :
          connectionStatus === "connecting" ? "bg-yellow-600" :
          "bg-gray-600"
        }`}>
          {connectionStatus === "connecting" && "Connecting..."}
          {connectionStatus === "disconnected" && "Reconnecting..."}
          {connectionStatus === "error" && "Connection error"}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 bg-black/20 flex-shrink-0">
        <div>
          <div className="font-semibold text-sm sm:text-lg flex items-center gap-2">
            Live Room
            <span className="text-[10px] sm:text-xs bg-yellow-600/80 px-1.5 py-0.5 rounded">DEMO</span>
          </div>
          <div className="text-xs text-purple-200">
            {occupiedCount} / {seats.length} online
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 items-center">
          {/* Mobile Chat Toggle */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="lg:hidden relative px-2 sm:px-3 py-1 bg-purple-700 hover:bg-purple-600 rounded text-xs sm:text-sm transition-colors"
          >
            💬
            {!showChat && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {mySeatId !== null ? (
            <>
              <div className="hidden sm:flex px-2 sm:px-3 py-1 rounded bg-green-600/30 text-xs items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="hidden sm:inline">Seat {mySeatId}</span>
              </div>
              <button
                onClick={leaveSeat}
                className="rounded bg-red-600 hover:bg-red-700 px-2 sm:px-3 py-1 text-xs sm:text-sm transition-colors"
              >
                Leave
              </button>
            </>
          ) : (
            <button
              onClick={joinSeat}
              disabled={isJoining || connectionStatus !== "connected"}
              className="rounded bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-2 sm:px-4 py-1 text-xs sm:text-sm transition-colors"
            >
              {isJoining ? "Joining..." : "Join"}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Seats Section */}
        <div className={`${showChat ? 'hidden lg:flex' : 'flex'} flex-1 overflow-y-auto p-3 sm:p-6`}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-x-4 sm:gap-y-8 max-w-2xl mx-auto w-full">
            {seats.map((seat) => {
              const isMe = seat.user?.id === userId;
              const isOccupied = seat.user !== null;
              
              return (
                <div key={seat.id} className="flex flex-col items-center">
                  <div 
                    onClick={() => mySeatId !== null && !isMe && !isOccupied && changeSeat(seat.id)}
                    className={`
                    h-14 w-14 sm:h-20 sm:w-20 rounded-full flex items-center justify-center text-xs sm:text-sm
                    transition-all duration-300 relative overflow-hidden
                    ${isMe ? "bg-gradient-to-br from-green-500 to-emerald-600 ring-2 sm:ring-4 ring-green-300/50" :
                      isOccupied ? "bg-gradient-to-br from-pink-500 to-purple-600" :
                      mySeatId !== null ? "bg-white/10 hover:bg-white/30 cursor-pointer border border-dashed sm:border-2 border-white/30 hover:scale-105" :
                      "bg-white/10 border border-dashed sm:border-2 border-white/30"
                    }
                  `}>
                    {isOccupied ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {seat.user.avatar ? (
                          <img 
                            src={seat.user.avatar} 
                            alt={seat.user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center px-1 sm:px-2">
                            <div className="font-semibold text-[10px] sm:text-xs leading-tight break-words">
                              {seat.user.name}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xl sm:text-3xl text-white/50">＋</span>
                    )}
                    {isMe && (
                      <div className="absolute bottom-0 left-0 right-0 bg-green-600/90 text-[8px] sm:text-[10px] py-0.5 text-center font-semibold">
                        YOU
                      </div>
                    )}
                  </div>
                  <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs ${isMe ? "text-green-300 font-semibold" : "opacity-70"}`}>
                    {isOccupied && seat.user.avatar ? seat.user.name : `Seat ${seat.id}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Section - Desktop */}
        <div className="hidden lg:flex w-96 bg-black/30 backdrop-blur-sm flex-col border-l border-white/10">
          <ChatContent 
            messages={messages}
            messageInput={messageInput}
            setMessageInput={handleInputChange}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            mySeatId={mySeatId}
            userId={userId}
            sendMessage={sendMessage}
            sendEmoji={sendEmoji}
            handleKeyPress={handleKeyPress}
            messagesEndRef={messagesEndRef}
            chatContainerRef={chatContainerRef}
            typingUsers={typingUsers}
            handleImageSelect={handleImageSelect}
            imageInputRef={imageInputRef}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>

        {/* Chat Section - Mobile Overlay */}
        {showChat && (
          <div className="lg:hidden absolute inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 bg-black/40 border-b border-white/10">
              <div className="font-semibold">Live Chat</div>
              <button
                onClick={() => setShowChat(false)}
                className="text-2xl hover:text-pink-400 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              <ChatContent 
                messages={messages}
                messageInput={messageInput}
                setMessageInput={handleInputChange}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                mySeatId={mySeatId}
                userId={userId}
                sendMessage={sendMessage}
                sendEmoji={sendEmoji}
                handleKeyPress={handleKeyPress}
                messagesEndRef={messagesEndRef}
                chatContainerRef={chatContainerRef}
                typingUsers={typingUsers}
                handleImageSelect={handleImageSelect}
                imageInputRef={imageInputRef}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
          </div>
        )}
      </div>

      {/* Floating Emojis */}
      {floatingEmojis.map(item => (
        <div
          key={item.id}
          className="fixed bottom-0 text-3xl sm:text-5xl pointer-events-none z-40"
          style={{
            left: `${item.x}%`,
            animation: 'float-up 3s ease-out forwards'
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Mobile Bottom Indicator */}
      {mySeatId !== null && (
        <div className="lg:hidden px-3 py-2 bg-black/40 text-center text-xs text-green-300 flex-shrink-0">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            You're in Seat {mySeatId}
          </span>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-40vh) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function ChatContent({ 
  messages, 
  messageInput, 
  setMessageInput, 
  showEmojiPicker, 
  setShowEmojiPicker,
  mySeatId,
  userId,
  sendMessage,
  sendEmoji,
  handleKeyPress,
  messagesEndRef,
  chatContainerRef,
  typingUsers,
  handleImageSelect,
  imageInputRef,
  selectedImage,
  setSelectedImage
}: {
  messages: Message[];
  messageInput: string;
  setMessageInput: (val: string) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (val: boolean) => void;
  mySeatId: number | null;
  userId: string;
  sendMessage: () => void;
  sendEmoji: (emoji: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  typingUsers: string[];
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageInputRef: React.RefObject<HTMLInputElement>;
  selectedImage: string | null;
  setSelectedImage: (val: string | null) => void;
}) {
  return (
    <>
      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 min-h-0"
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === "system" ? (
              <div className="text-center text-xs text-purple-300 py-1">
                {msg.content}
              </div>
            ) : msg.type === "emoji" ? (
              <div className="text-center py-1">
                <span className="inline-block text-xs text-purple-300 mr-2">
                  {msg.userName}
                </span>
                <span className="text-2xl sm:text-3xl">{msg.content}</span>
              </div>
            ) : msg.type === "image" ? (
              <div className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] ${msg.userId === userId ? "bg-pink-600" : "bg-purple-700"} rounded-lg px-2 sm:px-3 py-1.5 sm:py-2`}>
                  <div className="text-[10px] sm:text-xs opacity-75 mb-1">{msg.userName}</div>
                  <div 
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(msg.imageUrl || null)}
                  >
                    <img 
                      src={msg.imageUrl} 
                      alt={msg.content}
                      className="rounded max-w-full h-auto max-h-64 object-cover"
                    />
                  </div>
                  <div className="text-[10px] opacity-60 mt-1">{msg.content}</div>
                </div>
              </div>
            ) : (
              <div className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] ${msg.userId === userId ? "bg-pink-600" : "bg-purple-700"} rounded-lg px-2 sm:px-3 py-1.5 sm:py-2`}>
                  <div className="text-[10px] sm:text-xs opacity-75 mb-0.5 sm:mb-1">{msg.userName}</div>
                  <div className="text-xs sm:text-sm break-words">{msg.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-purple-300 italic px-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
            </div>
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...`
                : typingUsers.length === 2
                ? `${typingUsers[0]} and ${typingUsers[1]} are typing...`
                : `${typingUsers.length} people are typing...`
              }
            </span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-black/20 border-t border-white/10 flex-shrink-0">
        <div className="space-y-2">
          {/* Emoji Picker */}
          {showEmojiPicker && mySeatId !== null && (
            <div className="bg-purple-800 rounded-lg p-2 flex flex-wrap gap-2 justify-center">
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => sendEmoji(emoji)}
                  className="text-xl sm:text-2xl hover:scale-125 transition-transform active:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Message Input */}
          <div className="flex gap-1 sm:gap-2">
            {/* Hidden file input */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            {/* Image Upload Button */}
            <button
              onClick={() => mySeatId !== null && imageInputRef.current?.click()}
              disabled={mySeatId === null}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-lg sm:text-xl flex-shrink-0"
              title={mySeatId === null ? "Join a seat to share images" : "Upload image"}
            >
              🖼️
            </button>
            
            <button
              onClick={() => mySeatId !== null && setShowEmojiPicker(!showEmojiPicker)}
              disabled={mySeatId === null}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-lg sm:text-xl flex-shrink-0"
              title={mySeatId === null ? "Join a seat to use emojis" : "Emojis"}
            >
              😊
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={mySeatId === null ? "Join a seat to chat..." : "Type your message..."}
              disabled={mySeatId === null}
              className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm min-w-0 placeholder:text-white/40"
            />
            {messageInput.trim() ? (
              <button
                onClick={sendMessage}
                disabled={mySeatId === null}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-xs sm:text-sm font-semibold flex-shrink-0"
                title={mySeatId === null ? "Join a seat to send messages" : "Send message"}
              >
                Send ➤
              </button>
            ) : (
              <button
                disabled={mySeatId === null}
                className="px-2 sm:px-3 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-lg sm:text-xl flex-shrink-0"
                title={mySeatId === null ? "Join a seat to send voice" : "Voice message (coming soon)"}
                onClick={() => mySeatId !== null && alert('🎤 Voice message feature coming soon!')}
              >
                🎤
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-pink-400 transition-colors"
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Full size preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}