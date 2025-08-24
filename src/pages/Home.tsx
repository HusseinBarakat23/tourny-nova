import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TournamentCard from "@/components/tournament/TournamentCard";
import { Search, Filter, Plus, Trophy, TrendingUp, Users, Calendar } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const mockTournaments = [
    {
      id: "1",
      name: "Summer Football Championship",
      sport: "Football",
      location: "Central Stadium, New York",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      maxTeams: 16,
      currentTeams: 12,
      status: "upcoming" as const,
      isPublic: true,
      host: "Sports Club NYC",
      description: "Annual summer championship with teams from across the region. Professional referees and live streaming available.",
      prize: "$5,000 Winner Prize"
    },
    {
      id: "2",
      name: "Elite Basketball Tournament",
      sport: "Basketball",
      location: "Metro Arena, LA",
      startDate: "2024-03-10",
      maxTeams: 8,
      currentTeams: 8,
      status: "ongoing" as const,
      isPublic: true,
      host: "LA Sports Network",
      description: "High-intensity basketball matches with the best local teams.",
      prize: "$3,000 Prize Pool"
    },
    {
      id: "3",
      name: "Tennis Masters Cup",
      sport: "Tennis",
      location: "Garden Courts, Miami",
      startDate: "2024-02-28",
      endDate: "2024-03-02",
      maxTeams: 32,
      currentTeams: 32,
      status: "completed" as const,
      isPublic: true,
      host: "Miami Tennis Club",
      description: "Singles tournament featuring top regional players."
    },
    {
      id: "4",
      name: "Private Volleyball League",
      sport: "Volleyball",
      location: "Beach Courts, California",
      startDate: "2024-03-25",
      maxTeams: 12,
      currentTeams: 6,
      status: "upcoming" as const,
      isPublic: false,
      host: "Beach Sports Co.",
      description: "Invitation-only beach volleyball tournament."
    }
  ];

  const sports = ["Football", "Basketball", "Tennis", "Volleyball", "Soccer", "Baseball"];
  const statuses = ["upcoming", "ongoing", "completed"];

  const filteredTournaments = mockTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === "all" || tournament.sport === selectedSport;
    const matchesStatus = selectedStatus === "all" || tournament.status === selectedStatus;
    
    return matchesSearch && matchesSport && matchesStatus;
  });

  const stats = {
    totalTournaments: mockTournaments.length,
    activeTournaments: mockTournaments.filter(t => t.status === "ongoing").length,
    totalTeams: mockTournaments.reduce((sum, t) => sum + t.currentTeams, 0),
    upcomingTournaments: mockTournaments.filter(t => t.status === "upcoming").length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-12 w-12 text-primary animate-pulse-glow" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Tourny
          </h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create, manage, and participate in sports tournaments with professional-grade features and real-time updates.
        </p>
        <Button className="btn-glow text-lg px-8 py-3 h-auto">
          <Plus className="h-5 w-5 mr-2" />
          Create Tournament
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="tournament-card p-4 text-center">
          <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">{stats.totalTournaments}</div>
          <div className="text-sm text-muted-foreground">Total Tournaments</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-500">{stats.activeTournaments}</div>
          <div className="text-sm text-muted-foreground">Active Now</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-500">{stats.totalTeams}</div>
          <div className="text-sm text-muted-foreground">Teams Playing</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-500">{stats.upcomingTournaments}</div>
          <div className="text-sm text-muted-foreground">Upcoming</div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="tournament-card p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Find Tournaments</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border focus:border-primary"
            />
          </div>
          
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
              <SelectValue placeholder="Select Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {sports.map(sport => (
                <SelectItem key={sport} value={sport}>{sport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="bg-secondary/50 border-border focus:border-primary">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="border-primary/20 hover:border-primary">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Available Tournaments 
          <Badge variant="outline" className="ml-2 bg-primary/20 text-primary border-primary/30">
            {filteredTournaments.length}
          </Badge>
        </h2>
      </div>

      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No tournaments found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or create a new tournament.</p>
          <Button className="btn-glow mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create Tournament
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;