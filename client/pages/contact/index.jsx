import React from 'react';
import Layout from '@components/Layout';
import { Container } from '@mui/system';
import Contact from '@components/Contact';
import { ContactService } from '@services/contact';
import useSWR from 'swr';
import TitleLayout from '@components/Layout/TitleLayout';

export default function ContactPage({ contacts, socket }) {
  return (
    <React.Fragment>
      <Layout socket={socket}>
        <TitleLayout h2="Information" h1="Department Contact">
          <Container maxWidth="md">
            <Contact contacts={contacts} />
          </Container>
        </TitleLayout>
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const res = await ContactService.getContacts();
  const contacts = res.data;
  return {
    props: {
      contacts,
    },
  };
}
