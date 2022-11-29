export interface ILargePage {
  title: string
  description: string
  image: string
  redirect: string
}

export interface IMinimalPage {
  t: string;
  d: string;
  i: string;
  r: string;

  D?: string;
}

export type IPage = ILargePage | IMinimalPage;