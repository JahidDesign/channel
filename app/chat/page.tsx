"use client";
import { useEffect, useRef, useState } from "react";


const socket = {
  emit: (event: string, data: any) => {
    console.log("Socket emit:", event, data);
  },
  on: (event: string, callback: (data: any) => void) => {
    console.log("Socket on:", event);
  },
  off: (event: string) => {
    console.log("Socket off:", event);
  }
};

type Msg = any;

// SVG Icons
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);

const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 15.2c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8zm0-6.3c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" />
    <path d="M20 5h-3.2L15 3H9L7.2 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h4.05l1.83-2h4.24l1.83 2H20v12z" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm8-10H7v2h7v-2zm-7 4h10v2H7v-2z" />
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const VideoCallIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 15" className="w-4 h-4 inline" fill="currentColor">
    <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
  </svg>
);

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      _id: "1",
      chatId: "group1",
      senderId: "u2",
      senderName: "John",
      type: "text",
      text: "Hey! How are you?",
      timestamp: new Date(Date.now() - 3600000),
      seenBy: ["u1"],
    },
    {
      _id: "2",
      chatId: "group1",
      senderId: "u1",
      senderName: "Ali",
      type: "text",
      text: "I'm good! Thanks for asking 😊",
      timestamp: new Date(Date.now() - 3000000),
      seenBy: ["u2"],
    },
    {
      _id: "3",
      chatId: "group1",
      senderId: "u2",
      senderName: "John",
      type: "text",
      text: "Want to grab coffee later?",
      timestamp: new Date(Date.now() - 1800000),
      seenBy: [],
    },
  ]);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ type: string; url: string; name?: string } | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video" | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const userId = "u1";
  const chatId = "group1";
  const recorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  // Socket connection
  useEffect(() => {
    // Join chat room
    socket.emit("join-chat", chatId);

    // Listen for incoming messages
    socket.on("receive-message", (json: string) => {
      const message = JSON.parse(json);
      setMsgs((prev) => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receive-message");
    };
  }, [chatId]);

  const send = (data: any) => {
    // Emit to socket
    socket.emit("send-message", JSON.stringify(data));
    
    // Add to local state for immediate feedback
    setMsgs((p) => [...p, { ...data, _id: Date.now().toString(), timestamp: new Date() }]);
  };

  const sendText = () => {
    if (!text.trim()) return;
    send({
      chatId,
      senderId: userId,
      senderName: "Ali",
      type: "text",
      text,
      seenBy: [],
    });
    setText("");
  };

  const startRec = async () => {
    try {
      setIsRecording(true);
      setRecordingDuration(0);
      audioChunks.current = [];
      
      // Start duration timer
      const startTime = Date.now();
      const durationInterval = setInterval(() => {
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder.current = new MediaRecorder(stream);
      
      // Collect audio chunks
      recorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };
      
      // When recording stops, send the audio
      recorder.current.onstop = async () => {
        clearInterval(durationInterval);
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        
        // Convert blob to base64 for socket transmission
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          
          // Send via socket
          send({
            chatId,
            senderId: userId,
            senderName: "Ali",
            type: "audio",
            audioData: base64Audio,
            duration: recordingDuration,
            seenBy: [],
          });
        };
        reader.readAsDataURL(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setRecordingDuration(0);
      };
      
      recorder.current.start();
    } catch (error) {
      console.error("Microphone access denied:", error);
      setIsRecording(false);
    }
  };

  const stopRec = () => {
    if (recorder.current && recorder.current.state === "recording") {
      recorder.current.stop();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewFile({ type, url, name: file.name });
    setShowAttachMenu(false);
  };

  const sendFile = () => {
    if (!previewFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      
      send({
        chatId,
        senderId: userId,
        senderName: "Ali",
        type: previewFile.type,
        mediaUrl: base64Data,
        fileName: previewFile.name,
        seenBy: [],
      });
      
      setPreviewFile(null);
    };

    fetch(previewFile.url)
      .then(res => res.blob())
      .then(blob => reader.readAsDataURL(blob));
  };

  const cancelPreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
      setPreviewFile(null);
    }
  };

  const initiateCall = (type: "voice" | "video") => {
    setCallType(type);
    setShowCallModal(true);
    
    // Emit call signal to socket
    socket.emit("initiate-call", JSON.stringify({
      chatId,
      callerId: userId,
      callerName: "Ali",
      type,
    }));
  };

  const acceptCall = () => {
    setIsInCall(true);
    // In real implementation, initialize WebRTC connection here
    socket.emit("accept-call", JSON.stringify({ chatId, userId }));
  };

  const endCall = () => {
    setShowCallModal(false);
    setIsInCall(false);
    setCallType(null);
    socket.emit("end-call", JSON.stringify({ chatId, userId }));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#202c33] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              J
            </div>
            <div>
              <h3 className="font-semibold text-base">John Doe</h3>
              <p className="text-xs text-black">online</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => initiateCall("voice")}
              className="hover:bg-[#2a3942] p-2 rounded-full transition-colors"
            >
              <PhoneIcon />
            </button>
            <button 
              onClick={() => initiateCall("video")}
              className="hover:bg-[#2a3942] p-2 rounded-full transition-colors"
            >
              <VideoCallIcon />
            </button>
            <button className="hover:bg-[#2a3942] p-2 rounded-full transition-colors">
              <SearchIcon />
            </button>
            <button className="hover:bg-[#2a3942] p-2 rounded-full transition-colors">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: "#0a1014"
        }}
      >
        {msgs.map((m) => {
          const isMe = m.senderId === userId;
          return (
            <div
              key={m._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
            >
              <div
                className={`max-w-[75%] sm:max-w-[65%] rounded-lg px-3 py-2 shadow-md ${
                  isMe
                    ? "bg-[#005c4b] text-white rounded-br-none"
                    : "bg-[#202c33] text-white rounded-bl-none"
                }`}
              >
                {!isMe && (
                  <p className="text-xs font-semibold text-teal-400 mb-1">
                    {m.senderName}
                  </p>
                )}
                
                {m.type === "text" && (
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {m.text}
                  </p>
                )}
                
                {m.type === "audio" && (m.mediaUrl || m.audioData) && (
                  <audio 
                    controls 
                    src={m.mediaUrl || m.audioData} 
                    className="w-full max-w-xs mt-1"
                    style={{ height: "32px" }}
                  />
                )}

                {m.type === "image" && m.mediaUrl && (
                  <img 
                    src={m.mediaUrl} 
                    alt="Shared image" 
                    className="max-w-full rounded-lg mt-1"
                    style={{ maxHeight: "300px" }}
                  />
                )}

                {m.type === "camera" && m.mediaUrl && (
                  <img 
                    src={m.mediaUrl} 
                    alt="Camera photo" 
                    className="max-w-full rounded-lg mt-1"
                    style={{ maxHeight: "300px" }}
                  />
                )}

                {m.type === "document" && m.mediaUrl && (
                  <div className="flex items-center gap-2 bg-[#162229] p-3 rounded-lg mt-1">
                    <DocumentIcon />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{m.fileName || "Document"}</p>
                      <p className="text-xs text-gray-400">File</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-300">
                    {formatTime(m.timestamp)}
                  </span>
                  {isMe && (
                    <span className={m.seenBy?.length ? "text-blue-400" : "text-gray-400"}>
                      <CheckIcon />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#202c33] px-3 py-2 border-t border-[#2a3942]">
        {/* Call Modal */}
        {showCallModal && (
          <div className="fixed inset-0 bg-gradient-to-b from-[#005c4b] to-[#003d33] z-50 flex flex-col items-center justify-between p-8">
            {/* Caller Info */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-5xl shadow-2xl mb-6 animate-pulse">
                J
              </div>
              <h2 className="text-white text-3xl font-semibold mb-2">John Doe</h2>
              <p className="text-teal-200 text-lg">
                {isInCall ? "Connected" : callType === "video" ? "Video calling..." : "Voice calling..."}
              </p>
              {isInCall && (
                <p className="text-teal-300 text-sm mt-2">{formatDuration(recordingDuration)}</p>
              )}
            </div>

            {/* Call Controls */}
            <div className="flex gap-6 mb-8">
              {!isInCall && (
                <button
                  onClick={acceptCall}
                  className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                >
                  <PhoneIcon />
                </button>
              )}
              
              {callType === "video" && isInCall && (
                <>
                  <button className="w-16 h-16 bg-[#2a3942] hover:bg-[#3a4952] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z" />
                    </svg>
                  </button>
                  <button className="w-16 h-16 bg-[#2a3942] hover:bg-[#3a4952] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <MicIcon />
                  </button>
                </>
              )}
              
              <button
                onClick={endCall}
                className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 rotate-135">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* File Preview Modal */}
        {previewFile && (
          <div className="absolute inset-0 bg-black/90 z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#202c33]">
              <h3 className="text-white font-semibold">Preview</h3>
              <button
                onClick={cancelPreview}
                className="text-white hover:bg-[#2a3942] p-2 rounded-full"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
              {previewFile.type === "image" || previewFile.type === "camera" ? (
                <img src={previewFile.url} alt="Preview" className="max-w-full max-h-full rounded-lg" />
              ) : (
                <div className="bg-[#202c33] p-8 rounded-lg">
                  <DocumentIcon />
                  <p className="text-white mt-2">{previewFile.name}</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-[#202c33] flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a caption..."
                className="flex-1 bg-[#2a3942] text-white px-4 py-3 rounded-lg outline-none"
              />
              <button
                onClick={sendFile}
                className="bg-[#00a884] hover:bg-[#06cf9c] text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}

        {/* Attachment Menu */}
        {showAttachMenu && (
          <div className="absolute bottom-16 left-4 bg-[#233138] rounded-lg shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-4 duration-200 z-40">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#2a3942] rounded-lg text-white transition-colors"
            >
              <div className="bg-purple-600 p-2 rounded-full">
                <DocumentIcon />
              </div>
              <span className="text-sm">Document</span>
            </button>
            <button
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#2a3942] rounded-lg text-white transition-colors"
            >
              <div className="bg-pink-600 p-2 rounded-full">
                <ImageIcon />
              </div>
              <span className="text-sm">Photos & Videos</span>
            </button>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#2a3942] rounded-lg text-white transition-colors"
            >
              <div className="bg-red-600 p-2 rounded-full">
                <CameraIcon />
              </div>
              <span className="text-sm">Camera</span>
            </button>
            <button
              onClick={() => {
                setShowAttachMenu(false);
                startRec();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#2a3942] rounded-lg text-white transition-colors"
            >
              <div className="bg-green-600 p-2 rounded-full">
                <MicIcon />
              </div>
              <span className="text-sm">Audio</span>
            </button>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.zip"
          onChange={(e) => handleFileSelect(e, "document")}
          className="hidden"
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={(e) => handleFileSelect(e, "image")}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleFileSelect(e, "camera")}
          className="hidden"
        />

        <div className="flex items-end gap-2">
          {/* Emoji & Attach */}
          <div className="flex gap-1">
            <button className="text-gray-400 hover:text-white p-2 hover:bg-[#2a3942] rounded-full transition-all">
              <EmojiIcon />
            </button>
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className={`${
                showAttachMenu ? "bg-[#2a3942] text-white" : "text-gray-400 hover:text-white"
              } p-2 hover:bg-[#2a3942] rounded-full transition-all transform ${
                showAttachMenu ? "rotate-45" : ""
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" />
              </svg>
            </button>
          </div>

          {/* Text Input */}
          <div className="flex-1 bg-[#2a3942] rounded-lg overflow-hidden">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500 text-sm"
            />
          </div>

          {/* Send or Mic Button */}
          {text.trim() ? (
            <button
              onClick={sendText}
              className="bg-[#00a884] hover:bg-[#06cf9c] text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <SendIcon />
            </button>
          ) : (
            <button
              onMouseDown={startRec}
              onMouseUp={stopRec}
              onTouchStart={startRec}
              onTouchEnd={stopRec}
              className={`${
                isRecording
                  ? "bg-red-600 animate-pulse"
                  : "bg-[#00a884] hover:bg-[#06cf9c]"
              } text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg`}
            >
              <MicIcon />
            </button>
          )}
        </div>

        {isRecording && (
          <div className="flex items-center justify-center gap-3 mb-2 bg-[#162229] rounded-lg p-3 animate-in slide-in-from-bottom-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-8 bg-red-500 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-red-400 text-sm font-medium">
              {formatDuration(recordingDuration)}
            </span>
            <span className="text-gray-400 text-xs flex-1">Recording... Swipe to cancel</span>
          </div>
        )}
      </div>
    </div>
  );
}