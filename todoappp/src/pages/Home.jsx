import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Todo Planner</h1>
      <p style={styles.subtitle}>Organize your day with ease.</p>
      <div>
        <Link to="/signin" style={styles.button}>Sign In</Link>
        <Link to="/signup" style={{ ...styles.button, backgroundColor: '#6c63ff' }}>Sign Up</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '100px',
    backgroundColor: '#99a3adff',
    height: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    color: '#555',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '5px',
    margin: '0 10px',
    fontSize: '1rem',
  },
};
