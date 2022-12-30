import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import MessageText from './MessageText';

export default function Message({ message }) {
  const user = useSelector((state) => state.user);

  const isMyMessage = useMemo(
    () => user.id === message.postedBy.id,
    [user.id, message.postedBy.id]
  );
  return <React.Fragment>
    <MessageText
        message={message}
        isMyMessage={isMyMessage}
    />
  </React.Fragment>;
}
