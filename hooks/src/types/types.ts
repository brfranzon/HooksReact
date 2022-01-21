export type JokeType = {
  type: string;
  value: {
    id: number,
    joke: string,
    category: String[]
  }
}