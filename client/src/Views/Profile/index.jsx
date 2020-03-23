import React from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Profile = props => {
  const user = props.user;
  return (
    <div className="profile-page">
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/activity">Activity</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Profile</Breadcrumb.Item>
        </Breadcrumb>
        <section>
          <h1 className="pb-3">Profile</h1>
          <hr></hr>
          <h5 className="pb-3 pt-3">User Name: {user.name}</h5>
          <h5 className="pb-3">Email: {user.email}</h5>
          <h5 className="pb-3">Phone Number: {user.phoneNumber}</h5>
          <h5 className="pb-3">Nationality: {user.nationality}</h5>
          <h5 className="pb-3">Address: {user.address}</h5>
          <h5>Joined Date: {user.createdAt}</h5>
        </section>
      </Layout>
    </div>
  );
};

export default Profile;
