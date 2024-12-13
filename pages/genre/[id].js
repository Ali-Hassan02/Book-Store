import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import Navbar from "@/component/navbar";
import { useAuth } from "@/contexts/AuthContext";  // Import useAuth

const GenreBooks = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [books, setBooks] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(true);

  useEffect(() => {
    if (!id) return; 

    const fetchBooksByGenre = async () => {
      try {
        const res = await fetch(`/api/genres/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        console.log("dattaaa", data);
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchBooksByGenre();
  }, [id]);

  if (loadingFetch) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
          color: "primary.main",
        }}>
         📝 Books in this Genre
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: 3,
                  borderRadius: 2,
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  },
                  minHeight: '250px'
                }}
              >
                <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" , marginBottom: 1 }}>
                {book.title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Author:</strong> {book.author}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Genre:</strong> {book.genre}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Price:</strong> ${book.price}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <strong>Description:</strong> {book.description}
              </Typography>
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default GenreBooks;
