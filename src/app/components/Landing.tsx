import { useNavigate } from 'react-router-dom';
import { Shield, Scan, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import mainLogo from '../../imports/main.png';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="size-full overflow-y-auto" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <div className="w-full max-w-md mx-auto min-h-full flex flex-col p-6">
        <div className="flex-1 flex flex-col justify-center py-12">
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 flex items-center justify-center">
              <img src={mainLogo} alt="Vera" className="h-24 w-auto" />
            </div>
            <p className="text-xl mb-2">Your Personal Health Guardian</p>
            <p className="text-gray-500">Verify product authenticity instantly</p>
          </div>

          <div className="space-y-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Scan className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Instant Verification</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Scan barcodes or paste links to verify product safety</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Shield className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Credibility Scores</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Get detailed safety ratings and transparency reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <Users className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="mb-1">Community Powered</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Join millions protecting their health together</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/signup')} className="w-full" size="lg">
              Create Account
            </Button>
            <Button onClick={() => navigate('/login')} variant="outline" className="w-full" size="lg">
              Sign In
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
