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
import { useRouter } from 'next/navigation';
import { z as zod } from 'zod';

import { useUser } from '@/hooks/use-user';
import { userClient } from '@/clients/userClient';
import { User } from '@/types/user';

// Zod schema for validation
const userProfileSchema = zod.object({
  fullName: zod.string().min(1, "Full Name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().regex(/^\d{10,}$/, "Phone number must be at least 10 digits").optional(),
});

type Values = zod.infer<typeof userProfileSchema>;

export function AccountDetailsForm({ userProfile }: { userProfile: User }): React.JSX.Element {
  const defaultValues: Values = {
    fullName: userProfile.names || "",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(userProfileSchema) });

  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const { checkSession } = useUser();

  const onSubmit = React.useCallback(
    async (values: Values) => {
      setIsPending(true);
      const { error } = await userClient.updateUser({ ...values, userId: userProfile.id });

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      await checkSession?.();
      router.refresh();

      setIsPending(false);
    },
    [checkSession, router, setError, userProfile.id]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required error={Boolean(errors.fullName)}>
                <InputLabel>Full Name</InputLabel>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} label="Full Name" />
                  )}
                />
                {errors.fullName && <p>{errors.fullName.message}</p>}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} label="Email address" />
                  )}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth error={Boolean(errors.phone)}>
                <InputLabel>Phone number</InputLabel>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} label="Phone number" type="tel" />
                  )}
                />
                {errors.phone && <p>{errors.phone.message}</p>}
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={isPending} type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
