export default function Contact() {
  return (
    <main style={{padding: "40px 20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial"}}>
      <h1 style={{fontSize: "32px", color: "#2563eb", marginBottom: "20px"}}>Contact Us</h1>
      <p style={{fontSize: "16px", marginBottom: "20px"}}>Have news tips or feedback? We'd love to hear from you!</p>
      
      <div style={{background: "#f3f4f6", padding: "20px", borderRadius: "12px"}}>
        <p><b>Email:</b> contact@pulse360.in</p>
        <p><b>Location:</b> ELURU, ANDHRA PRADESH, India</p>
        <p><b>WhatsApp:</b> +91 7842452277</p>
      </div>

      <a href="/" style={{display: "inline-block", marginTop: "20px", background: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none"}}>← Back to Home</a>
    </main>
  )
}
