import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [bookDetail, setBookDetail] = useState(null);
  const [fetchingBook, setFetchingBook] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await res.json();
        setBookDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchingBook(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  

  if (fetchingBook) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  const handleAuthorDetail = (authorId) => {
    if (!user) {
      router.push(`/login?redirectTo=/book/${id}/${authorId}`);
    } else {
      router.push(`/book/${id}/${authorId}`);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Container sx={{ marginTop: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "primary.main",
          }}
        >
          📚 Book Details
        </Typography>

        <Container
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              maxWidth: {
                xs: "100%",
                sm: "80%",
                md: "60%",
              },
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {bookDetail.title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Author:</strong> {bookDetail.author}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Genre:</strong> {bookDetail.genre}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Price:</strong> ${bookDetail.price}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                <strong>Description:</strong> {bookDetail.description}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAuthorDetail(bookDetail.authorId)} // Assuming authorId is part of the book details
              >
                View Author Details
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </>
  );
};

export default BookDetail;
