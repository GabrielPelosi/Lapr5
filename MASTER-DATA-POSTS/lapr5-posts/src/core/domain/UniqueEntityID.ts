
const { v4: uuidV4 } = require('uuid');
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : uuidV4())
  }
}