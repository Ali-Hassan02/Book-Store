import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [fetchingAuthors, setFetchingAuthors] = useState(true);


  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/authors");
      if (!res.ok) throw new Error("Failed to fetch authors");
      const data = await res.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    } finally {
      setFetchingAuthors(false);
    }
  };


  // Fetch authors from the API
  useEffect(() => {
    fetchAuthors();
  }, []);

  if (fetchingAuthors)
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
          🖋️ Author List
        </Typography>
        <Grid container spacing={3}>
          {authors.map((author) => (
            <Grid item xs={12} sm={6} md={4} key={author._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  minHeight: 150,
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
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    {author.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                  >
                    Biography:
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {author.biography
                      ? author.biography
                      : "No biography available"}
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

export default Authors;
