import { OnlineCount } from "@/App";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useNavigate } from "react-router-dom";

const Header = ({ count }: OnlineCount) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl flex gap-5 items-end z-20">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-end">
          <div className="w-fit px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full shadow-md">
            Beta
          </div>
        </div>
        <h1
          className="text-4xl font-bold tracking-tighter md:text-5xl hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <AuroraText>IndiaAGI.ai</AuroraText>
        </h1>
      </div>
      <Badge
        variant="outline"
        className="flex items-center gap-2 px-3 py-1.5 bg-background border-muted-foreground/20 hover:bg-background mt-3 h-fit"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{count} online</span>
        </span>
      </Badge>
    </div>
  );
};

export default Header;
