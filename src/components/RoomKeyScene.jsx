import React from 'react';

const RoomKeyScene = ({ roomNumber, guestName, hotelName, directions, onDone }) => {
  return (
    <div className="room-key-scene">
      <div className="wallet-card">
        <div className="card-top">
          <div className="logo-container">
            <div className="logo-circle">
              <span>MW</span>
            </div>
            <div className="logo-text">
              <span className="the">THE</span>
              <span className="cromwell">CROMWELL</span>
              <span className="sub">A CAESARS REWARDS DESTINATION</span>
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* Background pattern */}
        </div>

        <div className="card-text-content">
          <div className="label">Your Room Number</div>
          <div className="room-number">{roomNumber}</div>
          <div className="divider"></div>
          <div className="directions">{directions}</div>
        </div>

        <div className="card-footer-pill">
          {guestName}
        </div>
      </div>

      <button className="done-btn" onClick={onDone}>Done</button>

      <style>{`
        .room-key-scene {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          padding: 2rem;
          background: linear-gradient(135deg, #2e001f 0%, #5a003b 100%); /* Dark plum gradient */
          color: white;
          box-sizing: border-box;
        }
        .wallet-card {
          width: 744px;
          height: 400px;
          background-color: var(--cromwell-purple);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          /* Damask pattern simulation */
          background-image: 
            radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 30%);
        }
        
        .logo-container {
          position: absolute;
          top: 40px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .logo-circle {
          width: 50px;
          height: 50px;
          border: 2px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }
        .the {
          font-size: 0.8rem;
          letter-spacing: 2px;
        }
        .cromwell {
          font-size: 1.5rem;
          letter-spacing: 4px;
          font-weight: 300;
        }
        .sub {
          font-size: 0.5rem;
          letter-spacing: 1px;
          opacity: 0.8;
          margin-top: 4px;
        }

        .card-text-content {
          text-align: center;
          z-index: 2;
          margin-top: 40px;
        }

        .label {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .room-number {
          font-size: 6rem;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 1.5rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .divider {
          width: 100px;
          height: 1px;
          background: rgba(255,255,255,0.3);
          margin: 0 auto 1.5rem auto;
        }

        .directions {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 80%;
          margin: 0 auto;
          line-height: 1.4;
        }
        
        .card-footer-pill {
            position: absolute;
            bottom: 30px;
            right: 40px;
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            backdrop-filter: blur(5px);
        }

        .done-btn {
            margin-top: 3rem;
            padding: 1rem 4rem;
            background-color: white;
            color: var(--cromwell-purple);
            border: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        .done-btn:hover {
            transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default RoomKeyScene;
