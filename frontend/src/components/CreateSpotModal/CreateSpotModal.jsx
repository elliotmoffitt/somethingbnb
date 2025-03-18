import './CreateSpotModal.css';

const CreateSpotModal = () => {
    return (
        <form>
            <div id="inner-form">
                <h2>Create a Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <div>
                    Country
                    <br></br>
                    <input placeholder="Country" />
                </div>

                <div>
                    Street Address
                    <br></br>
                    <input placeholder="Address" />
                </div>
                <div>
                    Street Address
                    <br></br>
                    <input placeholder="Address" />
                </div>
                <div>
                    City
                    <br></br>
                    <input placeholder="City" />
                </div>
                <div>
                    State
                    <br></br>
                    <input placeholder="STATE" />
                </div>

                <div>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <input placeholder="Please write at least 30 characters" id="description" />
                </div>

                <div>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input placeholder="Name of your spot" />
                </div>

                <div>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    $<input placeholder="Price per night (USD)" />
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
                    <button>Create Spot</button>
                </div>


            </div>
        </form>
    );
}

export default CreateSpotModal;
