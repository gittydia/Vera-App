import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import mainLogo from '../../imports/main.png';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className="size-full overflow-y-auto" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <div className="w-full max-w-md mx-auto min-h-full flex flex-col">
        <header className="flex items-center gap-4 p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            size="icon"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl">Sign In</h2>
        </header>

        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="mb-8 text-center">
              <img src={mainLogo} alt="Vera" className="h-50 w-auto mx-auto mb-6" />
              <h1 className="text-3xl mb-2">Welcome back</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Sign in to continue protecting your health</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: 'var(--text-tertiary)' }} />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10" style={{ color: 'var(--text-tertiary)' }} />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-11"
                  />
                </div>
              </div>

              <button className="text-sm text-[#A78BFA] hover:text-[#7C3AED] transition-colors text-right w-full">
                Forgot password?
              </button>
            </div>

            <Button onClick={handleLogin} className="w-full mb-4" size="lg">
              Sign In
            </Button>

            <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-[#A78BFA] hover:text-[#7C3AED] transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
