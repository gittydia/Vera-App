import { ArrowLeft, User, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { useTheme } from '../context/ThemeContext';
import darkLogo from '../../imports/dark_mode.png';
import lightLogo from '../../imports/light_mode.png';

export function Profile() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="size-full flex flex-col" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <header className="flex items-center gap-3 px-4 py-2">
        <Button
          onClick={() => navigate('/home')}
          variant="secondary"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg">Profile</h2>
      </header>

      <Separator />

      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-md mx-auto p-6 space-y-6">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="text-3xl">JD</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl mb-1">John Doe</h2>
            <p style={{ color: 'var(--text-secondary)' }}>john.doe@example.com</p>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span style={{ color: 'var(--text-secondary)' }}>Products Scanned</span>
                <span className="text-2xl text-[#7C3AED]">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Safety Warnings</span>
                <span className="text-2xl text-[#EF4444]">12</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Card className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/settings')}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <User className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <span className="flex-1 text-left">Account Settings</span>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:opacity-80 transition-opacity">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <Shield className="w-5 h-5 text-[#22C55E]" />
                </div>
                <span className="flex-1 text-left">Privacy & Security</span>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:opacity-80 transition-opacity">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <Bell className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <span className="flex-1 text-left">Notifications</span>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:opacity-80 transition-opacity">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <HelpCircle className="w-5 h-5 text-[#A78BFA]" />
                </div>
                <span className="flex-1 text-left">Help & Support</span>
              </CardContent>
            </Card>
          </div>

          <Button onClick={() => navigate('/')} variant="destructive" className="w-full" size="lg">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
