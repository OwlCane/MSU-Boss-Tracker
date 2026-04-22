import { useEffect, useState } from "react";

export default function Home() {
  const [logged, setLogged] = useState(false);
  const [pass, setPass] = useState("");
  const [runs, setRuns] = useState([]);
  const [you, setYou] = useState("");
  const [partner, setPartner] = useState("");
  const [boss, setBoss] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("msu_runs");
    if (data) setRuns(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("msu_runs", JSON.stringify(runs));
  }, [runs]);

  function login() {
    if (pass === "2406") setLogged(true);
    else alert("Senha incorreta");
  }

  function addRun() {
    if (!you || !partner || !boss) return;
    setRuns([...runs, { you, partner, boss, done: false }]);
    setYou(""); setPartner(""); setBoss("");
  }

  function toggle(i) {
    const copy = [...runs];
    copy[i].done = !copy[i].done;
    setRuns(copy);
  }

  function remove(i) {
    setRuns(runs.filter((_, index) => index !== i));
  }

  if (!logged) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.card}>
          <h1>MSU Boss Duo Tracker</h1>
          <p>Welcome Birrique & Iasmine</p>
          <input placeholder="Senha" value={pass} onChange={(e) => setPass(e.target.value)} style={styles.input}/>
          <button onClick={login} style={styles.btn}>Entrar</button>
        </div>
      </div>
    );
  }

  const done = runs.filter(r => r.done).length;

  return (
    <div style={styles.page}>
      <h1>MSU Boss Duo Tracker</h1>
      <p>Boss MSU</p>
      <div style={styles.stats}>
        <div style={styles.card}>Total: {runs.length}</div>
        <div style={styles.card}>Feitos: {done}</div>
        <div style={styles.card}>Pendentes: {runs.length - done}</div>
      </div>
      <div style={styles.card}>
        <input placeholder="Seu char" value={you} onChange={(e)=>setYou(e.target.value)} style={styles.input}/>
        <input placeholder="Char dela" value={partner} onChange={(e)=>setPartner(e.target.value)} style={styles.input}/>
        <input placeholder="Boss" value={boss} onChange={(e)=>setBoss(e.target.value)} style={styles.input}/>
        <button onClick={addRun} style={styles.btn}>Adicionar</button>
      </div>
      {runs.map((run, i) => (
        <div key={i} style={styles.run}>
          <span>{run.you} + {run.partner} → {run.boss}</span>
          <div>
            <button onClick={()=>toggle(i)} style={styles.btn}>{run.done ? "✅" : "⏳"}</button>
            <button onClick={()=>remove(i)} style={styles.btn}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page:{background:"#0b1020",minHeight:"100vh",color:"white",padding:"40px",fontFamily:"Arial"},
  loginWrap:{background:"#0b1020",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"white"},
  card:{background:"#151b2e",padding:"20px",borderRadius:"16px",marginBottom:"15px"},
  input:{display:"block",margin:"10px 0",padding:"10px",width:"260px"},
  btn:{padding:"10px 15px",margin:"5px",cursor:"pointer"},
  stats:{display:"flex",gap:"10px",marginBottom:"20px"},
  run:{background:"#151b2e",padding:"15px",borderRadius:"12px",marginBottom:"10px",display:"flex",justifyContent:"space-between"}
};