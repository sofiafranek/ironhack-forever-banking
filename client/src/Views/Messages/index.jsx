import React from 'react';

import Layout from '../../Components/Layout';
import Message from '../../Components/Message';

const Messages = () => {
  return (
    <div>
      <Layout>
        <h1 className="pb-3">Messages</h1>
        <Message />
      </Layout>
    </div>
  );
};

export default Messages;
