import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      onLogin();
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tu correo y contraseña.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 340,
        margin: "80px auto",
        border: "1px solid #e0e7ff",
        borderRadius: 8,
        background: "#f8fafc",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#3b82f6", textAlign: "center" }}> 🚗 AutoClean Pro </h2>
      <p style={{ textAlign: "center", color: "#666" }}> Inicia sesión como empleado </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: 4,
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            border: "1px solid #ddd",
            borderRadius: 4,
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {error && (
        <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "12px" }}> ⚠️ {error} </p>
      )}
      <p style={{ fontSize: "12px", color: "#999", marginTop: "20px", textAlign: "center" }}> 📝 Contacta al administrador para crear una cuenta </p>
    </div>
  );
}