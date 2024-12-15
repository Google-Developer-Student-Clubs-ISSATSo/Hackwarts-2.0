import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChallenge extends Document {
  name: string;
  sponsor_name: string;
  description: string;
  prize: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const challengeSchema = new Schema<IChallenge>(
  {
    name: { type: String, required: true },
    sponsor_name: { type: String, required: true },
    description: { type: String, required: true },
    prize: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true },
);

export const Challenge: Model<IChallenge> =
  mongoose.models.Challenge ||
  mongoose.model<IChallenge>("Challenge", challengeSchema);
