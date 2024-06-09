import {
  TransactionDataModel,
  TransactionListResModel,
} from "../src/interface";

export const transactionDataListPage1Mock: TransactionDataModel[] = [
  {
    amount: 100,
    date: "07/06/2024",
    description: "Pay bill",
    type: "credit",
  },
  {
    amount: 101,
    date: "08/06/2024",
    description: "Transfer to Salmon",
    type: "credit",
  },
  {
    amount: 102,
    date: "09/06/2024",
    description: "Transfer to eWallet",
    type: "credit",
  },
  {
    amount: 103,
    date: "07/06/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 104,
    date: "07/06/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 105,
    date: "09/06/2024",
    description: "Pay water bill",
    type: "credit",
  },
  {
    amount: 106,
    date: "27/08/2024",
    description: "Transfer to CIMB",
    type: "credit",
  },
  {
    amount: 107,
    date: "17/06/2024",
    description: "Payment on Credit Card",
    type: "credit",
  },
  {
    amount: 108,
    date: "07/05/2024",
    description: "Salary incoming",
    type: "debit",
  },
  {
    amount: 109,
    date: "07/07/2024",
    description: "Transfer to HSBC",
    type: "credit",
  },
];

export const transactionDataListPage2Mock: TransactionDataModel[] = [
  {
    amount: 110,
    date: "17/06/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 111,
    date: "07/05/2024",
    description: "Salary incoming",
    type: "debit",
  },
  {
    amount: 112.3,
    date: "07/07/2023",
    description: "Transfer to Maybank",
    type: "credit",
  },
  {
    amount: 140,
    date: "07/03/2023",
    description: "Transfer to Maybank",
    type: "credit",
  },
  {
    amount: 162,
    date: "11/07/2024",
    description: "Transfer to Maybank",
    type: "credit",
  },
  {
    amount: 177.77,
    date: "07/07/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 80.8,
    date: "17/07/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 90.8,
    date: "07/09/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 10.8,
    date: "07/08/2024",
    description: "Transfer to eWallet",
    type: "credit",
  },
  {
    amount: 90.8,
    date: "07/07/2024",
    description: "Transfer to eWallet",
    type: "credit",
  },
];

export const transactionDataListPage3Mock: TransactionDataModel[] = [
  {
    amount: 200,
    date: "07/07/2023",
    description: "Transfer to Maybank",
    type: "credit",
  },
  {
    amount: 140,
    date: "07/03/2023",
    description: "Transfer to OCBC",
    type: "credit",
  },
  {
    amount: 99,
    date: "17/06/2023",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 3000,
    date: "07/05/2024",
    description: "Salary incoming",
    type: "debit",
  },
  {
    amount: 70,
    date: "11/12/2024",
    description: "Transfer to Maybank",
    type: "credit",
  },
  {
    amount: 177.3,
    date: "11/07/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 230,
    date: "17/07/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 190.8,
    date: "07/09/2024",
    description: "Received Money",
    type: "debit",
  },
  {
    amount: 100.8,
    date: "07/08/2024",
    description: "Transfer to eWallet",
    type: "credit",
  },
  {
    amount: 30.8,
    date: "07/10/2024",
    description: "Transfer to eWallet",
    type: "credit",
  },
];

export const transactionListResMock = (
  pageNo: number
): TransactionListResModel => {
  let result: Array<TransactionDataModel>;
  switch (pageNo) {
    case 1:
    default:
      result = transactionDataListPage1Mock;
      break;
    case 2:
      result = transactionDataListPage2Mock;
      break;
    case 3:
      result = transactionDataListPage3Mock;
      break;
  }
  return {
    page: pageNo,
    results: result,
    total_pages: 10,
    total_results: 10,
  };
};
