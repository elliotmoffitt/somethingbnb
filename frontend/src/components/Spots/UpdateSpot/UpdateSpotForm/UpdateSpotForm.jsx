import './UpdateSpotForm.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetailsThunk, updateSpot } from '../../../../store/spotsReducer';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSpotForm = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const spotDetails = useSelector(state => state.spots.byId[params.spotId]);
    const [isLoaded, setIsLoaded] = useState(false);
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

    useEffect(() => {
        setForm({ ...spotDetails })
    }, [setForm, spotDetails])

    const handleInputChange = (e, fieldName) => {
        setForm((prev) => {
            const newForm = { ...prev };
            newForm[fieldName] = e.target.value;
            return newForm;
        })
    }

    const submitSpot = async (e) => {
        e.preventDefault();
        setSubmitted(true);
            let updatedSpot = await dispatch(updateSpot(params.spotId, form))
            if (updatedSpot) {
                navigate(`/spots/${params.spotId}`)
            }
            else {
                console.log('failed')
            }

    }
    useEffect(() => {
        if (!spotDetails) {
            dispatch(getSpotDetailsThunk(params.spotId)).then(() => setIsLoaded(true));
        } else {
            setIsLoaded(true);
        }

    }, [dispatch, params.spotId, isLoaded, spotDetails]);
    if (isLoaded) {

        return (
            <form id='update-form'>
                <div id="inner-form">
                    <h1>Update Spot</h1>
                    <hr></hr>
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation</p>
                    <div>
                        <h3>Country</h3>
                        <br></br>
                        <input placeholder="Country" onChange={(e) => handleInputChange(e, 'country')} className='create-input' defaultValue={form.country}/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.country.length ? 'Country is required' : ''}</b>
                    </div>
                    <div>
                        <h3>Street Address</h3>
                        <br></br>
                        <input placeholder="Address" onChange={(e) => handleInputChange(e, 'address')} className='create-input' defaultValue={spotDetails.address}/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.address ? 'Address is required' : ''}</b>
                    </div>
                    <div>
                        <h3>City</h3>
                        <br></br>
                        <input placeholder="City" onChange={(e) => handleInputChange(e, 'city')} className='create-input' defaultValue={spotDetails.city}/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.city ? 'City is required' : ''}</b>
                    </div>
                    <div>
                        <h3>State</h3>
                        <br></br>
                        <input placeholder="STATE" onChange={(e) => handleInputChange(e, 'state')} className='create-input' defaultValue={spotDetails.state}/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.state ? 'State is required' : ''}</b>
                    </div>

                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <input placeholder="Please write at least 30 characters" id="description" onChange={(e) => handleInputChange(e, 'description')} className='create-input' defaultValue={spotDetails.description}/>
                        <br></br>
                        <b className='required-text'>{submitted && form.description.length < 30 ? 'Description needs a minimum of 30 characters' : ''}</b>
                    </div>

                    <div>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                        <input placeholder="Name of your spot" onChange={(e) => handleInputChange(e, 'name')} className='create-input' defaultValue={spotDetails.name}/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.name ? 'Name is required' : ''}</b>
                    </div>

                    <div>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        $<input placeholder="Price per night (USD)" onChange={(e) => handleInputChange(e, 'price')} className='create-input' defaultValue={spotDetails.price}/>
                        <br></br>
                        <b className='required-text'>{submitted && !form.price ? 'Price is required' : ''}</b>
                    </div>

                    <div id="form-bottom">
                        <button  id='submit-button'onClick={(e) => submitSpot(e)}>Update Spot</button>
                    </div>


                </div>
            </form>
        );
    }
    else return <h1>Loading...</h1>
}

export default UpdateSpotForm;
