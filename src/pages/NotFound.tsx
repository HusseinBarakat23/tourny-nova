import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center tournament-card p-12">
        <div className="text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold mb-4">Oops! Page not found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-glow h-10 px-6 py-2"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
