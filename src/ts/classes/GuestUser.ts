import { User } from '@/ts/interfaces/user';

class GuestUser implements User {
  readonly email: string = '';
  readonly firstName: string = '';
  readonly lastName: string = '';
  readonly role: string = '';

  public fullName(): string {
    return '';
  }
  public isAuthenticated(): boolean {
    return false;
  }
}

export default GuestUser;
