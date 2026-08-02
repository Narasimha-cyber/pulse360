export default function About() {
  return (
    <main style={{padding: "40px 20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial"}}>
      <h1 style={{fontSize: "32px", color: "#2563eb", marginBottom: "20px"}}>About Pulse360 🇮🇳</h1>
      <p style={{fontSize: "16px", lineHeight: "1.7", marginBottom: "15px"}}>
        Pulse360 is a real-time news platform built to keep Indians updated in 60 seconds. 
        We bring you latest news from Politics, Sports, Technology, Business and especially Telangana.
      </p>
      <p style={{fontSize: "16px", lineHeight: "1.7", marginBottom: "15px"}}>
        Our mission is simple: <b>Fast, Accurate, Unbiased News</b>. No clickbait, No drama. 
        Just news that matters to you.
      </p>
      <p style={{fontSize: "16px", lineHeight: "1.7"}}>
        Built with ❤️ in ELURU, ANDHRA PRADESH using Next.js and NewsAPI.
      </p>
      <a href="/" style={{display: "inline-block", marginTop: "20px", background: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none"}}>← Back to Home</a>
    </main>
  )
}
