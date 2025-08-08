export default function ForgePage() {
  return (
    <div style={{
      backgroundColor: '#ff0000',
      color: '#ffff00',
      padding: '50px',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '48px',
        marginBottom: '20px',
        textShadow: '3px 3px 0px #000'
      }}>
        🚀 FORGE MVP IS WORKING! 🚀
      </h1>
      <p style={{
        fontSize: '24px',
        marginBottom: '10px'
      }}>
        This is our custom page content!
      </p>
      <p style={{
        fontSize: '18px',
        marginBottom: '20px'
      }}>
        If you see this bright red page with yellow text, our custom page is working!
      </p>
      <div style={{
        backgroundColor: '#00ff00',
        color: '#000000',
        padding: '20px',
        borderRadius: '10px',
        border: '5px solid #0000ff'
      }}>
        <p style={{margin: 0, fontSize: '20px'}}>
          ✅ SUCCESS! Custom page is being served! ✅
        </p>
      </div>
      <p style={{
        fontSize: '14px',
        marginTop: '30px',
        color: '#ffffff'
      }}>
        Timestamp: {new Date().toLocaleString()}
      </p>
    </div>
  );
}
