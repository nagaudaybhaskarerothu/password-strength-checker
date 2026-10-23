
import { useState } from "react";
import "./App.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [score, setScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasLength = password.length >= 8;

  const handlePassword = () => {
    if (password.trim() === "") {
      setStrength("");
      setScore(0);
      alert("Enter password");
      return;
    }

    let newScore = 0;

    if (hasUppercase) newScore++;
    if (hasLowercase) newScore++;
    if (hasNumber) newScore++;
    if (hasSpecial) newScore++;
    if (hasLength) newScore++;

    setScore(newScore);

    if (newScore <= 2) {
      setStrength("Weak");
    } else if (newScore <= 4) {
      setStrength("Medium");
    } else {
      setStrength("Strong");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setStrength("");
    setScore(0);
  };

  const getStrengthClass = () => {
    if (strength === "Weak") return "weak";
    if (strength === "Medium") return "medium";
    if (strength === "Strong") return "strong";
    return "";
  };

  return (
    <div className="app-container">
      <div className="checker-card">
        <div className="lock-icon">🔐</div>

        <h1>Password Strength Checker</h1>
        <p className="subtitle">
          Check how strong your password is
        </p>

        <label htmlFor="password">Enter Password</label>

        <div className="password-input">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button
            type="button"
            className="toggle-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="button"
          className="check-button"
          onClick={handlePassword}
        >
          Check Password
        </button>

        {strength && (
          <div className="strength-section">
            <div className="strength-heading">
              <span>Password Strength</span>
              <span className={getStrengthClass()}>
                {strength}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className={`progress-fill ${getStrengthClass()}`}
                style={{ width: `${(score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="requirements">
          <h3>Password Requirements</h3>

          <p className={hasLength ? "valid" : ""}>
            {hasLength ? "✓" : "○"} At least 8 characters
          </p>

          <p className={hasUppercase ? "valid" : ""}>
            {hasUppercase ? "✓" : "○"} Uppercase letter (A-Z)
          </p>

          <p className={hasLowercase ? "valid" : ""}>
            {hasLowercase ? "✓" : "○"} Lowercase letter (a-z)
          </p>

          <p className={hasNumber ? "valid" : ""}>
            {hasNumber ? "✓" : "○"} Number (0-9)
          </p>

          <p className={hasSpecial ? "valid" : ""}>
            {hasSpecial ? "✓" : "○"} Special character (!@#$)
          </p>
        </div>
      </div>
    </div>
  );
}