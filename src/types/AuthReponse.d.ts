export type AuthReponse = {
  token: Jwttoken;
  userId: string;
  directionId: string;
};

type Jwttoken = {
  accessToken: string;
};
