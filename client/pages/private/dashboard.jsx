import Dashboard from '@components/Dashboard';
import { DashboardLayout } from '@components/Dashboard/Layout';
import { Container } from '@mui/system';
import React from 'react';

export default function DashboardPage() {
  return (
    <React.Fragment>
      <DashboardLayout>
        <Container maxWidth="md">
          <Dashboard />
        </Container>
      </DashboardLayout>
    </React.Fragment>
  );
}
