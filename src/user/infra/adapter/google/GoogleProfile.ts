import Axios from 'axios';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IGoogleProfile } from '@user/interface/adapter/IGoogleProfile';

import { Profile } from '@user/domain/user/Profile';
import { Email } from '@user/domain/user/Email';

@Injectable()
export class GoogleProfile implements IGoogleProfile {
  public async getProfile(accessToken: string): Promise<Profile> {
    let response: {
      data: {
        id: string;
        name?: string;
        email?: string;
        verified_email: boolean;
        picture?: string;
        locale?: string;
      };
    };

    try {
      response = await Axios.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v1/userinfo',
        params: { access_token: accessToken },
      });
    } catch (e) {
      throw new UnauthorizedException();
    }

    const { name, email, picture } = response.data;

    return new Profile(
      name === undefined ? null : name,
      email === undefined ? null : new Email(email),
      picture === undefined ? null : picture,
    );
  }
}