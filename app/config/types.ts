export enum UserType {
  patient,
  medecin,
  pharmacien
}

export class User {
  id = 0;
  type: UserType;
  firstName: string;
  lastName: string;
  cardIDToken: string;

  constructor(id: number, type: UserType, firstName: string, lastName: string, cardIDToken: string) {
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cardIDToken = cardIDToken;
  }

}
