export type Alert = {
  createdAt: Date;
  item: {
    name: string;
    quantityUnit: number;
    quantityBox: number;
    Total: number;
    alertMin: number;
  };
};
