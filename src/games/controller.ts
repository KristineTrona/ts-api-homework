import { JsonController, Get, Post, HttpCode, Body} from 'routing-controllers'
import Game from './entity';


@JsonController()
export default class GameController {

    
    @Get('/games')
    async allItems () {
      const games = await Game.find()
      return { games } 
    }

    @Post('/games')
    @HttpCode(201)
    createItem(
      @Body() game: Game
    ) {
      return game.save()
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
