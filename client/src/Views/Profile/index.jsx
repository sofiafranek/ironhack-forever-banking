import React from 'react';

import Layout from '../../Components/Layout';

const Profile = props => {
  console.log(props.user, 'PROPS');
  const user = props.user;
  return (
    <div>
      <Layout>
        <h1 className="pb-3">Profile</h1>
        <h5 className="pb-3">User Name: {user.name}</h5>
        <h5 className="pb-3">Email: {user.email}</h5>
        <h5 className="pb-3">Phone Number: {user.phoneNumber}</h5>
        <h5 className="pb-3">Nationality: {user.nationality}</h5>
        <h5 className="pb-3">Occupation: {user.occupation}</h5>
        <h5 className="pb-3">Address: {user.address}</h5>
        <h5>Joined Date: {user.createdAt}</h5>
      </Layout>
    </div>
  );
};

export default Profile;
