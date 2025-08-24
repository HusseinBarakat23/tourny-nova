import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TournamentCard from "@/components/tournament/TournamentCard";
import { Star, Bell, BellOff, Trophy, Calendar, Filter } from "lucide-react";

const SubscribedTournaments = () => {
  const [subscribedTournaments] = useState([
    {
      id: "1",
      name: "City Tennis Championship",
      sport: "Tennis",
      location: "Tennis Club Center, Miami",
      startDate: "2024-03-18",
      endDate: "2024-03-22",
      maxTeams: 32,
      currentTeams: 28,
      status: "upcoming" as const,
      isPublic: true,
      host: "City Sports Club",
      description: "Annual city-wide tennis championship featuring professional courts and experienced referees.",
      subscriptionDate: "2024-02-15",
      notificationsEnabled: true
    },
    {
      id: "2",
      name: "Regional Basketball League",
      sport: "Basketball",
      location: "Sports Complex, Los Angeles",
      startDate: "2024-03-12",
      maxTeams: 16,
      currentTeams: 16,
      status: "ongoing" as const,
      isPublic: true,
      host: "LA Basketball Association",
      description: "Competitive basketball league with teams from across the region.",
      subscriptionDate: "2024-02-20",
      notificationsEnabled: true
    },
    {
      id: "3",
      name: "Summer Football Series",
      sport: "Football",
      location: "Central Stadium, Chicago",
      startDate: "2024-04-01",
      endDate: "2024-04-15",
      maxTeams: 24,
      currentTeams: 18,
      status: "upcoming" as const,
      isPublic: true,
      host: "Chicago Football Federation",
      description: "Summer series featuring amateur and semi-professional teams.",
      subscriptionDate: "2024-02-28",
      notificationsEnabled: false
    },
    {
      id: "4",
      name: "Elite Volleyball Tournament",
      sport: "Volleyball",
      location: "Beach Courts, San Diego",
      startDate: "2024-02-28",
      endDate: "2024-03-02",
      maxTeams: 20,
      currentTeams: 20,
      status: "completed" as const,
      isPublic: true,
      host: "San Diego Volleyball Club",
      description: "Annual beach volleyball tournament with professional players.",
      subscriptionDate: "2024-02-10",
      notificationsEnabled: true
    }
  ]);

  const [filter, setFilter] = useState("all");

  const filteredTournaments = subscribedTournaments.filter(tournament => {
    if (filter === "all") return true;
    return tournament.status === filter;
  });

  const toggleNotifications = (tournamentId: string) => {
    // In a real app, this would update the subscription settings
    console.log(`Toggle notifications for tournament ${tournamentId}`);
  };

  const unsubscribe = (tournamentId: string) => {
    // In a real app, this would remove the subscription
    console.log(`Unsubscribe from tournament ${tournamentId}`);
  };

  const stats = {
    total: subscribedTournaments.length,
    upcoming: subscribedTournaments.filter(t => t.status === "upcoming").length,
    ongoing: subscribedTournaments.filter(t => t.status === "ongoing").length,
    completed: subscribedTournaments.filter(t => t.status === "completed").length
  };

  const EnhancedTournamentCard = ({ tournament }: { tournament: any }) => (
    <div className="tournament-card p-6 hover:scale-[1.02] group relative">
      {/* Subscription indicator */}
      <div className="absolute top-4 right-4">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
      </div>

      {/* Tournament info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {tournament.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          Hosted by <span className="text-primary font-medium">{tournament.host}</span>
        </p>
        <Badge 
          variant="outline" 
          className={`${
            tournament.status === "upcoming" 
              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
              : tournament.status === "ongoing"
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
          } font-medium mb-3`}
        >
          {tournament.status}
        </Badge>
      </div>

      {/* Tournament details */}
      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" />
          <span className="font-medium text-primary">{tournament.sport}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{tournament.startDate}{tournament.endDate && ` - ${tournament.endDate}`}</span>
        </div>
        <div className="text-xs text-muted-foreground/60">
          Subscribed on {tournament.subscriptionDate}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {tournament.description}
      </p>

      {/* Subscription controls */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 border-primary/20 hover:border-primary"
        >
          View Tournament
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleNotifications(tournament.id)}
          className={`${
            tournament.notificationsEnabled 
              ? "text-primary hover:bg-primary/10" 
              : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          {tournament.notificationsEnabled ? (
            <Bell className="h-4 w-4" />
          ) : (
            <BellOff className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => unsubscribe(tournament.id)}
          className="text-destructive hover:bg-destructive/10"
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Star className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Subscribed Tournaments</h1>
            <p className="text-muted-foreground">Stay updated with your favorite tournaments</p>
          </div>
        </div>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          {stats.total} subscriptions
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="tournament-card p-4 text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-500">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Subscriptions</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-500">{stats.upcoming}</div>
          <div className="text-sm text-muted-foreground">Upcoming</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-500">{stats.ongoing}</div>
          <div className="text-sm text-muted-foreground">Live Now</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Badge className="h-8 w-8 bg-gray-500/20 text-gray-400 mx-auto mb-2 flex items-center justify-center">
            ✓
          </Badge>
          <div className="text-2xl font-bold text-gray-400">{stats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tournament-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filter Tournaments</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All Tournaments", count: stats.total },
            { key: "upcoming", label: "Upcoming", count: stats.upcoming },
            { key: "ongoing", label: "Live Now", count: stats.ongoing },
            { key: "completed", label: "Completed", count: stats.completed }
          ].map((filterOption) => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption.key)}
              className={filter === filterOption.key ? "btn-glow" : "border-primary/20 hover:border-primary"}
            >
              {filterOption.label} ({filterOption.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Subscribed Tournaments */}
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <EnhancedTournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            {filter === "all" 
              ? "No subscribed tournaments" 
              : `No ${filter} tournaments`
            }
          </h3>
          <p className="text-muted-foreground mb-4">
            {filter === "all"
              ? "Subscribe to tournaments to get updates and follow their progress."
              : `You don't have any ${filter} tournament subscriptions.`
            }
          </p>
          <Button className="btn-glow">
            <Trophy className="h-4 w-4 mr-2" />
            Browse Tournaments
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubscribedTournaments;