import { JsonController, Get, Post, HttpCode, BodyParam, Body, Param, Put, NotFoundError, BadRequestError} from 'routing-controllers'
import Game from './entity';

const colors = ["red", "blue", "green", "yellow", "magenta"]

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length


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
        newGame.board = defaultBoard

      return newGame.save()
    }

    @Put('/games/:id')
    async updateGame(
      @Param("id") id: number,
      @BodyParam("name") name: string,
      @BodyParam("color") color: string,
      @BodyParam("board") board: object,
      @Body() update: Partial<Game>
    ) {     
        const game = await Game.findOne(id)
        if(!game)
          throw new NotFoundError("Cannot find the game")

        else if(color && !colors.includes(color))
          throw new BadRequestError("Please select a valid color: red, blue, green, yellow or magenta ")

        else if(board && moves(board, game.board)>1)
          throw new BadRequestError("Make only one move at the time!")

        game.name = name
        game.color = color
        game.board = board

        return Game.merge(game, update).save()
      }
    }


