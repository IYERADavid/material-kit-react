'use client'
import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { config } from '@/config';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';
import { userClient } from '@/clients/userClient';
import { useUser } from '@/hooks/use-user';
import type { User } from '@/types/user';

// export const metadata = { title: `Account | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [ userProfile, setUserProfile ] = React.useState<User>({} as User);

  const { user } = useUser();
  React.useEffect(() => {
    async function getLoggedInUserData() {
      if(user?.id && !isNaN(Number(user?.id))){
        const id: number = user?.id;
        const userData = await userClient.getLoggedInUserData(id);
        console.log(userData);
        setUserProfile(userData);
      }
    }

    getLoggedInUserData();
    console.log(user);

  }, [user])

  if(userProfile.id) {
    return (
      <Stack spacing={3}>
        <div>
          <Typography variant="h4">Account</Typography>
        </div>
        <Grid container spacing={3}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo userProfile={userProfile} />
          </Grid>
          <Grid lg={8} md={6} xs={12}>
            <AccountDetailsForm userProfile={userProfile} />
          </Grid>
        </Grid>
      </Stack>
    );
  }
  return (<div>loading ...</div>);
}
