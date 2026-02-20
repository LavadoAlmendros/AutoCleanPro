import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AutoCleanPro from "./AutoCleanPro";
import Login from "./Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setPending(false);
    });
    return unsubscribe;
  }, []);

  if (pending) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={() => setUser(auth.currentUser)} />;
  }

  return (
    <AutoCleanPro user={user} onLogout={async () => {
      await signOut(auth);
      setUser(null);
    }} />
  );
}