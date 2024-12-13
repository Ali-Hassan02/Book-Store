import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const AuthorDetail = () => {
  
  const router = useRouter();
  const { aid } = router.query;

  const [authorDetail, setAuthorDetail] = useState(null);
  const [fetchingAuthor, setFetchingAuthor] = useState(true);

  useEffect(() => {
    if (!aid) return;

    const fetchAuthorDetails = async () => {
      try {
        const res = await fetch(`/api/authors/${aid}`);
        if (!res.ok) {
          throw new Error("Failed to fetch author details");
        }
        const data = await res.json();
        setAuthorDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchingAuthor(false);
      }
    };

    fetchAuthorDetails();
  }, [aid]);

  if (fetchingAuthor) {
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

  if (!authorDetail) return null;

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
          🖋️ Author Details
        </Typography>

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
            maxWidth: {
              xs: "100%", // Full width on mobile
              sm: "80%", // 80% width on small screens
              md: "60%", // 60% width on medium screens (laptops)
            },
            margin: "0 auto", // Center the card
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              {authorDetail.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginRight: 2, fontSize: "1.1rem" }}
              >
                Biography:
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem" }}
              >
                {authorDetail.biography
                  ? authorDetail.biography
                  : "No biography available"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AuthorDetail;
