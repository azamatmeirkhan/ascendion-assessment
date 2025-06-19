import type { NextApiRequest, NextApiResponse } from 'next';

export default function transactionHistory(_: NextApiRequest, res: NextApiResponse) {
  const mockData = [
    { date: '24 Aug 2023', referenceID: 1, to: 'Bloom Enterprise Sdn Bhd', transactionType: 'DuitNow Payment', amount: 'RM 1,200.00' },
    { date: '14 Jul 2023', referenceID: 2, to: 'Muhammad Andy Asmawi', transactionType: 'DuitNow Payment', amount: 'RM 54800.00' },
    { date: '12 Jul 2023', referenceID: 3, to: 'Utillites Company Sdn Bhd', transactionType: 'DuitNow Payment', amount: 'RM 100.00' },
  ];

  res.status(200).json(mockData);
}