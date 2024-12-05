import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ParkingLotsParent from "./parkingLotsComponent/ParkingLotsParent";


const ParkingLots = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <DashboardCard title="Sample Page">
        <Typography>This is a sample page</Typography>
          <ParkingLotsParent/>
      </DashboardCard>
    </PageContainer>
  );
};

export default ParkingLots;

