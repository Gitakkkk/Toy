import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CommentReply } from './comment_reply.entity';

@Injectable()
export class CommentReplyRepository extends Repository<CommentReply> {
  constructor(private dataSource: DataSource) {
    super(CommentReply, dataSource.createEntityManager());
  }
}
