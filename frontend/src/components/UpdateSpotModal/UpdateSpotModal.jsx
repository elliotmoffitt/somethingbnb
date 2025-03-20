import './UpdateSpotModal.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotDetails, updateSpot } from '../../store/spotsReducer';
import Spot from '../Spot';

const UpdateSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const spotDetails = useSelector(state => state.spotsStore.entries)
    // console.log(spotDetails, 'UPDATESPOTDETAILS')

    const [isLoaded, setIsLoaded] = useState(false);

    const [currSpot, setCurrSpot] = useState({})
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
    console.log(form)

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

    const handleImageUrl = (e, preview) => {
        spotImages.push({ 'url': e.target.value, 'preview': preview })
    }

    const submitSpot = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // console.log(form, 'FORM');
        return dispatch(updateSpot({ spotImages, ...form }))
        // .then(closeModal)
        // .catch(async (res) => {
        //   const data = await res.json();
        //   if (data?.errors) {
        //     setErrors(data.errors);
        //   }
        // });
        // for (let key in form) {
        //     !form[key].length ? handleEmpty(form[key]): ''
        // }
    }
    // useEffect(() => {
    //     const spot = dispatch(fetchSpotDetails())
        // console.log(spot)
    //     setIsLoaded(true);
    // }, [])

    useEffect(() => {
        dispatch(fetchSpotDetails(spot.id))
        setForm({ ...spot })
        setIsLoaded(true)
    }, [dispatch, spot.id]);
    // console.log(form)
    // useEffect(() => {
    //     for (let key in form) {
    //         if (!form[key].length && submitted) {
    //             handleEmpty(key);
    //             // console.log(key)
    //         }
    //     }
    //     handleEmpty('');
    // }, [submitted, form])

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
                        <input placeholder="Country" onChange={(e) => handleInputChange(e, 'country')} defaultValue={spot.country} />
                    </div>
                    <div>
                        Street Address <b className='required-text'>{submitted && empty.address}</b>
                        <br></br>
                        <input placeholder="Address" onChange={(e) => handleInputChange(e, 'address')} defaultValue={spot.address} />
                    </div>
                    <div>
                        City <b className='required-text'>{submitted && empty.city}</b>
                        <br></br>
                        <input placeholder="City" onChange={(e) => handleInputChange(e, 'city')} defaultValue={spot.city} />
                    </div>
                    <div>
                        State <b className='required-text'>{submitted && empty.state}</b>
                        <br></br>
                        <input placeholder="STATE" onChange={(e) => handleInputChange(e, 'state')} defaultValue={spot.state} />
                    </div>

                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <input placeholder="Please write at least 30 characters" id="description" onChange={(e) => handleInputChange(e, 'description')} defaultValue={spot.description} />
                        <br></br>
                        <b className='required-text'>{submitted && empty.description}</b>
                    </div>

                    <div>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                        <input placeholder="Name of your spot" onChange={(e) => handleInputChange(e, 'name')} defaultValue={spot.name} />
                        <br></br>
                        <b className='required-text'>{submitted && empty.name}</b>
                    </div>

                    <div>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        $<input placeholder="Price per night (USD)" onChange={(e) => handleInputChange(e, 'price')} defaultValue={spot.price} />
                        <br></br>
                        <b className='required-text'>{submitted && empty.price}</b>
                    </div>

                    <div id="form-bottom">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input placeholder="Preview Image URL" onChange={(e) => handleImageUrl(e, true)} defaultValue={spot.previewImage} />
                        <input placeholder="Image URL" onChange={(e) => handleImageUrl(e, false)} defaultValue={spotDetails.SpotImages && spotDetails.SpotImages[1] ? spotDetails.SpotImages[1].url : ''} />
                        <input placeholder="Image URL" onChange={(e) => handleImageUrl(e, false)} defaultValue={spotDetails.SpotImages && spotDetails.SpotImages[2] ? spotDetails.SpotImages[2].url : ''} />
                        <input placeholder="Image URL" onChange={(e) => handleImageUrl(e, false)} defaultValue={spotDetails.SpotImages && spotDetails.SpotImages[3] ? spotDetails.SpotImages[3].url : ''} />
                        <input placeholder="Image URL" onChange={(e) => handleImageUrl(e, false)} defaultValue={spotDetails.SpotImages && spotDetails.SpotImages[4] ? spotDetails.SpotImages[4].url : ''} />
                        <input placeholder="Image URL" onChange={(e) => handleImageUrl(e, false)} defaultValue={spotDetails.SpotImages && spotDetails.SpotImages[5] ? spotDetails.SpotImages[5].url : ''} />
                        <button onClick={(e) => submitSpot(e)}>Update Spot</button>
                    </div>


                </div>
            </form>
        );
    }
    else return <h1>Loading...</h1>
}

export default UpdateSpotModal;
