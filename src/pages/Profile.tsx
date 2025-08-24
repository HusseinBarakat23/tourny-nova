import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Edit, 
  Trophy, 
  Target,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Save,
  Camera
} from "lucide-react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate football player and tournament organizer with 5+ years of experience in competitive sports.",
    joinDate: "January 2023",
    preferredSports: ["Football", "Basketball", "Tennis"],
    achievements: [
      { title: "Tournament Winner", description: "Summer Football Championship 2023", date: "Aug 2023" },
      { title: "Team Captain", description: "Led Thunder Wolves to 3 consecutive wins", date: "Mar 2023" },
      { title: "Best Player", description: "Outstanding performance in City League", date: "Dec 2022" }
    ],
    stats: {
      tournamentsWon: 5,
      tournamentsParticipated: 15,
      teamsLed: 2,
      teamsJoined: 4
    }
  });

  const handleSave = () => {
    setEditMode(false);
    // Here you would save the profile data
  };

  const ProfileField = ({ label, value, name, type = "text" }: any) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
      {editMode ? (
        <Input
          id={name}
          type={type}
          value={value}
          onChange={(e) => setProfile(prev => ({ ...prev, [name]: e.target.value }))}
          className="bg-secondary/50 border-border focus:border-primary"
        />
      ) : (
        <p className="text-muted-foreground bg-secondary/30 px-3 py-2 rounded-md">{value}</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="tournament-card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 btn-glow"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {profile.joinDate}</span>
                </div>
              </div>
              
              <Button 
                className={editMode ? "btn-glow" : ""}
                variant={editMode ? "default" : "outline"}
                onClick={editMode ? handleSave : () => setEditMode(true)}
              >
                {editMode ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-4">{profile.bio}</p>
            
            <div className="flex flex-wrap gap-2">
              {profile.preferredSports.map((sport) => (
                <Badge key={sport} variant="outline" className="bg-primary/20 text-primary border-primary/30">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="tournament-card p-4 text-center">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-500">{profile.stats.tournamentsWon}</div>
          <div className="text-sm text-muted-foreground">Tournaments Won</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-500">{profile.stats.tournamentsParticipated}</div>
          <div className="text-sm text-muted-foreground">Participated</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <User className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-500">{profile.stats.teamsLed}</div>
          <div className="text-sm text-muted-foreground">Teams Led</div>
        </div>
        <div className="tournament-card p-4 text-center">
          <Star className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-500">{profile.stats.teamsJoined}</div>
          <div className="text-sm text-muted-foreground">Teams Joined</div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-card/50 border border-border">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="tournament-card p-6">
            <h3 className="text-xl font-bold mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="Full Name" value={profile.name} name="name" />
              <ProfileField label="Email Address" value={profile.email} name="email" type="email" />
              <ProfileField label="Phone Number" value={profile.phone} name="phone" type="tel" />
              <ProfileField label="Location" value={profile.location} name="location" />
            </div>
            
            <div className="mt-6 space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
              {editMode ? (
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md focus:border-primary focus:outline-none resize-none"
                  rows={4}
                />
              ) : (
                <p className="text-muted-foreground bg-secondary/30 px-3 py-2 rounded-md">{profile.bio}</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="space-y-4">
            {profile.achievements.map((achievement, index) => (
              <div key={index} className="tournament-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                    <p className="text-muted-foreground mb-2">{achievement.description}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {achievement.date}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="tournament-card p-6">
            <h3 className="text-xl font-bold mb-6">Sports Preferences</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">Preferred Sports</Label>
                <div className="flex flex-wrap gap-2">
                  {["Football", "Basketball", "Tennis", "Volleyball", "Soccer", "Baseball"].map((sport) => (
                    <Badge
                      key={sport}
                      variant="outline"
                      className={`cursor-pointer transition-all ${
                        profile.preferredSports.includes(sport)
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "hover:bg-secondary/50"
                      }`}
                      onClick={() => {
                        if (editMode) {
                          setProfile(prev => ({
                            ...prev,
                            preferredSports: prev.preferredSports.includes(sport)
                              ? prev.preferredSports.filter(s => s !== sport)
                              : [...prev.preferredSports, sport]
                          }));
                        }
                      }}
                    >
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;