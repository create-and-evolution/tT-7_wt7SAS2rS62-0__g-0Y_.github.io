import { useState, useEffect, useRef } from "react";

const glitchKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

@keyframes glitch {
  0%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
  10% { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
  20% { clip-path: inset(40% 0 30% 0); transform: translate(4px, -2px); }
  30% { clip-path: inset(70% 0 5% 0); transform: translate(-2px, 4px); }
  40% { clip-path: inset(20% 0 70% 0); transform: translate(2px, -4px); }
  50% { clip-path: inset(80% 0 2% 0); transform: translate(-4px, 2px); }
  60% { clip-path: inset(5% 0 85% 0); transform: translate(4px, 0px); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Responsive grid helpers ── */
.grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.grid-3   { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.Skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 48px; }
.Projets-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.nav-links { display: flex; gap: 6px; }
.hamburger { display: none !important; }
.mobile-menu { display: none; }

@media (max-width: 900px) {
  .grid-2       { grid-template-columns: 1fr !important; gap: 16px; }
  .grid-3       { grid-template-columns: 1fr 1fr !important; }
  .Skills-grid  { grid-template-columns: 1fr !important; }
  .Projets-grid{ grid-template-columns: 1fr !important; }
}

@media (max-width: 600px) {
  .grid-3       { grid-template-columns: 1fr !important; }
  .nav-links    { display: none !important; }
  .hamburger    { display: flex !important; }
  .mobile-menu.open { display: flex !important; flex-direction: column; }
  .hero-btns    { flex-direction: column !important; }
  .hero-btns button { width: 100% !important; }
  .stats-row    { justify-content: center; }
}
`;



const SKILLS = [
  { name: "Autonomie", level: 90, icon: "⚔️" },
  { name: "Travail en équipe", level: 70, icon: "🚩" },
  { name: "Motivation", level: 100, icon: "🔍" },
];



const PROJECTS = [


  /////////////////////////////
  //////// JEUX VIDÉOS ////////
  /////////////////////////////
  { name:"Space Hunt", picture:"",
  desc:"Ce projet avait pour but de coder entièrement un ancien jeux vidéo nommé Duck Hunt. En se basant sur la version original du jeux, j'ai fais le choix de le faire dans un univers spatial. L'objectif est de tuer tous les aliènes sans les laisser s'échapper. Il y a un système de vie qui donne la possibilité aux joueurs d'avoir 5 tentatives pour réussir. Plus un joueur tue les aliènes plus son score augmente.",
  video:"src/assets/video/Space-Hunt.mp4",
  duree:"4 semaines",
  fonction:"Jeux vidéo",
  memo:"Vidéo représentant le jeux",
  organisation:"Travail en autonomie",
  tags:["C","CSFML","Linux", "GitHub"], status:"JEUX VIDÉO" },

  { name:"Sokoban", picture:"",
  desc:"Ce projet avait pour but de coder entièrement un ancien jeux vidéo nommé Duck Hunt. En se basant sur la version original du jeux, j'ai fais le choix de le faire dans un univers spatial. L'objectif est de tuer tous les aliènes sans les laisser s'échapper. Il y a un système de vie qui donne la possibilité aux joueurs d'avoir 5 tentatives pour réussir. Plus un joueur tue les aliènes plus son score augmente.",
  video:"src/assets/video/Sokoban.mp4",
  duree:"4 semaines",
  fonction:"Jeux vidéo",
  memo:"Vidéo représentant le jeux",
  organisation:"Travail en autonomie",
  tags:["C","CSFML","Linux", "GitHub"], status:"JEUX VIDÉO" },


  ////////////////////////////
  //////// ALGORITHME ////////
  ////////////////////////////
  { name:"BSQ", picture:"",
  desc:"Création et résolution d'un labyrinthe en prenant en compte différent algorithme.",
  video:"src/assets/video/BSQ.mp4",
  duree:"2 semaines",
  fonction:"Algorithmie",
  memo:"Vidéo non représentatif du projet final",
  organisation:"Travail en groupe de 2 étudiant(e)s",
  tags:["C","Terminal", "Linux", "GitHub"], status:"ALGORITHMIE" },

  { name:"LS", picture:"",
  desc:"Création et résolution d'un labyrinthe en prenant en compte différent algorithme.",
  video:"src/assets/video/LS.mp4",
  duree:"2 semaines",
  fonction:"Algorithmie",
  memo:"Vidéo non représentatif du projet final",
  organisation:"Travail en groupe de 2 étudiant(e)s",
  tags:["C","Terminal", "Linux", "GitHub"], status:"ALGORITHMIE" },


  /////////////////////////////
  //////// CHIFFREMENT ////////
  /////////////////////////////
  { name:"Cesar", picture:"",
  desc:"Logiciel de cryptage de fichier fonctionnant autant avec des images/vidéos qu'avec des fichiers de type '.txt'",
  video:"src/assets/video/Cesar.mp4",
  duree:"En cours...",
  fonction:"Chiffrement",
  memo:"Vidéo représentant le résultat",
  organisation:"Travail en autonomie",
  tags:["Python","Linux/Windows","GitHub"], status:"CHIFFREMENT" },

  { name:"Password Generator", picture:"",
  desc:"Logiciel de cryptage de fichier fonctionnant autant avec des images/vidéos qu'avec des fichiers de type '.txt'",
  video:"src/assets/video/PasswordGenerator.mp4",
  duree:"En cours...",
  fonction:"Chiffrement",
  memo:"Vidéo représentant le résultat",
  organisation:"Travail en autonomie",
  tags:["C++","Qt","Linux/Windows","GitHub"], status:"CHIFFREMENT" },


  /////////////////////////
  //////// RÉSEAUX ////////
  /////////////////////////
  { name:"First LAN", picture:"",
  desc:"Création d'un premier réseaux LAN avec une configuration simple.",
  video:"src/assets/video/Network-TCP_IP.mp4",
  duree:"Fonctionnel",
  fonction:"Réseaux",
  memo:"Vidéo représentant le résultat",
  organisation:"Travail en autonomie",
  tags:["Cisco Packet Tracer","Linux","GitHub"], status:"RÉSEAUX" },

  { name:"LAN and DHCP", picture:"",
  desc:"Création d'un réseaux LAN avec un serveur DHCP pour une attribution automatique des adresses IP.",
  video:"src/assets/video/Network-TCP_IP_DHCP.mp4",
  duree:"Fonctionnel",
  fonction:"Réseaux",
  memo:"Vidéo représentant le résultat",
  organisation:"Travail en autonomie",
  tags:["Cisco Packet Tracer","Linux","GitHub"], status:"RÉSEAUX" },

  { name:"LAN, DHCP and DNS", picture:"",
  desc:"Création d'un réseaux LAN avec un serveur DHCP et DNS pour une attribution automatique des adresses IP et une redirection des messages à partir d'un nom qui sera ensuite convertis en adresse IP.",
  video:"src/assets/video/Network-TCP_IP_DHCP_DNS.mp4",
  duree:"Fonctionnel",
  fonction:"Réseaux",
  memo:"Vidéo représentant le résultat",
  organisation:"Travail en autonomie",
  tags:["Cisco Packet Tracer","Linux","GitHub"], status:"RÉSEAUX" },

];



const CERTS = [
  { name:"Autonomie", org:"Travail sur des petit et grand projets", year:2026, color:"#ff3e3e" },
  { name:"Curieuse", org:"Volonté de découvrir de nouvelle chose et méthode", year:2026, color:"#00ff41" },
  { name:"Soif d'apprentissage", org:"S'instruire au fur et à mesure des nouveautés technologique", year:2026, color:"#00d4ff" },
  { name:"Déterminée", org:"Rien est impossible tant que je n'ai pas abandonné", year:2026, color:"#ff9f00" },
];



///////////////////////////////////////////////////////////////////////
//////// CANVAS MATRIX RAIN
///////////////////////////////////////////////////////////////////////
function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01ABCDEFGHIJKLMNOPアイ";
    const fontSize = 13;
    let drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
    const iv = setInterval(() => {
      const cols = Math.floor(canvas.width / fontSize);
      if (drops.length !== cols) drops = Array(cols).fill(1);
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      drops.forEach((y, i) => {
        ctx.fillStyle = i % 7 === 0 ? "#00ff4155" : "#00ff4118";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 45);
    return () => { clearInterval(iv); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, zIndex:0, opacity:0.4, pointerEvents:"none" }} />;
}



///////////////////////////////////////////////////////////////////////
//////// GLITCH TEXT EFFECT
///////////////////////////////////////////////////////////////////////
function GlitchText({ text, style = {} }) {
  const base = { position:"absolute", top:0, left:0, mixBlendMode:"screen" };
  return (
    <span style={{ position:"relative", display:"inline-block", ...style }}>
      <span style={{ color:"#00ff41" }}>{text}</span>
      <span style={{ ...base, color:"#ff003c", animation:"glitch 3s infinite" }}>{text}</span>
      <span style={{ ...base, color:"#00d4ff", animation:"glitch 3s infinite 0.1s" }}>{text}</span>
    </span>
  );
}



///////////////////////////////////////////////////////////////////////
//////// TERMINAL-STYLE CARD
///////////////////////////////////////////////////////////////////////
function TerminalBox({ children, title = "terminal" }) {
  return (
    <div style={{ background:"rgba(0,0,0,0.85)", border:"1px solid #00ff4144", borderRadius:4, overflow:"hidden", fontFamily:"'Share Tech Mono', monospace" }}>
      <div style={{ background:"#0a0a0a", padding:"6px 14px", borderBottom:"1px solid #00ff4133", display:"flex", alignItems:"center", gap:8 }}>
        {["#ff3e3e","#ffb800","#00ff41"].map((c,i) => (
          <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.8, flexShrink:0 }} />
        ))}
        <span style={{ color:"#00ff4166", fontSize:11, marginLeft:8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          ~/portfolio
        </span>
      </div>
      <div style={{ padding:"16px 20px" }}>{children}</div>
    </div>
  );
}



///////////////////////////////////////////////////////////////////////
//////// ANIMATED SKILL BAR
///////////////////////////////////////////////////////////////////////
function SkillBar({ name, level, icon, delay }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(level), 300 + delay * 100); return () => clearTimeout(t); }, [level, delay]);
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
        <span style={{ color:"#ccc", fontSize:13, fontFamily:"'Share Tech Mono', monospace" }}>{icon} {name}</span>
        <span style={{ color:"#00ff41", fontSize:12, fontFamily:"'Share Tech Mono', monospace" }}>{level}%</span>
      </div>
      <div style={{ height:4, background:"#111", borderRadius:2, overflow:"hidden", border:"1px solid #00ff4122" }}>
        <div style={{ height:"100%", width:`${w}%`, background:"linear-gradient(90deg,#00ff41,#00d4ff)", transition:"width 1.2s cubic-bezier(.17,.67,.44,1)", boxShadow:"0 0 8px #00ff4188" }} />
      </div>
    </div>
  );
}



///////////////////////////////////////////////////////////////////////
//////// PROJECT CARD
///////////////////////////////////////////////////////////////////////
function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,255,65,0.04)" : "rgba(0,0,0,0.6)",
        border:`1px solid ${hovered ? "#00ff4166" : "#00ff4122"}`,
        borderRadius:6, padding:"22px 24px", cursor:"pointer",
        transition:"all 0.3s ease", transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 8px 30px #00ff4122" : "none",
        animation:"fadeInUp 0.6s ease both",
        animationDelay:`${delay * 0.12}s`
      }}>

      <div style={{ position:"relative", display:"flex", alignItems:"center", marginBottom:14, minHeight:60 }}>
        <h3 style={{
          position:"absolute", left:0, right:0,
          lineHeight:1.3,
          textAlign:"center", color:"#fff",
          fontFamily:"'Orbitron', sans-serif",
          fontSize:20, margin:"0 0 16px 0",
          wordBreak:"break-word"
          }}>
            {project.name}
        </h3>
      </div>

      <div style={{ display: "flex", gap: 12, flexDirection: "column", marginBottom: 14 }}>

        {project.video && (
          <div style={{ width: "100%" }}>
            <video
              controls
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                borderRadius: 4,
                border: "1px solid #00ff4133",
                display: "block",
                marginBottom:14
              }}
              // poster={project.picture}
            >
              <source src={project.video} type="video/mp4" style={{ width: "100%" }}/>
            </video>
          </div>
        )}

        <p style={{ color:"#888", fontSize:13, lineHeight:1.6, marginTop:5, textAlign:"left" }}>
          Durée du projet : {project.duree}
          <br />
          Organisation du projet : {project.organisation}
          <br />
          Information supplémentaire : {project.memo}
        </p>

        <p style={{ color:"#888", fontSize:13, lineHeight:1.6, margin:"12px 0", textAlign:"left" }}>
          Description :
          <br />
          {project.desc}
        </p>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {project.tags.map(t => (
          <span key={t} style={{ background:"#00ff4111", border:"1px solid #00ff4133", color:"#00ff4199", padding:"2px 8px", fontSize:11, borderRadius:2, fontFamily:"'Share Tech Mono', monospace" }}>{t}</span>
        ))}
      </div>

    </div>
  );
}



/* ══════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════ */
export default function CyberPortfolio() {
  const [activeSection, setActiveSection] = useState("Accueil");
  const [typedText, setTypedText]         = useState("");
  const [showCursor, setShowCursor]       = useState(true);
  const [menuOpen,   setMenuOpen]         = useState(false);
  const fullText = "Pentester Junior & Développeuse";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { if (i < fullText.length) setTypedText(fullText.slice(0, ++i)); else clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  const nav = ["Accueil","Biographie","Skills","Projets"];
  const goTo = s => { setActiveSection(s); setMenuOpen(false); };

  const navBtn = s => ({
    background:"none",
    border: activeSection === s ? "1px solid #00ff41" : "1px solid transparent",
    color: activeSection === s ? "#00ff41" : "#555",
    padding:"5px 14px", fontFamily:"'Share Tech Mono', monospace", fontSize:12,
    cursor:"pointer", textTransform:"uppercase", letterSpacing:1,
    transition:"all 0.2s", borderRadius:2, whiteSpace:"nowrap",
  });

  const infos = [
    {keys: "Nom", value: "Unknown"},
    {keys: "Rôle", value: "Junior Pentester & Programmeuse"},
    {keys: "Localisation", value: "Marseille, FR"},
    {keys: "Expérience", value: "2 Stages en informatique"},
    {keys: "Langages", value: "C, C++, HTML/CSS, Python"},
    {keys: "Apprentissage", value: "Majoritairement en autodidacte"},
    {keys: "Domaines", value: "CTF, Réseaux et Développement"},
    {keys: "GitHub", value: "Le code des projets", links: "https://github.com/create-and-evolution"},
    {keys: "LinkedIn", value: "Profil professionnel", links: "https://www.linkedin.com/in/chafaantie-s-062a6436a/"},
  ];



  /* ── Sections ── */
  const sections = {



    /////////////////////////
    //////// ACCUEIL ////////
    /////////////////////////
    Accueil: (
      <div style={{ minHeight:"80vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"60px 0" }}>
        <div style={{ marginBottom:20, animation:"fadeInUp 0.6s ease both" }}>
          <br /><br /><br /><br />
          <TerminalBox title="whoami">
            <span style={{ color:"#00ff41" }}>$ </span>
            <span style={{ color:"#ccc" }}>whoami</span><br />
            <span style={{ color:"#00d4ff" }}>root@shadownet:~# </span>
            <span style={{ color:"#fff" }}>Unknown</span>
          </TerminalBox>
        </div>

        <div style={{ animation:"fadeInUp 0.7s ease 0.1s both" }}>
          <GlitchText text="Portfolio" style={{ fontSize:"clamp(40px,8vw,96px)", fontFamily:"'Orbitron', sans-serif", fontWeight:900, letterSpacing:4 }} />
        </div>

        <div style={{ minHeight:40, marginTop:8, animation:"fadeInUp 0.7s ease 0.2s both" }}>
          <span style={{ fontFamily:"'Share Tech Mono', monospace", fontSize:"clamp(13px,2.5vw,22px)", color:"#00d4ff" }}>
            {typedText}
          </span>
        </div>
        <br /><br /><br />

        <p style={{ color:"#666", fontSize:"clamp(12px,1.4vw,15px)", fontFamily:"'Share Tech Mono', monospace", maxWidth:560, lineHeight:1.8, marginTop:20, animation:"fadeInUp 0.7s ease 0.3s both" }}>
          // Amatrice en tests d'intrusion et passionnée par l'informatique.<br />
        </p>

        <div className="hero-btns" style={{ display:"flex", gap:16, marginTop:36, flexWrap:"wrap", animation:"fadeInUp 0.7s ease 0.4s both" }}>
          {[
            { label:"> VOIR LES PROJETS", primary:true,  action:"Projets" },
            { label:"> MA BIOGRAPHIE",     primary:false, action:"Biographie" },
          ].map(btn => (
            <button key={btn.label} onClick={() => goTo(btn.action)}
              style={{ padding:"12px 28px", fontFamily:"'Share Tech Mono', monospace", fontSize:13, background: btn.primary ? "#00ff41" : "transparent", color: btn.primary ? "#000" : "#00ff41", border:"1px solid #00ff41", cursor:"pointer", letterSpacing:1, transition:"all 0.2s", borderRadius:2 }}
              onMouseEnter={e => { e.target.style.background = btn.primary ? "#00cc33" : "#00ff4122"; e.target.style.boxShadow = "0 0 16px #00ff4166"; }}
              onMouseLeave={e => { e.target.style.background = btn.primary ? "#00ff41" : "transparent"; e.target.style.boxShadow = "none"; }}
            >{btn.label}</button>
          ))}
        </div>

        <div className="stats-row" style={{ display:"flex", gap:32, marginTop:60, flexWrap:"wrap", animation:"fadeInUp 0.7s ease 0.5s both" }}>
          {[["4 ans","Informatique"], ["4", "Langage maîtrisé"], ["2", "Nombre de stage"], ["5", "Projets crées et complet"]].map(([val,label]) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"clamp(16px,3vw,22px)", color:"#00ff41", fontWeight:700 }}>{val}</div>
              <div style={{ fontFamily:"'Share Tech Mono', monospace", fontSize:11, color:"#555", marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),



    //////////////////////////
    //////// À PROPOS ////////
    //////////////////////////
    Biographie: (
      <div style={{ padding:"60px 0", animation:"fadeInUp 0.6s ease both" }}>
        <h2 style={{ fontFamily:"'Orbitron', sans-serif", color:"#00ff41", fontSize:"clamp(18px,4vw,28px)", marginBottom:8 }}>BIOGRAPHIE</h2>
        <div style={{ color:"#00ff4144", fontFamily:"'Share Tech Mono', monospace", fontSize:12, marginBottom:36 }}>══════════════════════════════════════════</div>
        <div className="grid-2">
          <TerminalBox title="bio.txt">
            <div style={{ color:"#ccc", fontSize:13, lineHeight:1.9 }}>
              <span style={{ color:"#00ff41" }}>$ </span>cat biographie.txt<br /><br />
              {infos.map(({ keys, value, links }) => (
                <div key={keys} style={{ marginBottom:4 }}>
                  <span style={{ color:"#00d4ff" }}>{keys}: </span>
                  <a style={{ color:"#fff", wordBreak:"break-word", textDecoration: "none"}} href={links}>{value}</a>
                </div>
              ))}
              <br />
              <span style={{ color:"#666" }}>
                Passionné de sécurité offensive depuis quelques mois,
                je souhaite me spécialiser dans les tests d'intrusion avancés et
                la recherche de vulnérabilités critiques.
              </span>
            </div>
          </TerminalBox>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <TerminalBox title="neofetch">
              <div style={{ color:"#ccc", fontSize:12 }}>
                <span style={{ color:"#00ff41" }}>$ </span>neofetch<br /><br />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
                  <pre
                    style={{
                      color: "#00d4ff",
                      marginLeft: -112,
                      marginTop: -15,
                      fontFamily: "monospace",
                      lineHeight: 1.1,
                      userSelect: "none",
                    }}
                  >
                {`
                ^
                  | |
                  @#####@
                    (###   ###)-.
                  .(###     ###) \\
                  /  (###   ###)   )
                (=-  .@#####@|_--"
              /\\    \\_|l|_/ (\\
             (=-\\     |l|    /
             \\  \\.___|l|___/
             /\\      |_|   /
             (=-\\._________/\\
             \\             /
              \\._________/
                #  ----  #
                #   __   #
                \\########/
                `}
                  </pre>
                  <div>
                    {[
                      ["OS", "Linux, Windows 10"],
                      ["Shell", "Bash, Zsh"],
                      ["Machine", "Oracle VirtualBox"],
                      ["Editeur", "VS Code, Emacs, Nano"],
                      ["Bureautique", "Microsoft Office, LibreOffice"],
                      ["Pentesting", "TryHackMe, HackTheBox, RootMe"],
                      ["Réseaux", "Cisco Networking Academy"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ marginBottom: 7, textAlign: "left" }}>
                        &emsp;&emsp;
                        <span style={{ color: "#00d4ff", display: "inline-block", width: 100 }}>
                          {k}:
                        </span>
                        <span style={{ color: "#aaa" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </TerminalBox>
          </div>
        </div>
      </div>
    ),



    ////////////////////////
    //////// SKILLS ////////
    ////////////////////////
    Skills: (
      <div style={{ padding:"60px 0", animation:"fadeInUp 0.6s ease both" }}>
        <h2 style={{ fontFamily:"'Orbitron', sans-serif", color:"#00ff41", fontSize:"clamp(18px,4vw,28px)", marginBottom:8 }}>COMPÉTENCES</h2>
        <div style={{ color:"#00ff4144", fontFamily:"'Share Tech Mono', monospace", fontSize:12, marginBottom:36 }}>══════════════════════════════════════════</div>
        <TerminalBox title="Skills --list">
          <div style={{ color:"#00ff41", fontSize:12, marginBottom:20, fontFamily:"'Share Tech Mono', monospace" }}>
            $ ./skill_scan.py --target=self --output=progress
          </div>
          <div className="Skills-grid">
            {SKILLS.map((s,i) => <SkillBar key={s.name} {...s} delay={i} />)}
          </div>
        </TerminalBox>
        <div className="grid-3" style={{ marginTop:24 }}>
          {[
            { title: "Logiciels", items:["Canva", "Trello", "Git/GitHub", "LibreOffice", "Packet Tracer", "Microsoft Office"]},
            { title: "Langage de programmation", items:["C", "C++", "Python", "HTML/CSS"]},
            { title:"Plateformes", items:["Root Me", "Try Hack me", "Hack The Box", "Cisco Networking Academy"] },
            { title:"Langues", items:["Français", "Anglais", "Espagnol"] },
          ].map(cat => (
            <TerminalBox key={cat.title} title={cat.title.toLowerCase()}>
              <div style={{ color:"#00ff41", fontSize:12, marginBottom:10, fontFamily:"'Share Tech Mono', monospace" }}>[{cat.title}]</div>
              {cat.items.map(item => (
                <div key={item} style={{ color:"#888", fontSize:12, fontFamily:"'Share Tech Mono', monospace", marginBottom:5 }}>
                  <span style={{ color:"#00ff4155" }}>▸ </span>{item}
                </div>
              ))}
            </TerminalBox>
          ))}
        </div>
      </div>
    ),



    /////////////////////////////////
    //////// SECTION PROJETS ////////
    /////////////////////////////////
    Projets: (
      <div style={{ padding:"60px 0", animation:"fadeInUp 0.6s ease both" }}>
        <h2 style={{ fontFamily:"'Orbitron', sans-serif", color:"#00ff41", fontSize:"clamp(18px,4vw,28px)", marginBottom:8 }}>PROJETS</h2>
        <div style={{ color:"#00ff4144", fontFamily:"'Share Tech Mono', monospace", fontSize:12, marginBottom:36 }}>══════════════════════════════════════════</div>

        {(() => {
          // 1. Définir l'ordre et la couleur de chaque catégorie
          const CATEGORIES = [
            { key: "RÉSEAUX", label: "Réseaux", color: "#ff0000", icon: "🖧" },
            { key: "CHIFFREMENT", label: "Chiffrement", color: "#ffb800", icon: "🔐" },
            { key: "JEUX VIDÉO", label: "Jeux Vidéo", color: "#00ff41", icon: "🎮" },
            { key: "ALGORITHMIE", label: "Algorithmie", color: "#00d4ff", icon: "🔷" },
          ];

          // 2. Grouper les projets par status
          const grouped = PROJECTS.reduce((acc, p) => {
            acc[p.status] = acc[p.status] ? [...acc[p.status], p] : [p];
            return acc;
          }, {});

          // 3. Afficher chaque catégorie + ses projets
          return CATEGORIES.map(cat => {
            const projects = grouped[cat.key];
            if (!projects?.length) return null;
            return (
              <div key={cat.key} style={{ marginBottom: 48 }}>
                {/* Titre de catégorie */}
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                  <span style={{ fontSize:18 }}>{cat.icon}</span>
                  <span style={{ fontFamily:"'Orbitron', sans-serif", color: cat.color, fontSize:"clamp(20px,2.5vw,18px)", fontWeight:700, letterSpacing:2 }}>
                    {cat.label}
                  </span>
                  <div style={{ flex:1, height:"1px", background:`${cat.color}33` }} />
                  <span style={{ fontFamily:"'Share Tech Mono', monospace", color:`${cat.color}66`, fontSize:11 }}>
                    {projects.length} projet{projects.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Projets de cette catégorie */}
                <div className="Projets-grid">
                  {projects.map((p, i) => <ProjectCard key={p.id} project={p} delay={i} />)}
                </div>
              </div>
            );
          });
        })()}
      </div>
    ),

  };



  return (
    <>
      <style>{glitchKeyframes}</style>
      <div style={{ minHeight:"100vh", background:"#050505", color:"#ccc", position:"relative", overflowX:"hidden" }}>
        <MatrixRain />
        {/* Scanlines */}
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)", pointerEvents:"none", zIndex:1 }} />

        {/* ── Navbar ── */}
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(5,5,5,0.92)", borderBottom:"1px solid #00ff4122", backdropFilter:"blur(10px)", padding:"14px 0" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <GlitchText text="CyberForge" style={{ fontFamily:"'Orbitron', sans-serif", fontSize:18, fontWeight:700, cursor:"pointer" }} />

            {/* Desktop */}
            <div className="nav-links">
              {nav.map(s => (
                <button key={s} onClick={() => goTo(s)} style={navBtn(s)}
                  onMouseEnter={e => { if (activeSection !== s) e.target.style.color = "#aaa"; }}
                  onMouseLeave={e => { if (activeSection !== s) e.target.style.color = "#555"; }}
                >{s}</button>
              ))}
            </div>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
              style={{ background:"none", border:"1px solid #00ff4144", color:"#00ff41", padding:"6px 12px", cursor:"pointer", fontFamily:"'Share Tech Mono', monospace", fontSize:16, borderRadius:2 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile dropdown */}
          <div className={`mobile-menu${menuOpen ? " open" : ""}`}
            style={{ gap:2, padding:"10px 20px 14px", borderTop:"1px solid #00ff4122" }}>
            {nav.map(s => (
              <button key={s} onClick={() => goTo(s)}
                style={{ ...navBtn(s), textAlign:"left", width:"100%", padding:"10px 14px" }}>
                {s}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Content ── */}
        <main style={{ maxWidth:1100, margin:"0 auto", padding:"80px 20px 40px", position:"relative", zIndex:10 }}>
          {sections[activeSection]}
        </main>

        {/* ── Footer ── */}
        <footer style={{ borderTop:"1px solid #00ff4111", padding:"20px", textAlign:"center", fontFamily:"'Share Tech Mono', monospace", fontSize:11, color:"#333", position:"relative", zIndex:10 }}>
          <span style={{ color:"#00ff4144" }}>root@shadownet</span>
          <span style={{ color:"#333" }}>:~# </span>
          <span>© 2026 Unknown — All systems secured. No unauthorized access.</span>
        </footer>
      </div>
    </>
  );
}
