import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Trophy, Users, Calendar, Settings, Check, X, Trash2 } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "tournament_update",
      title: "Match Result Updated",
      message: "Thunder Wolves vs Lightning Strikers result has been posted. Final score: 3-1",
      tournament: "Summer Football Championship",
      time: "2 hours ago",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "team_invitation",
      title: "Team Invitation",
      message: "You've been invited to join Fire Eagles basketball team",
      from: "Team Captain Mike",
      time: "5 hours ago",
      read: false,
      priority: "medium",
      actionable: true
    },
    {
      id: "3",
      type: "tournament_reminder",
      title: "Tournament Starting Soon",
      message: "Your subscribed tournament 'City Tennis Championship' starts tomorrow",
      tournament: "City Tennis Championship",
      time: "1 day ago",
      read: true,
      priority: "medium"
    },
    {
      id: "4",
      type: "match_schedule",
      title: "Upcoming Match",
      message: "Your team Thunder Wolves has a match scheduled for March 16, 2:00 PM",
      tournament: "Summer Football Championship",
      time: "2 days ago",
      read: true,
      priority: "low"
    }
  ]);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [tournamentUpdates, setTournamentUpdates] = useState(true);
  const [teamInvitations, setTeamInvitations] = useState(true);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "tournament_update":
      case "tournament_reminder":
        return <Trophy className="h-5 w-5 text-primary" />;
      case "team_invitation":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "match_schedule":
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-primary animate-pulse-glow" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your tournaments and teams</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <Button variant="outline" className="border-primary/20 hover:border-primary">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Notifications</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setNotifications(prev => 
                prev.map(notif => ({ ...notif, read: true }))
              )}
              className="border-primary/20 hover:border-primary"
            >
              Mark All Read
            </Button>
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`tournament-card p-4 ${
                    !notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold ${!notification.read ? "text-primary" : ""}`}>
                            {notification.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      
                      {(notification.tournament || notification.from) && (
                        <div className="text-xs text-primary font-medium mb-3">
                          {notification.tournament && `Tournament: ${notification.tournament}`}
                          {notification.from && `From: ${notification.from}`}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {notification.actionable && (
                          <>
                            <Button size="sm" className="btn-glow text-xs h-7">
                              <Check className="h-3 w-3 mr-1" />
                              Accept
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs h-7 border-destructive/20 hover:border-destructive text-destructive">
                              <X className="h-3 w-3 mr-1" />
                              Decline
                            </Button>
                          </>
                        )}
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs h-7 text-primary hover:bg-primary/10"
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs h-7 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 tournament-card">
              <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="tournament-card p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Email Notifications</div>
                <div className="text-xs text-muted-foreground">Receive notifications via email</div>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Push Notifications</div>
                <div className="text-xs text-muted-foreground">Browser push notifications</div>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="border-t border-border pt-4 space-y-4">
              <h4 className="font-medium text-sm">Notification Types</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Tournament Updates</div>
                  <div className="text-xs text-muted-foreground">Match results, schedule changes</div>
                </div>
                <Switch 
                  checked={tournamentUpdates} 
                  onCheckedChange={setTournamentUpdates}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Team Invitations</div>
                  <div className="text-xs text-muted-foreground">Invites to join teams</div>
                </div>
                <Switch 
                  checked={teamInvitations} 
                  onCheckedChange={setTeamInvitations}
                />
              </div>
            </div>
          </div>

          <Button className="btn-glow w-full mt-6" size="sm">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;