import { Profile } from '@user/domain/user/Profile';

export interface IGoogleProfile {
  getProfile(accessToken: string): Promise<Profile>;
}
