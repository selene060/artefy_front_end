// TypeScript interface
export interface CommunityData {
  name: string;
  category_id: number | null;
  description: string;
  communities_type: string;
  status: string;
  rules?: string;
  subscription_price?: number | null;
  photo_community?: File | null;
}