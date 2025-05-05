import { ThemeProvider } from "@/components/theme-provider";
import { SearchPage } from "@/pages/search";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { HeroSectionOne } from "@/pages/home";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    // Get or generate visitor ID
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem("visitor_id", visitorId);
    }

    const socketInstance = io(import.meta.env.VITE_API_BASE_URL);

    // Set up event handlers
    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
      socketInstance.emit("registerVisitor", {
        visitorId,
      });
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
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header count={onlineCount} />
                  <HeroSectionOne />
                </>
              }
            />
            <Route
              path="/trynow"
              element={
                <>
                  <Header count={onlineCount} />
                  <SearchPage />
                </>
              }
            />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
