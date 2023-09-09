import { useAppSelector } from '../../hooks';
import { getComments } from '../../store/selectors';
import CommentsItem from '../comments-item/comments-item';

const CommentsList = () => {
  const offerComments = useAppSelector(getComments);

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
