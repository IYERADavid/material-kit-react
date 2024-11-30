'use client'

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Stack,
  CardActions,
} from "@mui/material";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { digitalCardClient } from "@/clients/digitalCardClient";
import { paths } from "@/paths";

export default function AddDigitalCard() {
  const [status, setStatus] = useState("select");
  const [isPending, setIsPending] = useState(false);

  const { checkSession, user } = useUser();
  const Router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.id) {

        const data = new FormData(event.currentTarget);
        const digitalCardData = Object.fromEntries(data.entries());
        const jsonData = { ...digitalCardData, userId: user.id }
    
        setIsPending(true);

        const { error } = await digitalCardClient.createDigitalCard(jsonData);

        if (error) {
        setIsPending(false);
        return;
        }

        await checkSession?.();

        Router.push(paths.dashboard.digitalCards);
        setIsPending(false);
    }

    return null;

  };

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" align="center" mb={3}>
        Add New Digital Card
      </Typography>
      <form onSubmit={handleSubmit} id="addDigitalCardForm">
        <Stack spacing={3}>
          {/* Basic Info */}
          <Stack spacing={2}>
            <Typography variant="h6">Basic Information</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Card Name"
                  name="cardName"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
          </Stack>

          {/* Images */}
          <Stack spacing={2}>
            <Typography variant="h6">Profile & Cover Images</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  component="label"
                  fullWidth
                  variant="outlined"
                  startIcon={<CloudArrowUp size={20} />}
                >
                  Upload Profile Image
                  <input type="file" name="profileImage" hidden />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  component="label"
                  fullWidth
                  variant="outlined"
                  startIcon={<CloudArrowUp size={20} />}
                >
                  Upload Cover Image
                  <input type="file" name="coverImage" hidden />
                </Button>
              </Grid>
            </Grid>
          </Stack>

          {/* Links */}
          <Stack spacing={2}>
            <Typography variant="h6">Links & URLs</Typography>
            <Divider />
            <TextField
              fullWidth
              label="Custom URL Name"
              name="customUrlName"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Calendly Link"
              name="calendlyLink"
              variant="outlined"
            />
          </Stack>

          {/* Status and Video */}
          <Stack spacing={2}>
            <Typography variant="h6">Video and Status</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    required
                    value={status}
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="select" disabled>
                        Select a Status
                    </MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Video URL"
                  name="videoUrl"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Video Title"
                  name="videoTitle"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Stack>

          {/* Payment Info */}
          <Stack spacing={2}>
            <Typography variant="h6">Payment Details</Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="MoMo (Number or Code)"
                  name="momo"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Flutterwave URL"
                  name="flutterwaveUrl"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Wise URL"
                  name="wiseUrl"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Stack>

          {/* Submit Button */}
          <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={isPending} type="submit" variant="contained">
            Save Details
          </Button>
        </CardActions>
        </Stack>
      </form>
    </Box>
  );
}
