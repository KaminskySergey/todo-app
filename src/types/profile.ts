export interface IProfile {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  phone: string | null;
  avatarUrl: string | null;
  city: string | null;
  country: string | null;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile: IProfile | null; 
}
