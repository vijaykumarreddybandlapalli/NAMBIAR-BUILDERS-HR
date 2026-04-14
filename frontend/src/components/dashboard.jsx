export default function Dashboard() {
    return (
      <div>
        <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>
  
        <div style={{ display: "flex", gap: "20px" }}>
          
          <div style={card}>
            <h2>247</h2>
            <p>Total Employees</p>
          </div>
  
          <div style={card}>
            <h2>18</h2>
            <p>Emails Sent Today</p>
          </div>
  
          <div style={card}>
            <h2>6</h2>
            <p>Upcoming Events</p>
          </div>
  
          <div style={card}>
            <h2>4</h2>
            <p>Active Templates</p>
          </div>
  
        </div>
      </div>
    );
  }
  
  const card = {
    background: "#2a1b10",
    padding: "20px",
    borderRadius: "12px",
    width: "200px"
  };