export interface IAllKey {
  id: string;
  privateKey: string;
  addressUnCompressed: string;
  addressUnCompressedBalance: number | null;
  addressUnCompressedReceived: number | null;
  addressCompressed: string;
  addressCompressedBalance: number | null;
  addressCompressedReceived: number | null;
}
