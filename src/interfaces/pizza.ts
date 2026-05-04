export interface IPizza {
  id: number;
  created_at: string;
  category:string;
  name: string | null;
  description: string | null;
  image: string | null;
  status: string | null;
}
