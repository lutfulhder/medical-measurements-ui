import { useState } from "react";

type Measurement = {
  id: number;
  patientId: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  measuredAt: string;
  receivedAt: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function App() {
  const [patientId, setPatientId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (patientId.trim()) params.append("patientId", patientId.trim());
      if (from) params.append("from", new Date(from).toISOString());
      if (to) params.append("to", new Date(to).toISOString());

      const res = await fetch(`${API_BASE}/api/v1/measurements?` + params.toString());
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const data: Measurement[] = await res.json();
      setMeasurements(data);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Medical Measurements Dashboard</h1>
      <p style={{ color: "#555" }}>
        Search stored blood pressure and heart rate measurements.
      </p>

      {/* Search Form */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: 8,
        }}
      >
        <h2>Search</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <label>
              Patient ID
              <br />
              <input
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="patient-1"
              />
            </label>
          </div>
          <div>
            <label>
              From
              <br />
              <input
                type="datetime-local"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              To
              <br />
              <input
                type="datetime-local"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </label>
          </div>
        </div>

        <button
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>
            Error: {error}
          </p>
        )}
      </div>

      {/* Results */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Results ({measurements.length})</h2>
        {measurements.length === 0 && !loading && (
          <p>No measurements found. Try running the simulator or sending data via Swagger.</p>
        )}

        {measurements.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>ID</th>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Patient</th>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Systolic</th>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Diastolic</th>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Heart Rate</th>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Measured At</th>
                <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Received At</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m) => (
                <tr key={m.id}>
                  <td style={{ borderBottom: "1px solid #eee" }}>{m.id}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>{m.patientId}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>{m.systolic}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>{m.diastolic}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>{m.heartRate}</td>
                  <td style={{ borderBottom: "1px solid #eee" }}>
                    {new Date(m.measuredAt).toLocaleString()}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee" }}>
                    {new Date(m.receivedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
