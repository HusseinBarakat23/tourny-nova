import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TournamentBracket from "@/components/tournament/TournamentBracket";
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Users, 
  Star,
  UserPlus,
  Settings,
  Share2,
  Bell,
  Award,
  Target
} from "lucide-react";

const TournamentDetails = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const tournament = {
    id: "1",
    name: "Summer Football Championship 2024",
    sport: "Football",
    location: "Central Stadium, New York",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    maxTeams: 16,
    currentTeams: 16,
    status: "ongoing",
    isPublic: true,
    host: "Sports Club NYC",
    description: "Annual summer championship featuring the best football teams from across the region. Professional referees, live streaming, and exciting prizes await!",
    prize: "$5,000 Winner Prize",
    rules: [
      "90 minutes per match (45 min each half)",
      "Maximum 18 players per team",
      "Professional FIFA rules apply",
      "Video Assistant Referee (VAR) available",
      "Fair play points considered"
    ],
    teams: [
      { name: "Thunder Wolves", wins: 3, losses: 0 },
      { name: "Lightning Strikers", wins: 2, losses: 1 },
      { name: "Fire Eagles", wins: 2, losses: 1 },
      { name: "Storm Hawks", wins: 1, losses: 2 },
      { name: "Ice Dragons", wins: 3, losses: 0 },
      { name: "Wind Riders", wins: 2, losses: 1 },
      { name: "Earth Titans", wins: 1, losses: 2 },
      { name: "Water Sharks", wins: 0, losses: 3 }
    ]
  };

  const mockMatches = [
    {
      id: "1",
      team1: { name: "Thunder Wolves", score: 3 },
      team2: { name: "Lightning Strikers", score: 1 },
      winner: "Thunder Wolves",
      round: 1,
      position: 1
    },
    {
      id: "2",
      team1: { name: "Ice Dragons", score: 2 },
      team2: { name: "Fire Eagles", score: 1 },
      winner: "Ice Dragons",
      round: 1,
      position: 2
    },
    {
      id: "3",
      team1: { name: "Thunder Wolves", score: 2 },
      team2: { name: "Ice Dragons", score: 0 },
      winner: "Thunder Wolves",
      round: 2,
      position: 1
    }
  ];

  const upcomingMatches = [
    {
      id: "4",
      team1: "Wind Riders",
      team2: "Storm Hawks",
      date: "2024-03-16",
      time: "14:00",
      venue: "Field A"
    },
    {
      id: "5",
      team1: "Earth Titans",
      team2: "Water Sharks",
      date: "2024-03-16",
      time: "16:00",
      venue: "Field B"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tournament Header */}
      <div className="tournament-card p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-primary animate-pulse-glow" />
              <div>
                <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
                <p className="text-muted-foreground">
                  Hosted by <span className="text-primary font-medium">{tournament.host}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">{tournament.sport}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{tournament.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{tournament.startDate} - {tournament.endDate}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{tournament.description}</p>

            {tournament.prize && (
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-yellow-500 font-bold text-lg">{tournament.prize}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{tournament.currentTeams}</div>
                <div className="text-sm text-muted-foreground">Teams</div>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-500">
                  {tournament.status === "ongoing" ? "LIVE" : tournament.status.toUpperCase()}
                </div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                className="btn-glow w-full"
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="h-4 w-4 mr-2 text-yellow-500" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
              <Button variant="outline" className="border-primary/20 hover:border-primary">
                <Share2 className="h-4 w-4 mr-2" />
                Share Tournament
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Content Tabs */}
      <Tabs defaultValue="bracket" className="space-y-6">
        <TabsList className="bg-card/50 border border-border">
          <TabsTrigger value="bracket" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Tournament Bracket
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Teams ({tournament.teams.length})
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Rules & Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bracket">
          <div className="tournament-card p-6">
            <TournamentBracket matches={mockMatches} tournamentName={tournament.name} />
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tournament.teams.map((team, index) => (
              <div key={team.name} className="tournament-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold">{team.name}</h3>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Wins: <span className="text-green-500 font-medium">{team.wins}</span></span>
                  <span>Losses: <span className="text-red-500 font-medium">{team.losses}</span></span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Upcoming Matches</h3>
            {upcomingMatches.map((match) => (
              <div key={match.id} className="tournament-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-semibold">{match.team1}</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-semibold">{match.team2}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{match.date} at {match.time}</span>
                      <span>•</span>
                      <span>{match.venue}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="tournament-card p-6">
            <h3 className="text-xl font-bold mb-4">Tournament Rules</h3>
            <ul className="space-y-2 mb-6">
              {tournament.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-xs">{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Tournament Host: <span className="text-primary font-medium">{tournament.host}</span></p>
                <p>Questions? Contact the tournament organizers through the platform messaging system.</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TournamentDetails;