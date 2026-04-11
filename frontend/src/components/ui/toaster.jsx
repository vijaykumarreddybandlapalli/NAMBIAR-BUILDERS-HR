import { useState, useEffect } from "react";

export function Toaster() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prev) => prev.slice(1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      {messages.map((msg, i) => (
        <div key={i} style={{ background: "#333", color: "#fff", padding: 10, marginBottom: 10 }}>
          {msg}
        </div>
      ))}
    </div>
  );
}