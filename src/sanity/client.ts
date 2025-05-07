import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "fp9441ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
