import { Rate } from 'rsuite';

const CreateRatings = ({ rate, handleChangeRatings }) => {
    console.log('CreateRatings', rate);
    const handleRatingChange = (value) => {
        handleChangeRatings(value);
        // console.log('Selected Rating:', value);
        // You can do something with the selected rating value here
    };
    return (
        <>
            <Rate
                size="xs"
                color="yellow"
                defaultValue={rate}
                allowHalf
                onChange={handleRatingChange}
            />
        </>
    );
};

export default CreateRatings;
