type BusinessDetails = {
  businessName: string;
  location: string;
  industry: string;
  companySize: string;
  estimatedVolume: string;
};
export type signupdefaultValuesType = {
  email: string;
  fullname: string;
  password: string;
  confirm_password: string;
};

export type signindefaultValuesType = {
  email: string;
  password: string;
};

export enum FormStepsEnum {
  Step1 = 'step-1',
  Step2 = 'step-2',
  Step3 = 'step-3',
  Step4 = 'step-4',
  Step5 = 'step-5',
}

export type BusinessReducerState = {
  user: UserType | null;
  business_details: BusinessDetails | null;
  account_type: 'AGENT' | 'EXPORTING_PRODUCER' | 'MERCHANT' | null;
};

export type UserType = {
  email: string;
  is_confirmed: boolean;
  id: number;
  auth_id: string;
};
export type ProfileType = {
  createdAt: string;
  updatedAt: string;
  username: string;
  deleted: boolean;
  first_name: string;
  last_name: string;
  id: number;
  image: string;
};
