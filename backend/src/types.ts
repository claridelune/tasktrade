export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: number;
  startingBid: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  Available = "AVAILABLE",
  Sold = "SOLD",
  Auction = "AUCTION",
}

export interface Bid {
  id: number;
  taskId: number;
  bidderId: number;
  amount: number;
  createdAt: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

export interface AuctionDetails {
  taskId: number;
  highestBid: number;
  highestBidderId: string;
  bidCount: number;
  status: TaskStatus;
}
