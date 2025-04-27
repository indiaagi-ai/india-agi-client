import { OnlineCount } from "@/App";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const header = ({ count }: OnlineCount) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-2 px-3 py-1.5 bg-background border-muted-foreground/20 hover:bg-background"
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
  );
};

export default header;
