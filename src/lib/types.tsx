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
  deletedOn: Date,
  shelves: ShelfType[]
}

export type ShelfType = {
  barcode: string,
  boxes: BoxType[]
}

export type BoxType = {
  barcode: string,
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
