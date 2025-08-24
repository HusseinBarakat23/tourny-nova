import { Badge } from "@/components/ui/badge";
import { Trophy, Crown } from "lucide-react";

interface Match {
  id: string;
  team1: { name: string; score?: number };
  team2: { name: string; score?: number };
  winner?: string;
  round: number;
  position: number;
}

interface TournamentBracketProps {
  matches: Match[];
  tournamentName: string;
}

const TournamentBracket = ({ matches, tournamentName }: TournamentBracketProps) => {
  const rounds = Math.max(...matches.map(m => m.round));
  
  const getMatchesByRound = (round: number) => {
    return matches.filter(m => m.round === round).sort((a, b) => a.position - b.position);
  };

  const getRoundName = (round: number) => {
    const totalRounds = rounds;
    if (round === totalRounds) return "Final";
    if (round === totalRounds - 1) return "Semi-Final";
    if (round === totalRounds - 2) return "Quarter-Final";
    return `Round ${round}`;
  };

  const MatchCard = ({ match }: { match: Match }) => (
    <div className="tournament-card p-4 mb-4 min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-xs">
          {getRoundName(match.round)}
        </Badge>
        {match.winner && (
          <Crown className="h-4 w-4 text-yellow-500" />
        )}
      </div>
      
      <div className="space-y-2">
        <div className={`flex items-center justify-between p-2 rounded border ${
          match.winner === match.team1.name 
            ? "bg-primary/20 border-primary text-primary" 
            : "bg-secondary/50 border-border"
        }`}>
          <span className="text-sm font-medium truncate">{match.team1.name}</span>
          {match.team1.score !== undefined && (
            <span className="text-lg font-bold ml-2 score-bounce">{match.team1.score}</span>
          )}
        </div>
        
        <div className="text-center text-xs text-muted-foreground">VS</div>
        
        <div className={`flex items-center justify-between p-2 rounded border ${
          match.winner === match.team2.name 
            ? "bg-primary/20 border-primary text-primary" 
            : "bg-secondary/50 border-border"
        }`}>
          <span className="text-sm font-medium truncate">{match.team2.name}</span>
          {match.team2.score !== undefined && (
            <span className="text-lg font-bold ml-2 score-bounce">{match.team2.score}</span>
          )}
        </div>
      </div>
    </div>
  );

  const ConnectorLine = ({ fromRound, toRound }: { fromRound: number; toRound: number }) => (
    <div className="flex items-center justify-center px-8">
      <svg width="60" height="100" className="overflow-visible">
        <line
          x1="0"
          y1="50"
          x2="60"
          y2="50"
          className="bracket-line"
        />
      </svg>
    </div>
  );

  return (
    <div className="tournament-bracket w-full overflow-x-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 px-4">
        <Trophy className="h-8 w-8 text-primary animate-pulse-glow" />
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {tournamentName} - Tournament Bracket
        </h2>
      </div>

      {/* Bracket Container */}
      <div className="flex items-start gap-4 pb-6 px-4" style={{ minWidth: `${rounds * 280}px` }}>
        {Array.from({ length: rounds }, (_, roundIndex) => {
          const round = roundIndex + 1;
          const roundMatches = getMatchesByRound(round);
          
          return (
            <div key={round} className="flex flex-col items-center">
              {/* Round Header */}
              <div className="mb-6 text-center">
                <Badge 
                  variant="outline" 
                  className="bg-primary/20 text-primary border-primary/30 font-bold"
                >
                  {getRoundName(round)}
                </Badge>
              </div>
              
              {/* Matches Column */}
              <div className="flex flex-col justify-center space-y-8">
                {roundMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
              
              {/* Connector Lines */}
              {round < rounds && (
                <div className="absolute left-full top-0 h-full flex items-center">
                  <ConnectorLine fromRound={round} toRound={round + 1} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Champion Display */}
      {matches.some(m => m.round === rounds && m.winner) && (
        <div className="mt-8 text-center">
          <div className="tournament-card p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
              <h3 className="text-xl font-bold text-primary">Champion</h3>
              <Crown className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
            </div>
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-float">
              {matches.find(m => m.round === rounds)?.winner}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentBracket;