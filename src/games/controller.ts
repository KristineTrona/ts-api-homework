import { JsonController, Get, Post, HttpCode, BodyParam} from 'routing-controllers'
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
        newGame.color = colors[Math.floor((Math.random()*colors.length-1))]
        newGame.board = JSON.parse(JSON.stringify(defaultBoard))

      return newGame.save()
    }


}



    // @Get('/items/:id')
    // getItem(
    //     @Param('id') id: number
    // ) {
    //     return Item.findOne(id)
    // }

    // @Put('/items/:id')
    // async updateItem(
    //   @Param('id') id: number,
    //   @Body() update: Partial<Item>
    // ) {
    //   const item = await Item.findOne(id)
    //   if(!item) throw new NotFoundError('Cannot find the item')

    //   return Item.merge(item, update).save()
    // }
