import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Eye,
  UserPlus,
  Clock,
  Brackets
} from "lucide-react";

interface TournamentCardProps {
  tournament: {
    id: string;
    name: string;
    sport: string;
    location: string;
    startDate: string;
    endDate?: string;
    maxTeams: number;
    currentTeams: number;
    status: "upcoming" | "ongoing" | "completed";
    isPublic: boolean;
    host: string;
    description?: string;
    prize?: string;
  };
  showBracketView?: boolean;
  isCreator?: boolean;
}

const TournamentCard = ({ tournament, showBracketView = true, isCreator = false }: TournamentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "ongoing": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "completed": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const isSpotsFull = tournament.currentTeams >= tournament.maxTeams;

  return (
    <div className="tournament-card p-6 hover:scale-[1.02] group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {tournament.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Hosted by <span className="text-primary font-medium">{tournament.host}</span>
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={`${getStatusColor(tournament.status)} font-medium`}
        >
          {tournament.status}
        </Badge>
      </div>

      {/* Tournament Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4 text-primary" />
          <span className="font-medium text-primary">{tournament.sport}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{tournament.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{tournament.startDate}</span>
          {tournament.endDate && (
            <span className="text-muted-foreground/60">- {tournament.endDate}</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            {tournament.currentTeams}/{tournament.maxTeams} teams
          </span>
          <div className="flex-1 bg-secondary rounded-full h-2 ml-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500 animate-pulse-glow"
              style={{ width: `${(tournament.currentTeams / tournament.maxTeams) * 100}%` }}
            />
          </div>
        </div>

        {tournament.prize && (
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-yellow-500 font-medium">{tournament.prize}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {tournament.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tournament.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 border-primary/20 hover:border-primary hover:bg-primary/10 group"
        >
          <Eye className="h-4 w-4 mr-2 group-hover:text-primary" />
          View Details
        </Button>
        
        {showBracketView && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-purple-500/20 hover:border-purple-500 hover:bg-purple-500/10 group"
            onClick={() => window.open(`/tournament/${tournament.id}/bracket`, '_blank')}
          >
            <Brackets className="h-4 w-4 mr-2 group-hover:text-purple-500" />
            View Bracket
          </Button>
        )}
        
        {tournament.status === "upcoming" && !isSpotsFull && !isCreator && (
          <Button 
            className="btn-glow flex-1" 
            size="sm"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Join Tournament
          </Button>
        )}

        {isSpotsFull && tournament.status === "upcoming" && (
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1" 
            disabled
          >
            <Clock className="h-4 w-4 mr-2" />
            Full
          </Button>
        )}
      </div>

      {/* Privacy Indicator */}
      {!tournament.isPublic && (
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="text-xs bg-orange-500/20 text-orange-400 border-orange-500/30">
            Private
          </Badge>
        </div>
      )}
    </div>
  );
};

export default TournamentCard;