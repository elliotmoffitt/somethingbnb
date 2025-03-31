import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CreateSpotForm.css';
import { createSpotThunk } from '../../../../store/spotsReducer';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewDisabled, setPreviewDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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


    const spotImages = [];

    const handleInputChange = (e, fieldName) => {
        setForm((prev) => {
            const newForm = { ...prev };
            newForm[fieldName] = e.target.value;
            return newForm;
        })
    }

    const submitSpot = async (e) => {
        e.preventDefault();
        previewImage.length ? spotImages.push({ 'url': previewImage, 'preview': true }) : null
        secondImage.length ? spotImages.push({ 'url': secondImage, 'preview': false }) : null
        thirdImage.length ? spotImages.push({ 'url': thirdImage, 'preview': false }) : null
        fourthImage.length ? spotImages.push({ 'url': fourthImage, 'preview': false }) : null
        fifthImage.length ? spotImages.push({ 'url': fifthImage, 'preview': false }) : null
        setSubmitted(true);
        if (
            (previewImage && (previewImage.slice(-4) === '.jpg')
            || (previewImage.slice(-5) === '.jpeg')
            || (previewImage.slice(-4) === '.png'))

        ) {
            let newSpot = await dispatch(createSpotThunk({ spotImages, ...form }))
            navigate(`/spots/${newSpot.id}`)
        }
    }
    useEffect(() => {
        setIsLoaded(true);
    }, [])

    if (isLoaded) {

        return (
            <form id='create-form'>
                <div id="inner-form">
                    <h1>Create a Spot</h1>
                    <hr></hr>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation</p>
                    <div>
                        <h3>Country</h3>
                        <br></br>
                        <input placeholder="Country" onChange={(e) => handleInputChange(e, 'country')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.country.length ? 'Country is required' : ''}</b>
                    </div>
                    <div>
                        <h3>Street Address</h3>
                        <br></br>
                        <input placeholder="Address" onChange={(e) => handleInputChange(e, 'address')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.address ? 'Address is required' : ''}</b>
                    </div>
                    <div>
                        <h3>City</h3>
                        <br></br>
                        <input placeholder="City" onChange={(e) => handleInputChange(e, 'city')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.city ? 'City is required' : ''}</b>
                    </div>
                    <div>
                        <h3>State</h3>
                        <br></br>
                        <input placeholder="STATE" onChange={(e) => handleInputChange(e, 'state')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.state ? 'State is required' : ''}</b>
                    </div>

                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <input placeholder="Please write at least 30 characters" id="description" onChange={(e) => handleInputChange(e, 'description')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && form.description.length < 30 ? 'Description needs a minimum of 30 characters' : ''}</b>
                    </div>

                    <div>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                        <input placeholder="Name of your spot" onChange={(e) => handleInputChange(e, 'name')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.name ? 'Name is required' : ''}</b>
                    </div>

                    <div>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        $<input placeholder="Price per night (USD)" onChange={(e) => handleInputChange(e, 'price')} className='create-input'/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.price ? 'Price is required' : ''}</b>
                    </div>

                    <div id="form-bottom">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <b className='required-text'>{submitted && !previewImage ? 'Preview Image is required' : ""}</b>
                        <b className='required-text'>{previewImage && ((submitted && previewImage.slice(previewImage.length - 5) !== '.jpeg')
                        && (submitted && previewImage.slice(previewImage.length - 4) !== '.jpg')
                        && (submitted && previewImage.slice(previewImage.length - 4) !== '.png'))
                        ? 'Image URL must end in .png, .jpg, or .jpeg' : ''}</b>
                        <input placeholder="Preview Image URL" onChange={(e) => {
                            setPreviewImage(e.target.value)
                            e.target.value.length ? setPreviewDisabled(false) : setPreviewDisabled(true)
                        }} className='create-input' />
                        <b className='required-text'>{secondImage && ((submitted && secondImage.slice(secondImage.length - 5) !== '.jpeg')
                        && (submitted && secondImage.slice(secondImage.length - 4) !== '.jpg')
                        && (submitted && secondImage.slice(secondImage.length - 4)) !== '.png')
                        ? 'Image URL must end in .png, .jpg, or .jpeg' : ''}</b>
                        <input placeholder="Image URL" onChange={(e) => setSecondImage(e.target.value)} disabled={previewDisabled} className='create-input'/>
                        <b className='required-text'>{thirdImage && ((submitted && thirdImage.slice(thirdImage.length - 5) !== '.jpeg')
                        && (submitted && thirdImage.slice(thirdImage.length - 4) !== '.jpg')
                        && (submitted && thirdImage.slice(thirdImage.length - 4) !== '.png'))
                        ? 'Image URL must end in .png, .jpg, or .jpeg' : ''}</b>
                        <input placeholder="Image URL" onChange={(e) => setThirdImage(e.target.value)} disabled={previewDisabled} className='create-input'/>
                        <b className='required-text'>{fourthImage && ((submitted && fourthImage.slice(fourthImage.length - 5) !== '.jpeg')
                        && (submitted && fourthImage.slice(fourthImage.length - 4) !== '.jpg')
                        && (submitted && fourthImage.slice(fourthImage.length - 4) !== '.png'))
                        ? 'Image URL must end in .png, .jpg, or .jpeg' : ''}</b>
                        <input placeholder="Image URL" onChange={(e) => setFourthImage(e.target.value)} disabled={previewDisabled} className='create-input'/>
                        <b className='required-text'>{fifthImage && ((submitted && fifthImage.slice(fifthImage.length - 5) !== '.jpeg')
                        && (submitted && fifthImage.slice(fifthImage.length - 4) !== '.jpg')
                        && (submitted && fifthImage.slice(fifthImage.length - 4) !== '.png'))
                        ? 'Image URL must end in .png, .jpg, or .jpeg' : ''}</b>
                        <input placeholder="Image URL" onChange={(e) => setFifthImage(e.target.value)} disabled={previewDisabled} className='create-input'/>
                        <button id='submit-button' onClick={(e) => submitSpot(e)}>Create Spot</button>
                    </div>


                </div>
            </form>
        );
    }
    else return <h1>Loading...</h1>
}

export default CreateSpotForm;
