import { faker } from "@faker-js/faker";
import { IEntity } from "./types";

export const games: Record<string, IEntity.Game.Main> = {};

export const generatePlayer = (name: string): IEntity.Game.Player => ({
  id: faker.string.uuid(),
  currentScore: 0,
  totalScore: 0,
  name
});

export const generateDice = () => Math.floor(Math.random() * 6) + 1;
