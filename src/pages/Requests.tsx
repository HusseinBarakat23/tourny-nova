import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Trophy, Users, Check, X, Clock, Star } from "lucide-react";

const Requests = () => {
  const [teamRequests, setTeamRequests] = useState([
    {
      id: "1",
      type: "join_team",
      playerName: "Alex Johnson",
      teamName: "Thunder Wolves",
      message: "I'm a experienced midfielder looking to join your football team. I've played in several local tournaments.",
      sport: "Football",
      experience: "3 years",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: "2",
      type: "join_team",
      playerName: "Sarah Martinez",
      teamName: "Lightning Strikers",
      message: "Basketball point guard with team captain experience. Would love to contribute to your team.",
      sport: "Basketball",
      experience: "5 years",
      time: "1 day ago",
      status: "pending"
    }
  ]);

  const [tournamentRequests, setTournamentRequests] = useState([
    {
      id: "1",
      type: "join_tournament",
      teamName: "Fire Eagles",
      tournamentName: "Summer Football Championship",
      captain: "Mike Wilson",
      teamSize: 16,
      message: "Our team would like to participate in your tournament. We have experience in regional competitions.",
      time: "3 hours ago",
      status: "pending"
    },
    {
      id: "2",
      type: "create_tournament",
      tournamentName: "City Basketball League",
      requester: "Sports Club Downtown",
      sport: "Basketball",
      expectedTeams: 12,
      message: "Request to create a city-wide basketball tournament with professional referees and prizes.",
      time: "1 day ago",
      status: "under_review"
    }
  ]);

  const [sentRequests, setSentRequests] = useState([
    {
      id: "1",
      type: "join_tournament",
      tournamentName: "Elite Tennis Masters",
      teamName: "Your Team",
      time: "2 days ago",
      status: "pending"
    },
    {
      id: "2",
      type: "team_invitation",
      playerName: "John Smith",
      teamName: "Thunder Wolves",
      time: "3 days ago",
      status: "accepted"
    }
  ]);

  const handleTeamRequest = (requestId: string, action: "accept" | "reject") => {
    setTeamRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
          : req
      )
    );
  };

  const handleTournamentRequest = (requestId: string, action: "accept" | "reject") => {
    setTournamentRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
          : req
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "accepted": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "under_review": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "accepted": return <Check className="h-4 w-4" />;
      case "rejected": return <X className="h-4 w-4" />;
      case "under_review": return <Star className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const TeamRequestCard = ({ request }: { request: any }) => (
    <div className="tournament-card p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/20 text-primary">
            {request.playerName.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{request.playerName}</h3>
              <p className="text-sm text-muted-foreground">
                Wants to join <span className="text-primary font-medium">{request.teamName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStatusColor(request.status)}>
                {getStatusIcon(request.status)}
                <span className="ml-1">{request.status}</span>
              </Badge>
              <span className="text-xs text-muted-foreground">{request.time}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-primary" />
              {request.sport}
            </span>
            <span>Experience: {request.experience}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{request.message}</p>
          
          {request.status === "pending" && (
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className="btn-glow"
                onClick={() => handleTeamRequest(request.id, "accept")}
              >
                <Check className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-destructive/20 hover:border-destructive text-destructive"
                onClick={() => handleTeamRequest(request.id, "reject")}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TournamentRequestCard = ({ request }: { request: any }) => (
    <div className="tournament-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Trophy className="h-8 w-8 text-primary mt-1" />
          <div>
            <h3 className="font-semibold text-lg">{request.tournamentName}</h3>
            <p className="text-sm text-muted-foreground">
              {request.type === "join_tournament" 
                ? `${request.teamName} (Captain: ${request.captain})`
                : `Requested by ${request.requester}`
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(request.status)}>
            {getStatusIcon(request.status)}
            <span className="ml-1">{request.status.replace('_', ' ')}</span>
          </Badge>
          <span className="text-xs text-muted-foreground">{request.time}</span>
        </div>
      </div>
      
      {request.sport && (
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <span>Sport: {request.sport}</span>
          {request.teamSize && <span>Team Size: {request.teamSize}</span>}
          {request.expectedTeams && <span>Expected Teams: {request.expectedTeams}</span>}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground mb-4">{request.message}</p>
      
      {request.status === "pending" && (
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            className="btn-glow"
            onClick={() => handleTournamentRequest(request.id, "accept")}
          >
            <Check className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-destructive/20 hover:border-destructive text-destructive"
            onClick={() => handleTournamentRequest(request.id, "reject")}
          >
            <X className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );

  const SentRequestCard = ({ request }: { request: any }) => (
    <div className="tournament-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            {request.type === "join_tournament" 
              ? `Join ${request.tournamentName}`
              : `Invite ${request.playerName} to ${request.teamName}`
            }
          </h3>
          <p className="text-sm text-muted-foreground">{request.time}</p>
        </div>
        <Badge variant="outline" className={getStatusColor(request.status)}>
          {getStatusIcon(request.status)}
          <span className="ml-1">{request.status}</span>
        </Badge>
      </div>
    </div>
  );

  const pendingTeamRequests = teamRequests.filter(r => r.status === "pending").length;
  const pendingTournamentRequests = tournamentRequests.filter(r => r.status === "pending").length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <UserPlus className="h-8 w-8 text-primary animate-pulse-glow" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Requests</h1>
            <p className="text-muted-foreground">Manage team and tournament requests</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(pendingTeamRequests + pendingTournamentRequests) > 0 && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {pendingTeamRequests + pendingTournamentRequests} pending
            </Badge>
          )}
        </div>
      </div>

      {/* Requests Tabs */}
      <Tabs defaultValue="team-requests" className="space-y-6">
        <TabsList className="bg-card/50 border border-border">
          <TabsTrigger value="team-requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Team Requests ({teamRequests.length})
          </TabsTrigger>
          <TabsTrigger value="tournament-requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Tournament Requests ({tournamentRequests.length})
          </TabsTrigger>
          <TabsTrigger value="sent-requests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Sent Requests ({sentRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team-requests">
          {teamRequests.length > 0 ? (
            <div className="space-y-4">
              {teamRequests.map((request) => (
                <TeamRequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 tournament-card">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No team requests</h3>
              <p className="text-muted-foreground">Team join requests will appear here when players want to join your teams.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tournament-requests">
          {tournamentRequests.length > 0 ? (
            <div className="space-y-4">
              {tournamentRequests.map((request) => (
                <TournamentRequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 tournament-card">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No tournament requests</h3>
              <p className="text-muted-foreground">Tournament participation and creation requests will appear here.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent-requests">
          {sentRequests.length > 0 ? (
            <div className="space-y-4">
              {sentRequests.map((request) => (
                <SentRequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 tournament-card">
              <UserPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No sent requests</h3>
              <p className="text-muted-foreground">Requests you send will appear here with their status updates.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;