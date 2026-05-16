export type UserType = {
  groups: string[],
  username: string,
  isAdmin: boolean
  image?: string;
  [key: string]: any;
}

export type FetchUserType = {
  status?: number;
  data?: UserType;
  errors?: any;
};

export type Type = {
  shortName: string,
  symbol: string
}

export type StorageType = {
  barcode: string,
  roomDisplay: string,
  roomType: Type,
  productType: Type,
  storageType: Type,
  storageSubType: Type,
  createdBy: string,
  createdOn: Date,
  deletedBy: string,
  deletedOn: Date
}

export type FetchStoragesType = {
  status?: number;
  data?: StorageType[];
  totalCount: number
  errors?: any;
};

export type FetchType = {
  status?: number;
  data?: Type[];
  errors?: any;
};
