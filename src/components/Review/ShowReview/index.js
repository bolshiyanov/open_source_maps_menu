import React from 'react';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import reviewEmpty from 'images/review-empty.jpg';
import { __ } from 'utils/translation';

import './index.scss';

const ShowReview = ({
    reviews,
    onChange
}) => {
    if (!reviews || reviews.length === 0) {
        return null
    }

    const handleOpen = (review) => {
        window.open(review.url,'_blank');
    }
    const handleEnable = (review) => {
        review.isActive = true;
        onChange(review)
    }
    const handleDisable = (review) => {
        review.isActive = false;
        onChange(review)
    }
    reviews.sort((a, b) => {
        if (a.date === b.date) {
            return 0;
        } 
        if (a.date < b.date) {
            return -1;
        }
        return 1;
    });

    return (
        <>
            <div className="show-review">
            <div className="show-review__header">{__("Отзывы")}</div>
                <div className="show-review-picker">
                    <div className="show-review-picker__empty">

                    {reviews.reverse().map(review => <div className="show-review-picker-item">
                            <div className="show-review-picker-item-flexbox">
                                <div className="show-review-picker-item-flexbox__box" onClick={()=> handleOpen(review)} style={{ backgroundImage: `URL(${review.image})` }} />
                                <Button onClick={() => handleOpen(review)} className="show-review-picker-item-flexbox__title">{review.author}</Button>
                                {review.isActive && <div className="show-review-picker-item-flexbox__icon-box" onClick={()=>handleDisable(review)}><Icon className="show-review-picker-item-flexbox__icon-box__icon__check" type="check" /></div>}
                                {!review.isActive && <div className="show-review-picker-item-flexbox__icon-box" onClick={()=>handleEnable(review)}><Icon className="show-review-picker-item-flexbox__icon-box__icon__lock" type="lock" /></div>}
                            </div>
                        </div> )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowReview;