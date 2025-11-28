import React, { useState } from 'react';

const DeliveryMethodSMSPOC = ({ onBack, onSuccess }) => {
    const [guestPhone, setGuestPhone] = useState('');
    const [smsStatus, setSmsStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const roomCode = 'R1038';

    const sendSmsAction = async () => {
        if (!guestPhone) {
            setSmsStatus('Please enter a phone number.');
            return;
        }

        setIsLoading(true);
        setSmsStatus('Sending...');

        try {
            const response = await fetch('https://kioskhtl.netlify.app/.netlify/functions/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: guestPhone,
                    roomCode: roomCode,
                }),
            });

            if (response.ok) {
                setSmsStatus('SMS sent to your phone.');
                if (onSuccess) onSuccess('SMS sent to your phone.');
            } else {
                setSmsStatus('Error sending SMS. Please try again.');
                if (onSuccess) onSuccess('Error sending SMS. Please try again.', true); // true for error
            }
        } catch (error) {
            console.error('SMS Error:', error);
            setSmsStatus('Error sending SMS. Please try again.');
            if (onSuccess) onSuccess('Error sending SMS. Please try again.', true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sms-poc-scene">
            <header className="header">
                <div className="logo">THE CROMWELL</div>
                <h1>Send to your phone</h1>
                <p className="subheader">Enter your mobile number to receive your room details</p>
            </header>

            <div className="sms-card">
                <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                    />
                </div>

                <button
                    className="primary-btn"
                    onClick={sendSmsAction}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send SMS'}
                </button>

                <button className="back-btn" onClick={onBack}>
                    Back
                </button>

                <div className="status-text">
                    {smsStatus}
                </div>
            </div>

            <style>{`
        .sms-poc-scene {
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
        .sms-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: var(--card-shadow);
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            text-align: left;
            gap: 0.5rem;
        }
        .input-group label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: 500;
        }
        input {
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            width: 100%;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: var(--cromwell-purple);
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
        }
        .primary-btn:hover {
            background-color: #5a003b;
        }
        .primary-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        .back-btn {
            background: none;
            border: 1px solid #ddd;
            padding: 0.8rem;
            border-radius: 8px;
            color: var(--text-secondary);
            font-size: 1rem;
            cursor: pointer;
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

export default DeliveryMethodSMSPOC;
