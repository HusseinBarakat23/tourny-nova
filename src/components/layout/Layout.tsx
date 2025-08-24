import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="page-enter page-enter-active">
        {children}
      </main>
    </div>
  );
};

export default Layout;