export function getDataset() {
  if (typeof window === "undefined") return "default";

  let dataset = localStorage.getItem("memzee-dataset");

  if (!dataset) {
    dataset = crypto.randomUUID();
    localStorage.setItem("memzee-dataset", dataset);
  }

  return dataset;
}