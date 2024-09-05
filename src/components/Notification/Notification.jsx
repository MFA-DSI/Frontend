import React from 'react';
import { List, Typography } from 'antd';

export const NotificationComponents = () => {
    const notifications = [
        "Vous avez un nouveau message.",
        "Votre rapport a été généré.",
    ];

    return (
        <div>
            <Typography.Title level={2}>Notifications</Typography.Title>
            <List
                bordered
                dataSource={notifications}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
        </div>
    );
};
