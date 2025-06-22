import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import type { Gift } from "./types";
import styled, { keyframes, ThemeProvider, createGlobalStyle, DefaultTheme } from "styled-components";

const BACKEND_URL = "https://chrono-gift-backend.onrender.com";

// --- THEME SETUP ---
// Use DefaultTheme type so these conform to your styled.d.ts interface

const lightTheme: DefaultTheme = {
   mode: "light", 
  background: "#f0f4f8",
  backgroundGradient: "linear-gradient(135deg, #cce7ff 0%, #5a9bd5 100%)",
  headingColor: "#004080",
  cardBackground: "#ffffff",
  cardBg: "#ffffff",          // duplicate key, keep both for compatibility
  cardTextColor: "#004080",
  textPrimary: "#004080",
  textSecondary: "#004080cc",
  primaryText: "#004080",
  secondaryText: "#004080cc",
  buttonBg: "#357ABD",
  buttonGradient: "linear-gradient(45deg, #4a90e2, #357ABD)",
  buttonHoverBg: "#4a90e2",
  buttonHoverGradient: "linear-gradient(45deg, #357ABD, #4a90e2)",
  inputBorder: "#357ABD",
  inputBackground: "#ffffff",
  inputColor: "#004080",
  inputFocusBorder: "#74a9ff",
  errorColor: "#cc0000",
  subHeadingColor: "#0059b3",
  footerColor: "#004080",
  footerBg: "#e0e7ff",
  logoutBg: "#cc3300",
  logoutHoverBg: "#ff0000",
  boxShadow: "0 4px 15px rgba(58, 123, 255, 0.4), 0 8px 30px rgba(0, 0, 0, 0.1)",
};

const darkTheme: DefaultTheme = {
  mode: "dark",
  background: "#0f1624",
  backgroundGradient: "linear-gradient(135deg, #1a2a6c 0%, #0f1624 100%)",
  headingColor: "#9ecfff",
  cardBackground: "#0f1624",
  cardBg: "#0f1624",
  cardTextColor: "#b3d1ff",
  textPrimary: "#9ecfff",
  textSecondary: "#b3d1ffcc",
  primaryText: "#9ecfff",
  secondaryText: "#b3d1ffcc",
  buttonBg: "#1e3c72",
  buttonGradient: "linear-gradient(45deg, #3771c8, #1e3c72)",
  buttonHoverBg: "#3771c8",
  buttonHoverGradient: "linear-gradient(45deg, #1e3c72, #3771c8)",
  inputBorder: "#3771c8",
  inputBackground: "#14243e",
  inputColor: "#b3d1ff",
  inputFocusBorder: "#5596ff",
  errorColor: "#ff6b6b",
  subHeadingColor: "#a0bfff",
  footerColor: "#b3d1ff",
  footerBg: "#07102d",
  logoutBg: "#ff6b6b",
  logoutHoverBg: "#ff4a4a",
  boxShadow: "0 4px 15px rgba(58, 123, 255, 0.7), 0 8px 30px rgba(0, 0, 0, 0.8)",
};

// Global styles with typed theme
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    transition: background 0.3s ease, color 0.3s ease;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease forwards;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 20px;
  padding: 40px 30px;
  max-width: 500px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow};
  user-select: none;
  text-align: center;

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 15px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-align: left;
`;

const Input = styled.input<{ isDarkMode: boolean }>`
  width: 90%;
  padding: 10px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.inputBorder};
  outline: none;
  transition: border-color 0.3s ease;
  font-family: inherit;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ isDarkMode }) => (isDarkMode ? "#14243e" : "white")};

  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorder};
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  background: ${({ theme }) => theme.buttonBg};
  border: none;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(255, 126, 95, 0.6);
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;
  user-select: none;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBg};
    box-shadow: 0 8px 20px rgba(255, 180, 130, 0.9);
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.errorColor};
  margin-top: 12px;
  font-weight: 600;
  text-align: center;
`;

const GiftContentImage = styled.img`
  max-width: 100%;
  margin-top: 10px;
  border-radius: 8px;
