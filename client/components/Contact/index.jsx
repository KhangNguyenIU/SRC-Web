import React from 'react';

import {
  Avatar,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

export default function Contact({ contacts }) {

  const router = useRouter();
    console.log(contacts)
  const handleDirectMessage = (data) => {
    localStorage.setItem('partner', JSON.stringify(data));
    router.push('/private/message');
  };
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 630 }} aria-label="simple table">
          <TableBody>
            {contacts.map((row, index) => (
              <TableRow
                key={row?.name || index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems:'center'}}>
                    <Avatar src={row.avatar} alt="group" style={{marginRight:'.5rem'}}/>
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <ContactCell contact={row} />
                <TableCell align="right">
                  <Tooltip title="Online Chat">
                    <IconButton
                      onClick={() => handleDirectMessage(row.users[0])}
                    >
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

const ContactCell = ({ contact }) => {
  return (
    <TableCell component="th" scope="row">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {!!contact?.emails.length &&
          contact?.emails.map((email, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Tooltip title={`Send email to ${email.email}`}>
                <FormControlLabel
                  control={
                    <a target="top" href={`mailto:${email.email}`}>
                      <IconButton>
                        <MailOutlineIcon />
                      </IconButton>
                    </a>
                  }
                />
              </Tooltip>

              <span>{email.email || ''}</span>
            </Box>
          ))}
        {!!contact?.phones.length &&
          contact?.phones.map((phone, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Tooltip title={`Call ${phone.phone}`}>
                <FormControlLabel
                  control={
                    <a target="top" href={`tel:${phone.phone}`}>
                      <IconButton>
                        <PhoneEnabledIcon />
                      </IconButton>
                    </a>
                  }
                />
              </Tooltip>

              <span>{phone.phone || ''}</span>
            </Box>
          ))}
      </Box>
    </TableCell>
  );
};
