import React, { useEffect, useState } from 'react';
import { attach } from '@adobe/uix-guest';
import { extensionId } from './Constants';

export default function App() {
  const [context, setContext] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initUIX() {
      try {
        const conn = await attach({ id: extensionId });

        // Fetch Workfront context from sharedContext
        const ctx = conn?.sharedContext;
        const getVal = (key) => (typeof ctx?.get === 'function' ? ctx.get(key) : ctx?.[key]);

        const objID = getVal('objID') || getVal('objectID');
        const objCode = getVal('objCode') || 'Unknown';
        const hostname = getVal('hostname') || window.location.hostname;

        setContext({ objID, objCode, hostname });
      } catch (err) {
        console.error('Workfront UIX attach failed:', err);
        setError(err.message);
      }
    }

    initUIX();
  }, []);

  if (error) {
    return (
      <div style={{ padding: '24px', fontFamily: 'sans-serif', color: '#dc2626' }}>
        <h3>Error Attaching Extension</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', maxWidth: '600px' }}>
        <h2 style={{ margin: '0 0 12px 0', color: '#111827' }}>👋 Hello World from Workfront UIX!</h2>
        <p style={{ color: '#4b5563', margin: '0 0 20px 0' }}>
          The UI extension handshake succeeded and the iframe is mounted cleanly.
        </p>

        <div style={{ backgroundColor: '#f3f4f6', borderRadius: '6px', padding: '16px', fontSize: '14px' }}>
          <div><strong>Object Type:</strong> {context?.objCode || 'Reading...'}</div>
          <div style={{ marginTop: '8px' }}><strong>Object ID:</strong> {context?.objID || 'Reading...'}</div>
          <div style={{ marginTop: '8px' }}><strong>Host:</strong> {context?.hostname || 'Reading...'}</div>
        </div>
      </div>
    </div>
  );
}