// NotificationComponents.jsx
import React, { useState } from 'react';
import { Card, Button, Typography } from 'antd';

const { Title } = Typography;

export const NotificationComponents = () => {
  const initialNotifications = [
    "Vous avez un nouveau message.",
    "Votre rapport a été généré.",
    "Vous avez un rappel de réunion.",
    "Votre mot de passe a été mis à jour.",
    // Add more initial notifications as needed
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    // Simulate loading more notifications
    const moreNotifications = [
      "Un utilisateur a commenté votre publication.",
      "Vous avez été ajouté à un groupe.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
      "Votre demande de connexion a été acceptée.",
    ];
    "Votre demande de connexion a été acceptée.",
    setNotifications([...notifications, ...moreNotifications]);
    setShowMore(true); // Indicate that more notifications have been loaded
  };

  return (
    
      <div style={{ marginTop: '60px' }}> {/* Margin to avoid overlap with title */}
        {notifications.map((notification, index) => (
          <Card 
            key={index} 
            bordered 
            style={{ width: '100%', marginBottom: '16px' }} // Full width and margin between cards
            hoverable
          >
            <p>{notification}</p>
          </Card>
        ))}
        {!showMore && (
          <Button type="primary" onClick={handleShowMore} style={{ marginTop: '16px' }}>
            Voir Plus
          </Button>
        )}
      </div>
  );
};