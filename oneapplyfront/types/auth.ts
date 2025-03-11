export interface UserInfo {
  idUser: string
  email: string
  role: "intern" | "company"
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  phone?: string
  status?: string
  companyName?: string
  industryType?: string
  website?: string
}

export interface AuthResponse {
  access_token: string
  userInfo: UserInfo
}

export interface InternRegistrationData {
  email: string
  password: string
  role: "intern"
  firstName: string
  lastName: string
  birthDate: string
  phone: string
}

export interface CompanyRegistrationData {
  email: string
  password: string
  role: "company"
  companyName: string
  industryType: string
  website: string
}

