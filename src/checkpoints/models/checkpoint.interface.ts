import { PROFILE_INITIAL_STATE, type Profile } from '@/profiles/models/profile.interface'
import { type Observation } from './observation.interface'

export interface Checkpoint {
  id: string
  checked: boolean
  checkpointNumber: number
  location: string
  observations: Observation[]
  profile: Profile

  createdAt: string
  updatedAt: string
  active: boolean
}

export const CHECKPOINT_INITIAL_STATE: Checkpoint = {
  id: '',
  checked: false,
  checkpointNumber: 0,
  location: '',
  observations: [],
  profile: PROFILE_INITIAL_STATE,

  createdAt: '',
  updatedAt: '',
  active: false
}
