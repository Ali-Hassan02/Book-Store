import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box, CircularProgress, TextField } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

const Book = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [fetchingBooks, setFetchingBooks] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initially display all books
      } else {
        throw new Error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setFetchingBooks(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    }
  }, [searchQuery]);

  if (fetchingBooks) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><CircularProgress /></Box>;
  }

  const handleDetails = (id) => {
    if (!user) {
      router.push(`/login?redirectTo=/book/${id}`);
    } else {
      router.push(`/book/${id}`);
    }
  };

  const handleSearch = () => {
    if (user) {
      fetch('/api/user/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id, 
          searchQuery: searchQuery,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Search query added to history') {
          console.log('Search added to history');
        } else {
          console.error('Failed to add search to history');
        }
      })
      .catch((error) => {
        console.error('Error adding search to history:', error);
      });
    }
  
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  

  return (
    <>
      <Container sx={{ marginTop: 4 , marginBottom: 4}}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
          📚 Book List
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
          <TextField
            label="Search for a book"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '60%', marginRight: 2 }} // Reduced width
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ height: '100%' }}
          >
            Search
          </Button>
        </Box>

        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card sx={{
                boxShadow: 3,
                borderRadius: 2,
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }
              }}>
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {book.title} {/* Display only the book title */}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleDetails(book.id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Book;
