import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AppRoutes } from "@/routes/AppRoutes";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/features/admin/auth/components/Providers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <AuthProvider>
            <AppRoutes />
            <Toaster position="top-right" richColors expand visibleToasts={5} />
        </AuthProvider> 
      </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
