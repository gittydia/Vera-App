import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "../../lib/auth";
import mainLogo from "../../imports/main.png";

export function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      setError("");
      await signup(name, email, password);
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <div
      className="size-full overflow-y-auto"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="w-full max-w-md mx-auto min-h-full flex flex-col">
        <header
          className="flex items-center gap-4 p-4"
          style={{
            borderBottom: "1px solid var(--border-color)",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="secondary"
            size="icon"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl">Create Account</h2>
        </header>

        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="mb-8 text-center">
              <img
                src={mainLogo}
                alt="Vera"
                className="h-50 w-auto mx-auto mb-6"
              />
              <h1 className="text-3xl mb-2">Join Vera</h1>
              <p style={{ color: "var(--text-secondary)" }}>
                Start protecting your health today
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-11"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                    style={{ color: "var(--text-tertiary)" }}
                  />
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
                <label
                  className="block text-sm mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="pl-11"
                  />
                </div>
                <p
                  className="text-xs mt-1.5"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  At least 8 characters
                </p>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 mb-2 text-center">{error}</p>
            )}

            <Button
              onClick={handleSignup}
              className="w-full mb-4"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <p
              className="text-center text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#A78BFA] hover:text-[#7C3AED] transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}