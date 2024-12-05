import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProfileTable from './profilePageComponent/ProfileTable';



const ProfilePage = () => {
  return (
    <PageContainer title="My Profile" description="this is a profile page">

      <DashboardCard title="My Profile">
        <ProfileTable/>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProfilePage;