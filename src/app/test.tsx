export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          🚀 SIPBrewery Test
        </h1>
        <p style={{ fontSize: '1.5rem' }}>
          If you can see this, the setup is working!
        </p>
      </div>
    </div>
  );
}
