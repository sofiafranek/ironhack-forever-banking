import React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const Account = props => {
  return (
    <section className="account-section">
      {/* Link to the single account page */}
      <Card className="hvr-grow account">
        <Link to={`/accounts/${props._id}`}>
          <Card.Header>
            <h4>kdkf</h4>
            <h5>Account Amount</h5>
          </Card.Header>
        </Link>
      </Card>
    </section>
  );
};

export default Account;
