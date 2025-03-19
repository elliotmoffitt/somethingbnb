import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './CreateSpotModal.css';
import * as spotReducer from '../../store/spotReducer';

const CreateSpotModal = () => {
    const dispatch = useDispatch();
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
        'SpotImages': [],
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

    const handleInputChange = (e, fieldName) => {
        setForm((prev) => {
            const newForm = {...prev};
            newForm[fieldName] = e.target.value;
            return newForm;
        })
    }

    const handleEmpty = (fieldName) => {
        setEmpty((prev) => {
            const newForm = {...prev};
            newForm[fieldName] = `${fieldName} is required`;
            return newForm;
        })
    }

    const submitSpot = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log(form);
        return dispatch(
            spotReducer.createSpot({
                ...form
                // form.country,
                // form.address,
                // form.city,
                // form.state,
                // form.description,
                // form.name,
                // form.price,
                            })
        )
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

    useEffect(() => {
        for (let key in form) {
             if (!form[key].length && submitted) {
                handleEmpty(key);
                console.log(key)
             }
        }
        handleEmpty('');
    }, [submitted, form])

    return (
        <form>
            <div id="inner-form">
                <h2>Create a Spot</h2>
                <h3>Where&apos;s your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <div>
                    Country <b className='required-text'>{submitted && empty.country}</b>
                    <br></br>
                    <input placeholder="Country" onChange={(e) => handleInputChange(e, 'country')}/>
                </div>
                <div>
                    Street Address <b className='required-text'>{submitted && empty.address}</b>
                    <br></br>
                    <input placeholder="Address" onChange={(e) => handleInputChange(e, 'address')}/>
                </div>
                <div>
                    City <b className='required-text'>{submitted && empty.city}</b>
                    <br></br>
                    <input placeholder="City" onChange={(e) => handleInputChange(e, 'city')}/>
                </div>
                <div>
                    State <b className='required-text'>{submitted && empty.state}</b>
                    <br></br>
                    <input placeholder="STATE" onChange={(e) => handleInputChange(e, 'state')}/>
                </div>

                <div>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <input placeholder="Please write at least 30 characters" id="description" onChange={(e) => handleInputChange(e, 'description')}/>
                    <br></br>
                    <b className='required-text'>{submitted && empty.description}</b>
                </div>

                <div>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <input placeholder="Name of your spot" onChange={(e) => handleInputChange(e, 'name')}/>
                    <br></br>
                    <b className='required-text'>{submitted && empty.name}</b>
                </div>

                <div>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    $<input placeholder="Price per night (USD)" onChange={(e) => handleInputChange(e, 'price')}/>
                    <br></br>
                    <b className='required-text'>{submitted && empty.price}</b>
                </div>

                <div id="form-bottom">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input placeholder="Preview Image URL" />
                    <input placeholder="Image URL" />
                    <input placeholder="Image URL" />
                    <input placeholder="Image URL" />
                    <input placeholder="Image URL" />
                    <input placeholder="Image URL" />
                    <button onClick={(e) => submitSpot(e)}>Create Spot</button>
                </div>


            </div>
        </form>
    );
}

export default CreateSpotModal;
