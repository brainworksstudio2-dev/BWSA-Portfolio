export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  type: "image" | "video";
  mediaUrl: string;
  thumbnail: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  rating: number;
}

export interface BookingFormInput {
  name: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
  serviceNeeded: string;
  message: string;
}

export interface CreativeTeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  instagram?: string;
  linkedin?: string;
}

export interface EquipmentItem {
  category: string;
  items: string[];
}
