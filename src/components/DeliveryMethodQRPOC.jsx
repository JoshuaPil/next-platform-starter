import React, { useState } from 'react';

const DeliveryMethodQRPOC = ({ onBack, onToast, onContinue }) => {
    const [qrImageUrl, setQrImageUrl] = useState('');
    const roomCode = 'R1038';

    const generateQR = () => {
        const targetUrl = `https://kioskhtl.netlify.app/.netlify/functions/room-info?code=${roomCode}`;
        const encodedTarget = encodeURIComponent(targetUrl);
        const chartUrl = `https://quickchart.io/qr?text=${encodedTarget}&size=240`;

        setQrImageUrl(chartUrl);
        if (onToast) onToast('QR code generated. Scan with your phone.');
    };

    return (
        <div className="qr-poc-scene">
            <header className="header">
                <div className="logo">THE CROMWELL</div>
                <h1>Scan with your phone</h1>
                <p className="subheader">Scan the QR code to see your room number and directions</p>
            </header>

            <div className="qr-card">
                <div className="qr-placeholder">
                    {qrImageUrl ? (
                        <img src={qrImageUrl} alt="Room QR Code" className="qr-image" />
                    ) : (
                        <div className="placeholder-text">QR Code will appear here</div>
                    )}
                </div>

                {qrImageUrl && (
                    <div className="scan-instruction">Use your camera or wallet app to scan</div>
                )}

                {!qrImageUrl ? (
                    <button
                        className="primary-btn"
                        onClick={generateQR}
                    >
                        Generate QR code
                    </button>
                ) : (
                    <button
                        className="primary-btn"
                        onClick={onContinue}
                    >
                        Continue
                    </button>
                )}

                <button className="back-btn" onClick={onBack}>
                    Back
                </button>
            </div>

            <style>{`
        .qr-poc-scene {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
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
        .qr-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: var(--card-shadow);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .qr-placeholder {
            width: 240px;
            height: 240px;
            background-color: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            overflow: hidden;
        }
        .placeholder-text {
            color: #999;
            font-size: 0.9rem;
        }
        .qr-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: white;
            padding: 10px; /* Margin around QR */
            box-sizing: border-box;
        }
        .scan-instruction {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        .primary-btn {
            background-color: var(--cromwell-purple);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            transition: background-color 0.2s;
            width: 100%;
        }
        .primary-btn:hover {
            background-color: #5a003b;
        }
        .back-btn {
            background: none;
            border: 1px solid #ddd;
            padding: 0.8rem;
            border-radius: 8px;
            color: var(--text-secondary);
            font-size: 1rem;
            cursor: pointer;
            width: 100%;
        }
      `}</style>
        </div>
    );
};

export default DeliveryMethodQRPOC;
