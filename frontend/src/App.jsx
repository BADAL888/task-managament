import React, { useState, useEffect } from 'react';
import DirectiveCreator from './components/DirectiveCreator';
import DirectiveView from './components/DirectiveView';
import { getTasks } from './services/api';
import './App.css';

const NavigationHub = () => (
  <nav className="side-hub">
    <div className="hub-logo">OC<span>I</span></div>
    <div className="hub-links">
      <div className="hub-item active"><i className="icon-grid"></i></div>
      <div className="hub-item"><i className="icon-plus"></i></div>
      <div className="hub-item"><i className="icon-stats"></i></div>
      <div className="hub-item"><i className="icon-user"></i></div>
    </div>
    <div className="hub-footer">
      <div className="avatar"></div>
    </div>
  </nav>
);

function App() {
  const [registry, setRegistry] = useState([]);
  const [isSyncing, setIsSyncing] = useState(true);

  const synchronizeRegistry = async () => {
    try {
      const result = await getTasks();
      setRegistry(result.data);
    } catch (err) {
      console.error('Registry link failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    synchronizeRegistry();
  }, []);

  return (
    <div className="mission-control">
      <NavigationHub />
      
      <main className="main-viewport">
        <header className="viewport-header">
          <h1>Mission Registry</h1>
          <div className="header-meta">
            <span>Operational Mode: Active</span>
            <span className="timestamp">{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <section className="viewport-content">
          <DirectiveCreator onMissionInjected={synchronizeRegistry} />
          
          <div className="registry-section">
            <header className="section-title">
              <h2>Active Directives</h2>
              <div className="count-badge">{registry.length}</div>
            </header>
            
            {isSyncing ? (
              <div className="sync-overlay">Linking with Neural Grid...</div>
            ) : (
              <DirectiveView items={registry} onOperationUpdate={synchronizeRegistry} />
            )}
          </div>
        </section>
      </main>

      <div className="ambient-blob b1"></div>
      <div className="ambient-blob b2"></div>
    </div>
  );
}

export default App;
