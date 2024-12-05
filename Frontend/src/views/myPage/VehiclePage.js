import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import TableMyVehicle from './vehiclePageComponent/TableMyVehicle';
import AddVehicle from './vehiclePageComponent/AddVehicle';


const SamplePage = () => {
  return (
    <PageContainer title="Vehicle Page" description="this is Vehicle page">

      <DashboardCard title="My Vehicle Page">
        <AddVehicle/>
        <TableMyVehicle/>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;