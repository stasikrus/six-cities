import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { appendUserComment } from '../../store/api-actions';

type CommentFormProps = {
  hotelId: number;
};

const CommentForm = ({ hotelId }: CommentFormProps) => {
  const [rating, setRating] = useState<null | number>(null);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleReviewChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = {
      rating: rating,
      comment: review
    };

    // Проверка условий для активации кнопки отправки
    if (!formData.rating || formData.comment.length < 50 || formData.comment.length > 300) {
      // Показать сообщение об ошибке или предупреждение
      return;
    }

    setIsSubmitting(true);

    dispatch(appendUserComment({
      id: hotelId,
      comment: formData.comment,
      rating: formData.rating
    }))
      .then(() => {
        // Обработка успешного ответа
        setRating(null);
        setReview('');
        setIsSubmitting(false);
      })
      .catch((error) => {
        // Обработка ошибки
        // eslint-disable-next-line
        console.error("Error:", error);
        setIsSubmitting(false);
      });
  };

  // Проверка условий для активации кнопки отправки
  const isSubmitDisabled = !rating || review.length < 50 || review.length > 300;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={rating === 5}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={rating === 4}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={rating === 3}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={rating === 2}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={rating === 1}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set&nbsp;
          <span className="reviews__star">rating</span> and describe your stay
          with at least&nbsp;
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
