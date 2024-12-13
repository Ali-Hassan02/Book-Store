import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Divider,
} from "@mui/material";
import Navbar from "@/component/navbar";

const Genres = () => {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);

  
    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/genres");
        if (!res.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingGenres(false);
      }
    };

    useEffect(()=>{
      fetchGenres()
    }, [])


  const handleGenreClick = (id) => {
    router.push(`/genre/${id}`);
  };

  if (loadingGenres) {
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

  return (
    <>
    {/* <Navbar/> */}
    <Container sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
          color: "primary.main",
        }}
      >
        📝 Genres
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Align items vertically
          justifyContent: "center",
          alignItems: "center", // Center the content horizontally
          gap: 1, // Add spacing between the buttons
        }}
      >
        {genres.map((genre) => (
          <Card
            key={genre._id}
            sx={{
              maxWidth: 345,
              boxShadow: 3,
              borderRadius: 2,
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              },
              width: "100%", // Ensure card fills its container width
              marginBottom: 2, // Space between cards
            }}
          >
            <CardActionArea onClick={() => handleGenreClick(genre.id)}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                  {genre.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>

    </>
  );
};

export default Genres;
