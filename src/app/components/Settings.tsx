import { ArrowLeft, Moon, Bell, Globe, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import darkLogo from '../../imports/dark_mode.png';
import lightLogo from '../../imports/light_mode.png';

export function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="size-full flex flex-col" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <header className="flex items-center gap-3 px-4 py-2">
        <Button
          onClick={() => navigate('/profile')}
          variant="secondary"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg">Settings</h2>
      </header>

      <Separator />

      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-md mx-auto p-6 space-y-6">
          <div>
            <h3 className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Appearance</h3>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Moon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <span>Dark Mode</span>
                </div>
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Notifications</h3>
            <div className="space-y-2">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <Bell className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <span>Push Notifications</span>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <Globe className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1">Language</div>
                      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>English (US)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Privacy</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Lock className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">Data & Privacy</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Manage your data</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4 space-y-2 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            <p>Vera v1.0.0</p>
            <div className="flex items-center justify-center gap-4">
              <button className="hover:text-[#7C3AED] transition-colors">Terms</button>
              <span>·</span>
              <button className="hover:text-[#7C3AED] transition-colors">Privacy</button>
              <span>·</span>
              <button className="hover:text-[#7C3AED] transition-colors">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
