import React from 'react';

type Props = {
    name: string;
};

const WelcomeMessage = (props: Props) => {
    const currentTime = new Date();
    const greeting = currentTime.getHours() < 12 ? "Good morning" : "Good afternoon";

    return (
        <div className="text-blue-700">
            {greeting}, {props.name}!
        </div>
    );
};

export default WelcomeMessage;