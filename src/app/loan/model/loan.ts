import{Game} from "../../game/model/game";
import{Client} from "../../client/model/client";

export interface Loan{
    id: number;
    game: Game;
    client: Client;
    startDate: Date;
    endDate: Date;
}