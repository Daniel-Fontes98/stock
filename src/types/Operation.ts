export type Operation = {
  id: string;
  createdAt: Date;
  operationType: string;
  quantity: number;
  unitType: string;
  deliveredTo: string | null;
  item: {
    name: string;
  };
};
