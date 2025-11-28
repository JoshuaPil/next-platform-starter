import React, { useState, useEffect } from 'react';
import SelectionScene from './components/SelectionScene';
import RoomKeyScene from './components/RoomKeyScene';
import DeliveryMethodSMSPOC from './components/DeliveryMethodSMSPOC';
import DeliveryMethodQRPOC from './components/DeliveryMethodQRPOC';
import DeliveryMethodNFCPOC from './components/DeliveryMethodNFCPOC';
import { supabase } from './supabaseClient';

function App() {
  const [scene, setScene] = useState('selection'); // 'selection' | 'key' | 'sms-poc' | 'qr-poc' | 'nfc-poc'
  const [toast, setToast] = useState(null);

  // Global Variables
  const [roomCode, setRoomCode] = useState('R1038');
  const [roomNumber, setRoomNumber] = useState('1038');
  const [hotelName, setHotelName] = useState('The Cromwell');
  const [directions, setDirections] = useState('Take the north elevators to floor 10, room at the end of the hall on the right.');
  const [guestPhone, setGuestPhone] = useState('');
  const [smsStatus, setSmsStatus] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [nfcStatus, setNfcStatus] = useState('Ready to scan');

  const showToast = (message, duration = 3000) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const handleTransitionToKey = async () => {
    // Fetch room details from Supabase
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('room_number, directions')
        .eq('room_code', roomCode)
        .single();

      if (error) {
        console.warn('Supabase fetch error:', error.message);
        // Fallback to defaults or Netlify function if needed
      } else if (data) {
        if (data.room_number) setRoomNumber(data.room_number);
        if (data.directions) setDirections(data.directions);
      }
    } catch (err) {
      console.error('Unexpected error fetching from Supabase:', err);
    }

    setScene('key');
  };

  const handleSelectMethod = (method) => {
    switch (method) {
      case 'sms':
        setScene('sms-poc');
        break;
      case 'nfc':
        setScene('nfc-poc');
        break;
      case 'qr':
        setScene('qr-poc');
        break;
      default:
        break;
    }
  };

  const handleSmsSuccess = (message, isError = false) => {
    showToast(message);
    setSmsStatus(message);
    if (!isError) {
      setTimeout(handleTransitionToKey, 2000);
    }
  };

  const handleNfcSuccess = (message) => {
    setNfcStatus(message);
    handleTransitionToKey();
  };

  const handleReset = () => {
    setScene('selection');
    setSmsStatus('');
    setQrImageUrl('');
    setNfcStatus('Ready to scan');
    setGuestPhone('');
  };

  return (
    <div className="app-container">
      {scene === 'selection' && (
        <SelectionScene
          onSelectMethod={handleSelectMethod}
          onExit={handleReset}
        />
      )}

      {scene === 'sms-poc' && (
        <DeliveryMethodSMSPOC
          onBack={() => setScene('selection')}
          onSuccess={handleSmsSuccess}
        />
      )}

      {scene === 'qr-poc' && (
        <DeliveryMethodQRPOC
          onBack={() => setScene('selection')}
          onToast={showToast}
          onContinue={handleTransitionToKey}
        />
      )}

      {scene === 'nfc-poc' && (
        <DeliveryMethodNFCPOC
          onBack={() => setScene('selection')}
          onSuccess={handleNfcSuccess}
        />
      )}

      {scene === 'key' && (
        <RoomKeyScene
          roomNumber={roomNumber}
          guestName="Primary Guest"
          hotelName={hotelName}
          directions={directions}
          onDone={handleReset}
        />
      )}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      <style>{`
        .app-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          animation: fadeIn 0.3s ease-out;
          z-index: 100;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}

export default App;
