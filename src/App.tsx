import { ThemeProvider } from "@/components/theme-provider";
import { SearchPage } from "@/pages/search";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="w-full h-screen justify-center flex items-start p-5">
        <SearchPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
