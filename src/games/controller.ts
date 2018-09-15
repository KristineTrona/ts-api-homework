import { JsonController, Get, Post, HttpCode, BodyParam, Body, Param, Put, NotFoundError} from 'routing-controllers'
import Game from './entity';

const colors = ["red", "blue", "green", "yellow", "magenta"]
const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

@JsonController()
export default class GameController {

    
    @Get('/games')
    async allGames () {
      const games = await Game.find()
      return { games } 
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
      @BodyParam("name") name: string
    ) {
        const newGame = new Game

        newGame.name = name
        newGame.color = colors[Math.floor((Math.random()*colors.length-1)+1)]
        newGame.board = JSON.parse(JSON.stringify(defaultBoard))

      return newGame.save()
    }

    @Put('/games/:id')
      async updateGame(
        @Param("id") id: number,
        @BodyParam("name") name: string,
        @BodyParam("color") color: string,
        @BodyParam("board") board: JSON,
        @Body() update: Partial<Game>
      ) {
      
        const game = await Game.findOne(id)
        if(!game){
          throw new NotFoundError("Cannot find the game")
        }
        else if(color && !colors.includes(color)){
          throw new Error("Please select a valid colour: red, blue, green, yellow or magenta ")
        }

        game.name = name
        game.color = color
        game.board = board

        return Game.merge(game, update).save()
      }
    }




    // @Get('/items/:id')
    // getItem(
    //     @Param('id') id: number
    // ) {
    //     return Item.findOne(id)
    // }


