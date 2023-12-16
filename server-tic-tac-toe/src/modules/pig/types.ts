export namespace IEntity {
  export namespace Game {
    export interface Main {
      id: string;
      player1: Player;
      player2: Player;
      currentPlayer: string;
      winner: string;
      max: number;
    }

    export interface Player {
      id: string;
      name: string;
      currentScore: number;
      totalScore: number;
    }

    export interface Mini extends Pick<Main, "id" | "winner" | "max"> {
      player1: string;
      player2: string;
    }
  }
}
