import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Home, 
  Users, 
  Star, 
  Bell, 
  UserPlus, 
  Settings,
  Menu,
  X
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/my-tournaments", label: "My Tournaments", icon: Trophy },
    { path: "/my-teams", label: "My Teams", icon: Users },
    { path: "/subscribed", label: "Subscribed", icon: Star },
    { path: "/notifications", label: "Notifications", icon: Bell },
    { path: "/requests", label: "Requests", icon: UserPlus },
    { path: "/profile", label: "Profile", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Trophy className="h-8 w-8 text-primary group-hover:animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-all duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Tourny
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
              Login
            </Button>
            <Button className="btn-glow" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-primary/20">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="flex flex-col space-y-2 pt-4 border-t border-primary/20">
              <Button variant="outline" className="w-full border-primary/20 hover:border-primary">
                Login
              </Button>
              <Button className="btn-glow w-full">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;