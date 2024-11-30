'use client'

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Divider, Stack, Button, CircularProgress } from "@mui/material";
import { digitalCardClient } from "@/clients/digitalCardClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/use-user";

export default function ViewDigitalCard() {

  const [cardDetails, setCardDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();

  const { user } = useUser();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');

  useEffect(() => {
    const fetchCardDetails = async () => {
      if(user?.id && cardId && !isNaN(Number(cardId))) {

        setIsLoading(true);
        const data = await digitalCardClient.getDigitalCardById(user.id , parseInt(cardId));

        setCardDetails(data);
        setIsLoading(false);
      }
    };

    fetchCardDetails();
  }, [cardId, Router]);

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" align="center" mb={3}>
        Digital Card Details
      </Typography>

      <Stack spacing={3}>
        {/* Basic Info */}
        <Stack spacing={2}>
          <Typography variant="h6">Basic Information</Typography>
          <Divider />
          <Grid container spacing={2} sx={{my:1}}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Card Name:</strong> {cardDetails.card_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Occupation:</strong> {cardDetails.occupation}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Description:</strong> {cardDetails.description}</Typography>
            </Grid>
          </Grid>
        </Stack>

        {/* Links */}
        <Stack spacing={2} sx={{mb:1}}>
          <Typography variant="h6" sx={{mb:1}}>Links & URLs</Typography>
          <Divider />
          {cardDetails.custom_url_name && (
            <Typography variant="body1"><strong>Custom URL:</strong> {cardDetails.custom_url_name}</Typography>
          )}
          {cardDetails.calendly_link && (
            <Typography variant="body1"><strong>Calendly Link:</strong> <a href={cardDetails.calendly_link} target="_blank" rel="noopener noreferrer">{cardDetails.calendly_link}</a></Typography>
          )}
        </Stack>

        {/* Video and Status */}
        <Stack spacing={2}>
          <Typography variant="h6">Video and Status</Typography>
          <Divider />
          <Grid container spacing={2} sx={{my:1}}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Status:</strong> {cardDetails.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {cardDetails.video_url && (
                <Typography variant="body1"><strong>Video URL:</strong> <a href={cardDetails.video_url} target="_blank" rel="noopener noreferrer">{cardDetails.video_url}</a></Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {cardDetails.video_title && (
                <Typography variant="body1"><strong>Video Title:</strong> {cardDetails.video_title}</Typography>
              )}
            </Grid>
          </Grid>
        </Stack>

        {/* Payment Info */}
        <Stack spacing={2} sx={{mb:1}}>
          <Typography variant="h6">Payment Details</Typography>
          <Divider />
          {cardDetails.momo_number_or_code && (
            <Typography variant="body1"><strong>MoMo:</strong> {cardDetails.momo_number_or_code}</Typography>
          )}
          {cardDetails.flutterwave_url && (
            <Typography variant="body1"><strong>Flutterwave URL:</strong> <a href={cardDetails.flutterwave_url} target="_blank" rel="noopener noreferrer">{cardDetails.flutterwave_url}</a></Typography>
          )}
          {cardDetails.wise_url && (
            <Typography variant="body1"><strong>Wise URL:</strong> <a href={cardDetails.wise_url} target="_blank" rel="noopener noreferrer">{cardDetails.wise_url}</a></Typography>
          )}
        </Stack>

        {/* Button to go back */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={() => Router.push('/dashboard/digitalCards')}>
            Back to Digital Cards
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
