import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Plus, 
  Crown, 
  Edit, 
  Trash2, 
  UserPlus,
  Trophy,
  Star,
  Calendar
} from "lucide-react";

const MyTeams = () => {
  const [teams] = useState([
    {
      id: "1",
      name: "Thunder Wolves",
      sport: "Football",
      role: "leader",
      members: [
        { id: "1", name: "John Smith", position: "Forward" },
        { id: "2", name: "Mike Johnson", position: "Midfielder" },
        { id: "3", name: "Alex Brown", position: "Defender" },
        { id: "4", name: "Chris Wilson", position: "Goalkeeper" }
      ],
      activeTournaments: 2,
      wins: 15,
      losses: 3,
      founded: "2023-08-15"
    },
    {
      id: "2",
      name: "Lightning Strikers",
      sport: "Basketball",
      role: "member",
      members: [
        { id: "5", name: "Sarah Davis", position: "Point Guard" },
        { id: "6", name: "Emma Wilson", position: "Shooting Guard" },
        { id: "7", name: "Lisa Anderson", position: "Center" },
        { id: "8", name: "You", position: "Power Forward" }
      ],
      activeTournaments: 1,
      wins: 8,
      losses: 2,
      founded: "2024-01-10"
    }
  ]);

  const TeamCard = ({ team }: { team: any }) => (
    <div className="tournament-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">{team.name}</h3>
            {team.role === "leader" && (
              <div title="Team Leader">
                <Crown className="h-4 w-4 text-yellow-500" />
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{team.sport}</p>
          <Badge 
            variant="outline" 
            className={`${
              team.role === "leader" 
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" 
                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
            } text-xs`}
          >
            {team.role === "leader" ? "Team Leader" : "Team Member"}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <Trophy className="h-4 w-4 text-green-500 mx-auto mb-1" />
          <div className="text-sm font-bold text-green-500">{team.wins}</div>
          <div className="text-xs text-muted-foreground">Wins</div>
        </div>
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <Users className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-sm font-bold text-blue-500">{team.members.length}</div>
          <div className="text-xs text-muted-foreground">Members</div>
        </div>
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <Star className="h-4 w-4 text-orange-500 mx-auto mb-1" />
          <div className="text-sm font-bold text-orange-500">{team.activeTournaments}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Team Members</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {team.members.map((member) => (
            <div key={member.id} className="flex items-center gap-2 p-2 bg-secondary/30 rounded">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-primary/20 text-primary">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{member.name}</div>
                <div className="text-xs text-muted-foreground">{member.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {team.role === "leader" ? (
          <>
            <Button size="sm" className="btn-glow flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Players
            </Button>
            <Button variant="outline" size="sm" className="border-primary/20 hover:border-primary">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-destructive/20 hover:border-destructive text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" className="flex-1 border-destructive/20 hover:border-destructive text-destructive">
            Leave Team
          </Button>
        )}
      </div>
    </div>
  );

  const myTeams = teams.filter(team => team.role === "leader");
  const joinedTeams = teams.filter(team => team.role === "member");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Teams</h1>
          <p className="text-muted-foreground">Manage your teams and track performance across tournaments</p>
        </div>
        <Button className="btn-glow">
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="tournament-card p-4 text-center">
          <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-500">{myTeams.length}</div>
          <div className="text-sm text-muted-foreground">Led by Me</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-500">{joinedTeams.length}</div>
          <div className="text-sm text-muted-foreground">Joined Teams</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-500">
            {teams.reduce((sum, team) => sum + team.wins, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Wins</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-500">
            {teams.reduce((sum, team) => sum + team.activeTournaments, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Active Games</div>
        </div>
      </div>

      {/* My Teams Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="h-5 w-5 text-yellow-500" />
          <h2 className="text-xl font-bold">Teams I Lead</h2>
          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            {myTeams.length}
          </Badge>
        </div>
        
        {myTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 tournament-card">
            <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No teams created yet</h3>
            <p className="text-muted-foreground mb-4">Create your first team and start recruiting players!</p>
            <Button className="btn-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Team
            </Button>
          </div>
        )}
      </div>

      {/* Joined Teams Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-bold">Teams I'm Part Of</h2>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {joinedTeams.length}
          </Badge>
        </div>
        
        {joinedTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 tournament-card">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Not part of any teams</h3>
            <p className="text-muted-foreground mb-4">Join teams to start competing in tournaments!</p>
            <Button className="btn-glow">
              <Trophy className="h-4 w-4 mr-2" />
              Browse Teams
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeams;