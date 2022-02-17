import {
  Alert,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error(`Failed to get response: ${await res.text()}`);
  }
  const data: {
    id: string;
    name: string;
    email: string
  } = await res.json();
  return data;
};

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  //const { data, error } = {data: null, error: Error("uh oh!")};
  //const { data, error } = {data: null, error: null};
  const { data, error } = useSWR(`/api/user/${id}`, fetcher);

  if (error) {
    return <Alert status="error">Loading failed: {error.message}</Alert>;
  }

  if (!data) {
    return <Alert status="info">Loading...</Alert>;
  }

  return (
    <SimpleGrid columns={2} width="2xs" spacingY={4}>
        <Text fontWeight="bold" marginRight={4}>
            UserId
        </Text>
        <Text>{data.id}</Text>

        <Text fontWeight="bold" marginRight={4}>
            Name
        </Text>
        <Text>{data.name}</Text>

        <Text fontWeight="bold" marginRight={4}>
            Email
        </Text>
        <Text>{data.email}</Text>
    </SimpleGrid>
  );
};

export default User;
