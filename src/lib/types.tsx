export type UserType = {
  groups: string[],
  username: string,
  isAdmin: boolean,
  isReadOnly: boolean,
  image?: string,
  [key: string]: any
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
  deletedBy?: string,
  deletedOn?: Date,
  shelves: ShelfType[]
}

export type ShelfType = {
  barcode: string,
  createdBy: string,
  createdOn: Date,
  deletedBy?: string,
  deletedOn?: Date,
  boxes: BoxType[]
}

export type BoxType = {
  barcode: string,
  createdBy: string,
  createdOn: Date,
  deletedBy?: string,
  deletedOn?: Date,
}

export type FetchStoragesType = {
  status?: number;
  data?: StorageType[];
  totalCount: number
  errors?: any;
};

export type FetchStorageType = {
  status?: number;
  data?: StorageType;
  errors?: any;
};

export type FetchType = {
  status?: number;
  data?: Type[];
  errors?: any;
};

export type FetchAllowedType = {
  status?: number;
  data?: AllowedType;
  errors?: any;
};

export type AllowedType = {
  allowsBoxes?: boolean;
  allowsShelves?: boolean;
};

export type PostBarcodeType = {
  status?: number;
  barcode?: string;
  errors?: any;
};

export type DeleteBarcodeType = {
  status?: number;
  deleted?: boolean;
  errors?: any;
};

export interface ActiveFilters {
  roomType?: string;
  productType?: string;
  storageType?: string;
  storageSubType?: string;
  allowsBoxes?: boolean;
  allowsShelves?: boolean;
  roomDisplay?: string;
  searchTerm?: string;
}

export interface FilterOptions {
  roomType: Type[];
  productType: Type[];
  storageType: Type[];
  storageSubType: Type[];
}
