import { useAppSelector } from '../../../../store/hooks';
import { CardComment } from '../card-comment';

interface CommentProps {
  isLogged: boolean;
  userId: string;
}

export const CommentsList = ({ isLogged, userId }: CommentProps) => {
  const comments = useAppSelector(
    (store) => store.itineraryExtraReducer.data.comments
  );
  return (
    <>
      {comments.map((comment) => (
        <CardComment
          isLogged={isLogged}
          key={comment._id}
          {...comment}
          userId={userId}
        />
      ))}
    </>
  );
};
