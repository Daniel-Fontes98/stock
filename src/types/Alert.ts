export type Alert = {
  createdAt: Date;
  type: string;
  item: {
    name: string;
    quantityUnit: number;
    quantityBox: number;
    Total: number;
    alertMin: number;
  };
};
