export interface Profile {
  id: string
  name: string
  lastName: string
  dni: string
  company: string
  phone1: string
  phone2: string
  email: string
  license: string
  licenseCategory: string
  licenseExpiration: string
  fullName: string

  createdAt: string
  updatedAt: string
  active: boolean
}

export interface ProfileDto extends Omit<Profile, 'id' | 'createdAt' | 'updatedAt' | 'fullName' | 'active'> {}

export const PROFILE_INITIAL_STATE: Profile = {
  id: '',
  name: '',
  lastName: '',
  company: '',
  dni: '',
  phone1: '',
  phone2: '',
  email: '',
  license: '',
  licenseCategory: '',
  licenseExpiration: new Date().toISOString(),
  fullName: '',
  createdAt: '',
  updatedAt: '',
  active: true
}

export const PROFILE_DTO_INITIAL_STATE: ProfileDto = {
  name: '',
  lastName: '',
  dni: '',
  phone1: '',
  company: '',
  phone2: '',
  email: '',
  license: '',
  licenseCategory: '',
  licenseExpiration: new Date().toISOString()
}
