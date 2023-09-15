import CommentsItem from '../comments-item/comments-item';
import { UserComments } from '../../types/comments';

type CommentsListProps = {
  offerComments: UserComments[];
};

const CommentsList = ({ offerComments }: CommentsListProps) => {

  if (!offerComments) {
    return null;
  }

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{offerComments.length}</span>
      </h2>
      <ul className="reviews__list">
        {offerComments.map((comment) => <CommentsItem key={comment.id} commentItem={comment} />)}
      </ul>
    </>
  );
};

export default CommentsList;
