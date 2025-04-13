import { ThemeProvider } from "@/components/theme-provider";
import { SearchPage } from "@/pages/search";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen justify-center flex items-start pt-10">
        <SearchPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
