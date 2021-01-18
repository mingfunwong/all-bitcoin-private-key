export interface ISmartbitBalance {
  success: boolean;
  address: Address;
}

export interface Address {
  address: string;
  total: Total;
  confirmed: Confirmed;
  unconfirmed: Unconfirmed;
  multisig: Multisig;
  transaction_paging: TransactionPaging;
  transactions: Transaction[];
}

export interface Total {
  received: string;
  received_int: number;
  spent: string;
  spent_int: number;
  balance: string;
  balance_int: number;
  input_count: number;
  output_count: number;
  transaction_count: number;
}

export interface Confirmed {
  received: string;
  received_int: number;
  spent: string;
  spent_int: number;
  balance: string;
  balance_int: number;
  input_count: number;
  output_count: number;
  transaction_count: number;
}

export interface Unconfirmed {
  received: string;
  received_int: number;
  spent: string;
  spent_int: number;
  balance: string;
  balance_int: number;
  input_count: number;
  output_count: number;
  transaction_count: number;
}

export interface Multisig {
  confirmed: Confirmed2;
  unconfirmed: Unconfirmed2;
}

export interface Confirmed2 {
  balance: string;
  balance_int: number;
}

export interface Unconfirmed2 {
  balance: string;
  balance_int: number;
}

export interface TransactionPaging {
  valid_sort: string[];
  limit: number;
  sort: string;
  dir: string;
  prev: any;
  next: string;
  prev_link: any;
  next_link: string;
}

export interface Transaction {
  txid: string;
  hash: string;
  block: number;
  confirmations: number;
  version: string;
  locktime: number;
  time: number;
  first_seen: number;
  propagation: any;
  double_spend: boolean;
  size: number;
  vsize: number;
  input_amount: string;
  input_amount_int: number;
  output_amount: string;
  output_amount_int: number;
  fee: string;
  fee_int: number;
  fee_size: string;
  coinbase: boolean;
  input_count: number;
  inputs: Input[];
  output_count: number;
  outputs: Output[];
  tx_index: number;
  block_index: number;
}

export interface Input {
  addresses: string[];
  value: string;
  value_int: number;
  txid: string;
  vout: number;
  script_sig: ScriptSig;
  type: string;
  witness: string[];
  sequence: number;
}

export interface ScriptSig {
  asm: string;
  hex: string;
}

export interface Output {
  addresses: string[];
  value: string;
  value_int: number;
  n: number;
  script_pub_key: ScriptPubKey;
  req_sigs: number;
  type: string;
  spend_txid?: string;
}

export interface ScriptPubKey {
  asm: string;
  hex: string;
}
