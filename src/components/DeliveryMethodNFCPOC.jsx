import React, { useState } from 'react';

const DeliveryMethodNFCPOC = ({ onBack, onSuccess }) => {
    const [nfcStatus, setNfcStatus] = useState('Ready to scan');
    const [isScanning, setIsScanning] = useState(false);

    const startNfcAction = async () => {
        if ('NDEFReader' in window) {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();
                setIsScanning(true);
                setNfcStatus('Scanning... Hold your phone near the reader.');

                ndef.onreading = event => {
                    // In a real scenario, we would parse the payload.
                    // For POC, any tag is good.
                    setNfcStatus('NFC tap detected. Room details delivered.');
                    setIsScanning(false);
                    if (onSuccess) onSuccess('NFC tap detected. Room details delivered.');
                };

                ndef.onreadingerror = () => {
                    setNfcStatus('Error reading NFC tag. Please try again.');
                    setIsScanning(false);
                };

            } catch (error) {
                console.error("NFC Error:", error);
                setNfcStatus(`Error: ${error.message}`);
                setIsScanning(false);
            }
        } else {
            setNfcStatus('Web NFC not supported on this device.');
        }
    };

    const simulateNfcTapAction = () => {
        setNfcStatus('Simulated NFC tap. Room details delivered.');
        // Small delay to show the message before transition
        setTimeout(() => {
            if (onSuccess) onSuccess('Simulated NFC tap. Room details delivered.');
        }, 1000);
    };

    return (
        <div className="nfc-poc-scene">
            <header className="header">
                <div className="logo">THE CROMWELL</div>
                <h1>Tap with your phone</h1>
                <p className="subheader">Hold your phone near the NFC reader</p>
            </header>

            <div className="nfc-card">
                <div className="nfc-illustration">
                    <span className="nfc-icon">📡</span>
                    <div className="wave-animation"></div>
                </div>

                <button
                    className="primary-btn"
                    onClick={startNfcAction}
                    disabled={isScanning}
                >
                    {isScanning ? 'Scanning...' : 'Start NFC tap'}
                </button>

                <button
                    className="secondary-btn"
                    onClick={simulateNfcTapAction}
                >
                    Simulate tap
                </button>

                <button className="back-btn" onClick={onBack}>
                    Back
                </button>

                <div className="status-text">
                    {nfcStatus}
                </div>
            </div>

            <style>{`
        .nfc-poc-scene {
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
        .nfc-card {
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
        .nfc-illustration {
            width: 150px;
            height: 150px;
            background-color: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            position: relative;
            margin-bottom: 1rem;
        }
        .primary-btn {
            background-color: var(--cromwell-purple);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            transition: background-color 0.2s;
            width: 100%;
        }
        .primary-btn:hover {
            background-color: #5a003b;
        }
        .primary-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        .secondary-btn {
            background-color: transparent;
            color: var(--cromwell-purple);
            border: 2px solid var(--cromwell-purple);
            padding: 1rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            width: 100%;
            transition: background-color 0.2s;
        }
        .secondary-btn:hover {
            background-color: rgba(122, 0, 80, 0.05);
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
        .status-text {
            font-family: monospace;
            color: var(--text-secondary);
            font-size: 0.8rem;
            min-height: 1.2em;
            text-align: center;
        }
      `}</style>
        </div>
    );
};

export default DeliveryMethodNFCPOC;
