export namespace IEntity {
  export type Player = "X" | "O";
  export type Cell = Player | null;
  export type Board = Cell[];

  export namespace Game {
    export interface Main {
      id: string;
      player1: string;
      player2: string;
      board: Board;
      nextPlayer: Player;
      winner: Player | null;
    }

    export interface Mini extends Pick<Main, "id" | "player1" | "player2"> {}
  }
}

export namespace IApi {
  export namespace List {
    export interface Request {}
    export interface Response {}
  }

  export namespace Single {
    export interface Request {
      gameId: string;
    }
  }

  export namespace Delete {
    export interface Request {
      gameId: string;
    }
  }

  export namespace Move {
    export interface Request {
      gameId: string;
      cellIdx: number;
      player: IEntity.Player;
    }
  }

  export namespace Reset {
    export interface Request {
      gameId: string;
    }
  }

  export namespace Create {
    export interface Request extends Omit<IEntity.Game.Mini, "id"> {}
  }
}

export namespace IForm {}
