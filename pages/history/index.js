import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Navbar from '@/component/navbar';

const History = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/user/history?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }

        const data = await response.json();
        setHistory(data.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main" }}>
        🕒 Search History
      </Typography>

      {history.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}>
          No search history available.
        </Typography>
      ) : (
        <Box
          sx={{
            maxWidth: 600, // Limit the width of the list
            margin: "0 auto", // Center the list horizontally
            padding: 2, // Add padding inside the container
            borderRadius: 2, // Add rounded corners
            boxShadow: 3, // Add a subtle shadow
          }}
        >
          <List>
            {history.map((entry, index) => (
              <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                <ListItemText
                  primary={entry.searchQuery}
                  secondary={`Searched on: ${new Date(entry.timestamp).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
};

export default History;
