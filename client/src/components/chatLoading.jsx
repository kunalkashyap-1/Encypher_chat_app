import { Stack, Skeleton } from '@mui/material';

const ChatLoading=() => {
  return (
    <Stack spacing={1}
    sx={{m:"1rem"}}
    >
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
    </Stack>
  );
}

export default ChatLoading;
