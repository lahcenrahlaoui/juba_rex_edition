// General Info Types
export type User = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  password: string;
};

export type UserProfile = {
  sub: string;
  firstname: string;
  lastname: string;
  iat: number;
  exp: number;
};
export type Tag = {
  _id: string;
  name: string;
};

export type Artefact = {
  _id: string;
  title: string;
  height: number;
  width: number;
  depth: number;
  year: number;
  tags: Tag[];
  fileUrl: string;
  owner: string;
  createdBy: User;
  creationLongitude: number;
  creationLatitude: number;
  currentLongitude: number;
  currentLatitude: number;
};
