
const API_URL: string = import.meta.env.VITE_API_URL;

export const fetchDirections = async (): Promise<Direction[]> => {
  const response = await fetch(`${API_URL}/direction/all`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Direction[] = await response.json();
  return data;
};

interface Direction {
  id: string;
  name: string;
}
