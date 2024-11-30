'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { z as zod } from 'zod';

import { useUser } from '@/hooks/use-user';
import { User } from '@/types/user';
import { digitalCardClient } from '@/clients/digitalCardClient';
import { MenuItem, Select, Typography } from '@mui/material';
import { digitalCardDTO } from '@/app/api/digitalCard/digitalCard.dto';

// Zod schema for validation
const userProfileSchema = zod.object({
  cardName: zod.string().min(1, "Full Name is required"),
  occupation: zod.string().min(1, "occupation is required"),
  description: zod.string().min(1, "description is required"),
  profileImageUrl: zod.string().min(1, "profile Image Url is required"),
  coverImageUrl: zod.string().min(1, "cover Image Url is required"),
  customUrlName: zod.string().min(1, "custom Url Name is required"),
  calendlyLink: zod.string().min(1, "calendly Link is required"),
  status: zod.string().min(1, "status is required"),
  videoUrl: zod.string().min(1, "video Url is required"),
  videoTitle: zod.string().min(1, "video Title is required"),
  momoNumberOrCode: zod.string().min(1, "momo Number Or Code is required").optional(),
  wiseUrl: zod.string().min(1, "wise Url is required").optional(),
  flutterwaveUrl: zod.string().min(1, "flutter wave Url is required").optional(),
});

type Values = zod.infer<typeof userProfileSchema>;

export default function UpdateDigitalCard() {

  const searchParams = useSearchParams();
  const cardId = searchParams.get('cardId');
  const { checkSession, user } = useUser();
  const [ digitalCard, setDigitalCard ] = React.useState<digitalCardDTO>({} as digitalCardDTO);

  React.useEffect(() => {

    async function getDigitalCardData(){
      console.log(user?.id, cardId);
      if (user?.id && cardId && !isNaN(Number(user?.id)) && !isNaN(Number(cardId))) {
        const digitalCardData = await digitalCardClient.getDigitalCardById(user?.id , parseInt(cardId));
        setDigitalCard(digitalCardData); 
      }
    }

    getDigitalCardData();
    console.log(digitalCard);

  }, [user, cardId])

  const defaultValues: Values = {
    cardName: "",
    occupation: "",
    description: "",
    profileImageUrl: "",
    coverImageUrl: "",
    customUrlName: "",
    calendlyLink: "",
    status: "",
    videoUrl: "",
    videoTitle: "",
    momoNumberOrCode: "",
    wiseUrl: "",
    flutterwaveUrl: "",
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(userProfileSchema) });

  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  const onSubmit = React.useCallback(
    async (values: Values) => {
      setIsPending(true);
      const { error } = await digitalCardClient.updateDigitalCard({ ...values, userId: user?.id, cardId: cardId });

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      await checkSession?.();
      router.refresh();

      setIsPending(false);
    },
    [checkSession, router, setError, 6]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Card" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid xs={12}>
              <Typography variant="h6">Basic Information</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required error={Boolean(errors.cardName)}>
                <InputLabel>Card Name</InputLabel>
                <Controller
                  name="cardName"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Card Name" />}
                />
                {errors.cardName && <p>{errors.cardName.message}</p>}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required error={Boolean(errors.occupation)}>
                <InputLabel>Occupation</InputLabel>
                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Occupation" />}
                />
                {errors.occupation && <p>{errors.occupation.message}</p>}
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth error={Boolean(errors.description)}>
                <InputLabel>Description</InputLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} label="Description" multiline rows={4} />
                  )}
                />
                {errors.description && <p>{errors.description.message}</p>}
              </FormControl>
            </Grid>

            {/* Images */}
            <Grid xs={12}>
              <Typography variant="h6">Profile & Cover Images</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid md={6} xs={12}>
              <Button component="label" fullWidth variant="outlined">
                Upload Profile Image
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid md={6} xs={12}>
              <Button component="label" fullWidth variant="outlined">
                Upload Cover Image
                <input type="file" hidden />
              </Button>
            </Grid>

            {/* Links */}
            <Grid xs={12}>
              <Typography variant="h6">Links & URLs</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Custom URL Name</InputLabel>
                <Controller
                  name="customUrlName"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Custom URL Name" />}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Calendly Link</InputLabel>
                <Controller
                  name="calendlyLink"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Calendly Link" />}
                />
              </FormControl>
            </Grid>

            {/* Status and Video */}
            <Grid xs={12}>
              <Typography variant="h6">Video and Status</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} defaultValue="select">
                      <MenuItem value="select" disabled>
                        Select a Status
                      </MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Video URL</InputLabel>
                <Controller
                  name="videoUrl"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Video URL" />}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Video Title</InputLabel>
                <Controller
                  name="videoTitle"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Video Title" />}
                />
              </FormControl>
            </Grid>

            {/* Payment Info */}
            <Grid xs={12}>
              <Typography variant="h6">Payment Details</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>MoMo (Number or Code)</InputLabel>
                <Controller
                  name="momoNumberOrCode"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="MoMo (Number or Code)" />}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Flutterwave URL</InputLabel>
                <Controller
                  name="flutterwaveUrl"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Flutter wave URL" />}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Wise URL</InputLabel>
                <Controller
                  name="wiseUrl"
                  control={control}
                  render={({ field }) => <OutlinedInput {...field} label="Wise URL" />}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={isPending} type="submit" variant="contained">
            Save Details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
