import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CreateSpotForm.css';
import { createSpotThunk } from '../../../../store/spotsReducer';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const newSpotId = useSelector(state => state.spots.allSpots[1].id);
    const [previewDisabled, setPreviewDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [secondImage, setSecondImage] = useState('');
    const [thirdImage, setThirdImage] = useState('');
    const [fourthImage, setFourthImage] = useState('');
    const [fifthImage, setFifthImage] = useState('');
    const [form, setForm] = useState({
        'country': '',
        'address': '',
        'city': '',
        'state': '',
        'description': '',
        'name': '',
        'price': '',
        'lat': 1,
        'lng': 2,
    });

    const [empty, setEmpty] = useState({
        'country': '',
        'address': '',
        'city': '',
        'state': '',
        'description': '',
        'name': '',
        'price': '',
    })

    const [submitted, setSubmitted] = useState(false);

    const spotImages = [];

    const handleInputChange = (e, fieldName) => {
        setForm((prev) => {
            const newForm = { ...prev };
            newForm[fieldName] = e.target.value;
            return newForm;
        })
    }

    const handleEmpty = (fieldName) => {
        setEmpty((prev) => {
            const newForm = { ...prev };
            newForm[fieldName] = `${fieldName} is required`;
            return newForm;
        })
    }

    // useEffect(() => {

    //     !previewImage.length || !Object.values(form).length ? setDisabled(true) : setDisabled(false);
    // }, [previewImage.length, form])


    const submitSpot = async (e) => {
        e.preventDefault();
        spotImages.push({ 'url': previewImage, 'preview': true })
        secondImage.length ? spotImages.push({ 'url': secondImage, 'preview': false }) : null
        thirdImage.length ? spotImages.push({ 'url': thirdImage, 'preview': false }) : null
        fourthImage.length ? spotImages.push({ 'url': fourthImage, 'preview': false }) : null
        fifthImage.length ? spotImages.push({ 'url': fifthImage, 'preview': false }) : null
        setSubmitted(true);
        let newSpot = await dispatch(createSpotThunk({ spotImages, ...form }))
        navigate(`/spots/${newSpot.id}`)
    }
    useEffect(() => {
        setIsLoaded(true);
    }, [])

    useEffect(() => {
        for (let key in form) {
            if (!form[key].length && submitted) {
                handleEmpty(key);
            }
        }
        handleEmpty('');
    }, [submitted, form])

    if (isLoaded) {

        return (
            <form>
                <div id="inner-form">
                    <h2>Create a Spot</h2>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation</p>
                    <div>
                        Country <b className='required-text'>{submitted && empty.country}</b>
                        <br></br>
                        <input placeholder="Country" onChange={(e) => handleInputChange(e, 'country')} />
                    </div>
                    <div>
                        Street Address <b className='required-text'>{submitted && empty.address}</b>
                        <br></br>
                        <input placeholder="Address" onChange={(e) => handleInputChange(e, 'address')} />
                    </div>
                    <div>
                        City <b className='required-text'>{submitted && empty.city}</b>
                        <br></br>
                        <input placeholder="City" onChange={(e) => handleInputChange(e, 'city')} />
                    </div>
                    <div>
                        State <b className='required-text'>{submitted && empty.state}</b>
                        <br></br>
                        <input placeholder="STATE" onChange={(e) => handleInputChange(e, 'state')} />
                    </div>

                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <input placeholder="Please write at least 30 characters" id="description" onChange={(e) => handleInputChange(e, 'description')} />
                        <br></br>
                        <b className='required-text'>{submitted && empty.description}</b>
                    </div>

                    <div>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                        <input placeholder="Name of your spot" onChange={(e) => handleInputChange(e, 'name')} />
                        <br></br>
                        <b className='required-text'>{submitted && empty.name}</b>
                    </div>

                    <div>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        $<input placeholder="Price per night (USD)" onChange={(e) => handleInputChange(e, 'price')} />
                        <br></br>
                        <b className='required-text'>{submitted && empty.price}</b>
                    </div>

                    <div id="form-bottom">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input placeholder="Preview Image URL" onChange={(e) => {
                            setPreviewImage(e.target.value)
                            e.target.value.length ? setPreviewDisabled(false) : setPreviewDisabled(true)
                        }} />
                        <input placeholder="Image URL" onChange={(e) => setSecondImage(e.target.value)} disabled={previewDisabled} />
                        <input placeholder="Image URL" onChange={(e) => setThirdImage(e.target.value)} disabled={previewDisabled} />
                        <input placeholder="Image URL" onChange={(e) => setFourthImage(e.target.value)} disabled={previewDisabled} />
                        <input placeholder="Image URL" onChange={(e) => setFifthImage(e.target.value)} disabled={previewDisabled} />
                        {/* <button id={disabled ? 'submit-disabled' : 'submit-button'} onClick={(e) => submitSpot(e)} disabled={disabled}>Create Spot</button> */}
                        <button id='submit-button' onClick={(e) => submitSpot(e)}>Create Spot</button>
                    </div>


                </div>
            </form>
        );
    }
    else return <h1>Loading...</h1>
}

export default CreateSpotForm;
