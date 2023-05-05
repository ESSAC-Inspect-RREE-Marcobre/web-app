import { AppServices } from '@/shared/service/api.service'
import { type Profile, type ProfileDto } from '@/profiles/models/profile.interface'

export class ProfilesService extends AppServices {
  constructor () {
    super({ baseUrl: 'profiles', contentType: 'application/json' })
  }

  findAll = async (): Promise<Profile[]> => {
    return await this.get<Profile[]>('')
      .then(response => response.data)
  }

  update = async (profile: ProfileDto, id: string): Promise<Profile> => {
    return await this.patch<Profile>(`/${id}`, profile)
      .then(response => response.data)
  }
}
