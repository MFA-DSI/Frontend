export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  function: string;
  grade: string;
  password: string;
  direction: string;
};


export type NewResponsible = {
  firstname: string;
  lastname: string;
  email?: string;  
  phone?: string;  
  personnelType: string;
  grade?: string;  
  directionId: string;
  fonction: string;
}
