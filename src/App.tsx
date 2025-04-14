import { ThemeProvider } from "@/components/theme-provider";
import { SearchPage } from "@/pages/search";
import { Particles } from "@/components/magicui/particles";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen justify-center flex items-start p-5">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />
        <SearchPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
