import React from 'react';
import './style.scss';

// import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const Account = () => {
  return (
    <div>
      <section>
        {/* Link to the single account page */}
        {/* <Link to={}> */}
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
        {/* </Link> */}
      </section>
    </div>
  );
};

export default Account;
