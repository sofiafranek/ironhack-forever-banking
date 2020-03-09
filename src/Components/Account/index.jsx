import React from 'react';
import './style.scss';

import Card from 'react-bootstrap/Card';

const Account = () => {
  return (
    <div>
      <section>
        <Card className="hvr-grow account">
          <Card.Header>
            <h4>Account Name</h4>
            <h5>Account Amount</h5>
          </Card.Header>
        </Card>
        <Card className="hvr-grow account">
          <Card.Header>
            <h4>Account Name</h4>
            <h5>Account Amount</h5>
          </Card.Header>
        </Card>
      </section>
    </div>
  );
};

export default Account;
