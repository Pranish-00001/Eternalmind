export interface Attachment {
  name: string;
  type: string;
  size: number;
}

export interface Capsule {
  id: string;
  ownerName: string;
  ownerWalletAddress: string;
  title: string;
  description: string;
  memoryText: string;
  attachments: Attachment[];
  heirEmail: string;
  unlockDate: string;
  status: "draft" | "sealed";
  txHash?: string;
  createdAt: string;
}

export interface User {
  email: string;
}
