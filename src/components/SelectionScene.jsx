import React from 'react';

const SelectionScene = ({ onSelectMethod, onExit }) => {
  const cards = [
    {
      id: 'sms',
      title: 'Send an SMS',
      description: 'Send the room number and directions to my phone',
      imageColor: '#e0e0e0', // Placeholder color
      action: () => onSelectMethod('sms'),
      icon: '📱' // Placeholder icon
    },
    {
      id: 'qr',
      title: 'Scan a QR code',
      description: 'Scan to see the room number and directions',
      imageColor: '#c0c0c0', // Placeholder color
      action: () => onSelectMethod('qr'),
      icon: '🔳' // Placeholder icon
    },
    {
      id: 'nfc',
      title: 'Tap with my phone',
      description: 'Use NFC to receive the room number',
      imageColor: '#d0d0d0', // Placeholder color
      action: () => onSelectMethod('nfc'),
      icon: '📡' // Placeholder icon
    }
  ];

  return (
    <div className="selection-scene">
      <header className="header">
        <div className="logo">THE CROMWELL</div>
        <h1>Your key is ready</h1>
        <p className="subheader">Choose how to receive your room number</p>
      </header>

      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="card" onClick={card.action}>
            <div className="card-image" style={{ backgroundColor: card.imageColor }}>
              <span className="card-icon">{card.icon}</span>
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="card-footer">
                <span className="tag">Primary Guest</span>
                <button className="add-btn">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="exit-btn" onClick={onExit}>EXIT SESSION</button>

      <style>{`
        .selection-scene {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }
        .header {
          margin-bottom: 1rem;
        }
        .logo {
          font-size: 0.8rem;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          font-weight: bold;
          color: #666;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          color: var(--text-primary);
        }
        .subheader {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        .cards-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          width: 300px;
          box-shadow: var(--card-shadow);
          transition: transform 0.2s;
          cursor: pointer;
          text-align: left;
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .card-image {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }
        .card-content {
          padding: 1.5rem;
        }
        .card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
        }
        .card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .tag {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .add-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #f0f0f0;
          color: #666;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exit-btn {
          margin-top: 2rem;
          padding: 1rem 3rem;
          background-color: #A91E2C; /* Reddish color from screenshot */
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
};

export default SelectionScene;