`;

const GiftContentVideo = styled.video`
  max-width: 100%;
  margin-top: 10px;
  border-radius: 8px;
`;

const ThemeToggleBtn = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.textPrimary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.textPrimary};
    color: ${({ theme }) => theme.cardBg};
  }
`;

// --- HELPER FUNCTION TO FORMAT DATE TO IST ---
function formatDateInIST(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

// --- THEME HOOK ---
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("themePreference") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("themePreference");
      if (!saved) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("themePreference", nextTheme);
      return nextTheme;
    });
  };

  return { theme, toggleTheme };
}

// --- MAIN COMPONENT ---
function OpenGiftPage() {
  const { giftId } = useParams<{ giftId: string }>();
  const [pageState, setPageState] = useState<"auth" | "passcode" | "opened" | "error">("auth");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [gift, setGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { theme, toggleTheme } = useTheme();

  const handleGoogleSuccess = (credentialResponse: any) => {
    setAccessToken(credentialResponse.access_token);
    setPageState("passcode");
    setError("");
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError("Google Sign-In failed. Please try again."),
  });

  const handleOpenGift = async () => {
    if (!passcode || !accessToken) {
      setError("Passcode is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/gift/open`, {
        giftId,
        enteredPasscode: passcode,
        accessToken,
      });

      setGift(res.data.gift);
      setPageState("opened");

      // Log opening, but don't fail on error
      await axios.post(`${BACKEND_URL}/api/gift/log-open`, {
        giftId,
        accessToken,
      }).catch(() => {});
    } catch (err) {
      const axiosError = err as AxiosError<{ error?: string }>;
      const serverError = axiosError.response?.data?.error || "An unknown error occurred.";
      setError(serverError);
      setPageState("error");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (pageState) {
      case "auth":
        return (
          <>
            <h2>You've Received a Gift!</h2>
            <p>Sign in with Google to verify you're the recipient.</p>
            <Button onClick={() => login()}>Sign in with Google</Button>
            {error && <ErrorText>{error}</ErrorText>}
          </>
        );
      case "passcode":
        return (
          <>
            <h2>Enter Passcode</h2>
            <p>The sender has provided you with a passcode to open this gift.</p>
            <Label htmlFor="passcode-input">Passcode</Label>
            <Input
              id="passcode-input"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              autoFocus
              isDarkMode={theme === "dark"}
            />
            <Button onClick={handleOpenGift} disabled={loading}>
              {loading ? "Opening..." : "Open Gift"}
            </Button>
            {error && <ErrorText>{error}</ErrorText>}
          </>
        );
      case "opened":
        return gift ? (
          <>
            <h3>Your Gift is Unlocked!</h3>
            {gift.textMessage && <p style={{ fontSize: "1.1em", whiteSpace: "pre-wrap" }}>{gift.textMessage}</p>}
            {gift.imageUrl && <GiftContentImage src={gift.imageUrl} alt="Gift" />}
            {gift.videoUrl && <GiftContentVideo src={gift.videoUrl} controls />}
            {gift.unlockTimestamp && (
              <p style={{ marginTop: "12px", color: theme === "light" ? "#666" : "#ccc" }}>
                Opened at: {formatDateInIST(String(gift.unlockTimestamp))}
              </p>
            )}
            {!gift.textMessage && !gift.imageUrl && !gift.videoUrl && (
              <p>This gift is a beautiful thought, with no attached content.</p>
            )}
          </>
        ) : null;
      case "error":
        return (
          <>
            <h2>Something went wrong</h2>
            <ErrorText>{error}</ErrorText>
            <Button
              onClick={() => {
                setPageState("auth");
                setError("");
                setPasscode("");
              }}
            >
              Try Again
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  if (!giftId) {
    return (
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <PageContainer>
          <Card>
            <p>Invalid gift link.</p>
          </Card>
        </PageContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ThemeToggleBtn
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        onClick={toggleTheme}
        title="Toggle light/dark theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </ThemeToggleBtn>
      <PageContainer>
        <Card>{renderContent()}</Card>
      </PageContainer>
    </ThemeProvider>
  );
}

export default OpenGiftPage;
