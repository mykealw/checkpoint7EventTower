import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema, } from '../models/Account'
import { TowerEventSchema } from '../models/TowerEvent.js';
import { ValueSchema } from '../models/Value'
import { TicketSchema } from '../models/Ticket.js'
import { CommentSchema } from '../models/Comment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  TowerEvent = mongoose.model('TowerEvent', TowerEventSchema);
  Ticket = mongoose.model('Ticket', TicketSchema);
  Comment = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
