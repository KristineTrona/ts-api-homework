import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  
  @Column('text', {nullable:false})
  name: string


  @Column('text')
  color: string

  @Column('text')
  board: JSON

  
}