import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TournamentCard from "@/components/tournament/TournamentCard";
import { Plus, Trophy, Edit, Trash2, Settings, Users, Calendar } from "lucide-react";

const MyTournaments = () => {
  const [activeTab, setActiveTab] = useState("hosted");

  const hostedTournaments = [
    {
      id: "1",
      name: "My Football Championship",
      sport: "Football",
      location: "Local Stadium",
      startDate: "2024-03-20",
      endDate: "2024-03-25",
      maxTeams: 16,
      currentTeams: 14,
      status: "upcoming" as const,
      isPublic: true,
      host: "You",
      description: "My first tournament hosting experience with local football teams."
    },
    {
      id: "2",
      name: "Basketball Quick Match",
      sport: "Basketball",
      location: "Community Center",
      startDate: "2024-03-15",
      maxTeams: 8,
      currentTeams: 8,
      status: "ongoing" as const,
      isPublic: false,
      host: "You",
      description: "Private tournament for invited teams only."
    }
  ];

  const participatingTournaments = [
    {
      id: "3",
      name: "City Tennis Championship",
      sport: "Tennis",
      location: "Tennis Club Center",
      startDate: "2024-03-18",
      endDate: "2024-03-22",
      maxTeams: 32,
      currentTeams: 28,
      status: "upcoming" as const,
      isPublic: true,
      host: "City Sports Club",
      description: "Annual city-wide tennis championship."
    }
  ];

  const TournamentManagementCard = ({ tournament }: { tournament: any }) => (
    <div className="tournament-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">{tournament.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {tournament.sport} • {tournament.location}
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={`${
            tournament.status === "upcoming" 
              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
              : tournament.status === "ongoing"
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
          } font-medium`}
        >
          {tournament.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <Users className="h-5 w-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold text-primary">{tournament.currentTeams}</div>
          <div className="text-xs text-muted-foreground">Teams Joined</div>
        </div>
        <div className="text-center p-3 bg-secondary/50 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <div className="text-sm font-bold text-blue-500">{tournament.startDate}</div>
          <div className="text-xs text-muted-foreground">Start Date</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="btn-glow flex-1">
          <Settings className="h-4 w-4 mr-2" />
          Manage
        </Button>
        <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="border-destructive/20 hover:border-destructive text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Tournaments</h1>
          <p className="text-muted-foreground">Manage your hosted tournaments and track your participation</p>
        </div>
        <Button className="btn-glow">
          <Plus className="h-4 w-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="tournament-card p-4 text-center">
          <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">{hostedTournaments.length}</div>
          <div className="text-sm text-muted-foreground">Tournaments Hosted</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-500">{participatingTournaments.length}</div>
          <div className="text-sm text-muted-foreground">Participating In</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-500">
            {hostedTournaments.filter(t => t.status === "ongoing").length}
          </div>
          <div className="text-sm text-muted-foreground">Active Tournaments</div>
        </div>
      </div>

      {/* Tournaments Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-card/50 border border-border">
          <TabsTrigger value="hosted" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Hosted by Me ({hostedTournaments.length})
          </TabsTrigger>
          <TabsTrigger value="participating" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Participating ({participatingTournaments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hosted">
          {hostedTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostedTournaments.map((tournament) => (
                <TournamentManagementCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No hosted tournaments</h3>
              <p className="text-muted-foreground mb-4">Start hosting your first tournament and bring teams together!</p>
              <Button className="btn-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Tournament
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="participating">
          {participatingTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {participatingTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">Not participating in any tournaments</h3>
              <p className="text-muted-foreground mb-4">Join tournaments to compete with other teams!</p>
              <Button className="btn-glow">
                <Trophy className="h-4 w-4 mr-2" />
                Browse Tournaments
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTournaments;