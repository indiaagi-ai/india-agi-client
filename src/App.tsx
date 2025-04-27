import { ThemeProvider } from "@/components/theme-provider";
import { SearchPage } from "@/pages/search";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Header from "@/components/header";

interface ServerToClientEvents {
  onlineCount: (data: OnlineCount) => void;
  reply: (message: string) => void;
}

export interface OnlineCount {
  count: number;
}

function App() {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents> | null>(
    null
  );
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_BASE_URL);

    // Set up event handlers
    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socketInstance.on("onlineCount", (data: OnlineCount) => {
      console.log("Received online count:", data.count);
      setOnlineCount(data.count);
    });

    // Set the socket instance to state
    setSocket(socketInstance);

    // Clean up on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(`socket: ${socket?.id}`);
  }, [socket]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="w-full h-screen items-center flex flex-col p-5 overflow-y-scroll bg-[#faf9f5] gap-5">
        <Header count={onlineCount} />
        <SearchPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
