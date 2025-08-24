import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Trophy, 
  Crown, 
  Edit, 
  Save, 
  X, 
  Plus,
  Settings,
  ArrowLeft 
} from "lucide-react";

interface Match {
  id: string;
  team1: { name: string; score?: number };
  team2: { name: string; score?: number };
  winner?: string;
  round: number;
  position: number;
}

interface Team {
  id: string;
  name: string;
}

const TournamentBracketView = () => {
  const { tournamentId } = useParams();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [editingTeams, setEditingTeams] = useState(false);

  const tournament = {
    id: tournamentId,
    name: "Summer Football Championship 2024",
    sport: "Football",
    status: "ongoing",
    host: "Sports Club NYC"
  };

  // Mock data - replace with API calls
  useEffect(() => {
    const mockTeams: Team[] = [
      { id: "1", name: "Thunder Wolves" },
      { id: "2", name: "Lightning Strikers" },
      { id: "3", name: "Fire Eagles" },
      { id: "4", name: "Storm Hawks" },
      { id: "5", name: "Ice Dragons" },
      { id: "6", name: "Wind Riders" },
      { id: "7", name: "Earth Titans" },
      { id: "8", name: "Water Sharks" }
    ];

    const mockMatches: Match[] = [
      // Quarter Finals
      { id: "qf1", team1: { name: "Thunder Wolves", score: 3 }, team2: { name: "Lightning Strikers", score: 1 }, winner: "Thunder Wolves", round: 1, position: 1 },
      { id: "qf2", team1: { name: "Fire Eagles", score: 2 }, team2: { name: "Storm Hawks", score: 0 }, winner: "Fire Eagles", round: 1, position: 2 },
      { id: "qf3", team1: { name: "Ice Dragons", score: 1 }, team2: { name: "Wind Riders", score: 2 }, winner: "Wind Riders", round: 1, position: 3 },
      { id: "qf4", team1: { name: "Earth Titans", score: 0 }, team2: { name: "Water Sharks", score: 1 }, winner: "Water Sharks", round: 1, position: 4 },
      
      // Semi Finals
      { id: "sf1", team1: { name: "Thunder Wolves", score: 2 }, team2: { name: "Fire Eagles", score: 1 }, winner: "Thunder Wolves", round: 2, position: 1 },
      { id: "sf2", team1: { name: "Wind Riders" }, team2: { name: "Water Sharks" }, round: 2, position: 2 },
      
      // Final
      { id: "f1", team1: { name: "Thunder Wolves" }, team2: { name: "TBD" }, round: 3, position: 1 }
    ];

    setTeams(mockTeams);
    setMatches(mockMatches);
  }, []);

  const rounds = Math.max(...matches.map(m => m.round));
  
  const getMatchesByRound = (round: number) => {
    return matches.filter(m => m.round === round).sort((a, b) => a.position - b.position);
  };

  const getRoundName = (round: number) => {
    const totalRounds = rounds;
    if (round === totalRounds) return "FINAL";
    if (round === totalRounds - 1) return "SEMI-FINAL";
    if (round === totalRounds - 2) return "QUARTER-FINAL";
    return `ROUND ${round}`;
  };

  const updateMatchResult = (matchId: string, team1Score: number, team2Score: number, winner: string) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, team1: { ...match.team1, score: team1Score }, team2: { ...match.team2, score: team2Score }, winner }
        : match
    ));
  };

  const MatchCard = ({ match }: { match: Match }) => (
    <div className="bg-card border border-border rounded-lg p-4 mb-4 min-w-[220px] hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/30 font-bold">
          {getRoundName(match.round)}
        </Badge>
        {match.winner && (
          <Crown className="h-4 w-4 text-yellow-500 animate-pulse" />
        )}
        {isEditMode && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setEditingMatch(match)}
            className="h-6 w-6 p-0 hover:bg-primary/10"
          >
            <Edit className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        <div className={`flex items-center justify-between p-3 rounded border-2 transition-all ${
          match.winner === match.team1.name 
            ? "bg-gradient-to-r from-primary/20 to-primary/10 border-primary shadow-lg shadow-primary/20" 
            : "bg-secondary/30 border-border hover:border-border/60"
        }`}>
          <span className="text-sm font-bold truncate">{match.team1.name}</span>
          {match.team1.score !== undefined && (
            <div className="bg-background px-2 py-1 rounded font-bold text-lg min-w-[32px] text-center">
              {match.team1.score}
            </div>
          )}
        </div>
        
        <div className="text-center text-xs text-muted-foreground font-bold tracking-wider">VS</div>
        
        <div className={`flex items-center justify-between p-3 rounded border-2 transition-all ${
          match.winner === match.team2.name 
            ? "bg-gradient-to-r from-primary/20 to-primary/10 border-primary shadow-lg shadow-primary/20" 
            : "bg-secondary/30 border-border hover:border-border/60"
        }`}>
          <span className="text-sm font-bold truncate">{match.team2.name}</span>
          {match.team2.score !== undefined && (
            <div className="bg-background px-2 py-1 rounded font-bold text-lg min-w-[32px] text-center">
              {match.team2.score}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ConnectorLine = () => (
    <div className="flex items-center justify-center px-8">
      <svg width="60" height="100" className="overflow-visible">
        <line
          x1="0"
          y1="50"
          x2="60"
          y2="50"
          className="stroke-border stroke-2"
        />
      </svg>
    </div>
  );

  const EditMatchDialog = () => {
    const [team1Score, setTeam1Score] = useState(editingMatch?.team1.score?.toString() || "");
    const [team2Score, setTeam2Score] = useState(editingMatch?.team2.score?.toString() || "");
    const [winner, setWinner] = useState(editingMatch?.winner || "");

    const handleSave = () => {
      if (editingMatch) {
        const score1 = parseInt(team1Score) || 0;
        const score2 = parseInt(team2Score) || 0;
        const matchWinner = score1 > score2 ? editingMatch.team1.name : 
                           score2 > score1 ? editingMatch.team2.name : "";
        
        updateMatchResult(editingMatch.id, score1, score2, matchWinner);
        setEditingMatch(null);
      }
    };

    return (
      <Dialog open={!!editingMatch} onOpenChange={() => setEditingMatch(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Edit Match Result
            </DialogTitle>
          </DialogHeader>
          
          {editingMatch && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{editingMatch.team1.name}</label>
                  <Input
                    type="number"
                    value={team1Score}
                    onChange={(e) => setTeam1Score(e.target.value)}
                    placeholder="Score"
                    className="text-center"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{editingMatch.team2.name}</label>
                  <Input
                    type="number"
                    value={team2Score}
                    onChange={(e) => setTeam2Score(e.target.value)}
                    placeholder="Score"
                    className="text-center"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Result
                </Button>
                <Button variant="outline" onClick={() => setEditingMatch(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary animate-pulse" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                    {tournament.name}
                  </h1>
                  <p className="text-sm text-muted-foreground">Tournament Bracket</p>
                </div>
              </div>
            </div>
            
            {isEditMode && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Edit Mode
                </Badge>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Tournament Settings
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bracket Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-card via-card/90 to-card/80 rounded-xl border border-border p-8 overflow-x-auto">
          <div className="flex items-start gap-8 pb-6" style={{ minWidth: `${rounds * 320}px` }}>
            {Array.from({ length: rounds }, (_, roundIndex) => {
              const round = roundIndex + 1;
              const roundMatches = getMatchesByRound(round);
              
              return (
                <div key={round} className="flex flex-col items-center relative">
                  {/* Round Header */}
                  <div className="mb-8 text-center">
                    <div className="bg-gradient-to-r from-primary via-purple-500 to-primary p-4 rounded-lg shadow-lg">
                      <h3 className="text-white font-bold text-lg tracking-wider">
                        {getRoundName(round)}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Matches Column */}
                  <div className="flex flex-col justify-center space-y-12">
                    {roundMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                  
                  {/* Connector Lines */}
                  {round < rounds && (
                    <div className="absolute left-full top-0 h-full flex items-center">
                      <ConnectorLine />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Champion Display */}
          {matches.some(m => m.round === rounds && m.winner) && (
            <div className="mt-12 text-center">
              <div className="max-w-md mx-auto bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20 border-2 border-yellow-500/40 rounded-xl p-8 shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Crown className="h-10 w-10 text-yellow-500 animate-bounce" />
                  <h3 className="text-2xl font-bold text-yellow-500">CHAMPION</h3>
                  <Crown className="h-10 w-10 text-yellow-500 animate-bounce" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {matches.find(m => m.round === rounds)?.winner}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Match Dialog */}
      <EditMatchDialog />
    </div>
  );
};

export default TournamentBracketView;