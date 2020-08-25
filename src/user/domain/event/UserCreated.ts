export class UserCreated {
  constructor(
    public readonly userId: number,
    public readonly emailAddress: string,
    public readonly authToken: string,
  ) { }
}