
import { useState} from "react";
import { useForm } from "react-hook-form";
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import $ from 'jquery'
import { useSelector } from "react-redux";

function CountryCityPage() {
    // Token 
    // const token = localStorage.getItem('token');
    const { userData: { token, user } } = useSelector(state => state.auth)

     // For City Form Data 
     let [cityData, setCityData] = useState({
        city: '',
        applicable_taxes: '',
        country_id: '',

      });

      const CityhandleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        cityData[name] = value;
        
        setCityData(cityData);
        
    };
// For Image Data 
    const [selectedImage, setSelectedImage] = useState();


    const [country, setCountry] = useState(true);
    const [city, setCity] = useState(false);
    // For Country Data 

    // const [inputValue, setValue] = useState();
    const [selectedValue, setSelectedValue] = useState();

    // handle Input Change Event 

    const handleInputChange = value => {
        // setValue(value);
    }


    // handle Selection 

    const handleChange = value => {

        cityData['country_id'] = value.id;
        
        setCityData(cityData);
  
        setSelectedValue(value);
    }

    const fetchCountryData = () => {
        return axios.get("http://localhost:8000/api/country", { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                const data = response.data;
                console.log(data)
                return data;
            })
            .catch((error) => {
                console.error(error);
            });
    }
 


    // For Open Country and City Modal

    const openCity = (e) => {
        setCountry(false);
        setCity(true);
        e.target.classList.add('active');
        $('#country').removeClass('active');
    }

    const openCountry = (e) => {
        setCountry(true);
        setCity(false);
        e.target.classList.add('active');
        $('#city').removeClass('active');
    }

    // For Save Country Form Data 
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        let dd = new FormData();
        dd.append('country_image', selectedImage);
        dd.append('country', data.country);
        dd.append('currency', data.currency);

        console.log(dd,'country form data');

        // Send a POST request

        axios.post("http://localhost:8000/api/country", dd, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                console.log(response,"country data");
            })
            .catch((error) => {
                console.error(error);
            });

    };


    // For Save City Form Data 
    let saveCityData = (e) => {
        e.preventDefault();
        
        axios.post("http://34.238.78.173/api/city",cityData, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
              
                console.log(response,'from city api');
            })
            .catch((error) => {
                console.error(error);
            });
      }


    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }

    };

    // This function will be triggered when the "X" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
    };

    return (
        <>
            <div class="row">

                <div class="col-lg-12">

                    <div class="card mb-4">

                        <div class="card-body">
                            <h3 className="ml-5 colorblack bold">Country Management</h3>
                            <div className="mt-4 text-center">
                                <div class="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" class="btn btn-outline-warning active" id="country" onClick={openCountry}>Country</button>
                                    <button type="button" class="btn btn-outline-warning" onClick={openCity} id="city">City</button>

                                </div>
                                &nbsp;&nbsp;
                                {
                                    country && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CountryModal">Add</button>)
                                }
                                {
                                    city && (<button type="button" class="btn btn-outline-dark" style={{ minWidth: '20%', float: 'right' }} data-toggle="modal" data-target="#CityModal">Add</button>)
                                }

                            </div>
                        </div>
                    </div>


                </div>


            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <table id="example" class="table table-striped table-bordered" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tiger Nixon</td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td>2011/04/25</td>
                                    <td>$320,800</td>
                                </tr>
                                <tr>
                                    <td>Garrett Winters</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>63</td>
                                    <td>2011/07/25</td>
                                    <td>$170,750</td>
                                </tr>
                                <tr>
                                    <td>Ashton Cox</td>
                                    <td>Junior Technical Author</td>
                                    <td>San Francisco</td>
                                    <td>66</td>
                                    <td>2009/01/12</td>
                                    <td>$86,000</td>
                                </tr>
                                <tr>
                                    <td>Cedric Kelly</td>
                                    <td>Senior Javascript Developer</td>
                                    <td>Edinburgh</td>
                                    <td>22</td>
                                    <td>2012/03/29</td>
                                    <td>$433,060</td>
                                </tr>
                                <tr>
                                    <td>Airi Satou</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>33</td>
                                    <td>2008/11/28</td>
                                    <td>$162,700</td>
                                </tr>
                                <tr>
                                    <td>Brielle Williamson</td>
                                    <td>Integration Specialist</td>
                                    <td>New York</td>
                                    <td>61</td>
                                    <td>2012/12/02</td>
                                    <td>$372,000</td>
                                </tr>
                                <tr>
                                    <td>Herrod Chandler</td>
                                    <td>Sales Assistant</td>
                                    <td>San Francisco</td>
                                    <td>59</td>
                                    <td>2012/08/06</td>
                                    <td>$137,500</td>
                                </tr>
                                <tr>
                                    <td>Rhona Davidson</td>
                                    <td>Integration Specialist</td>
                                    <td>Tokyo</td>
                                    <td>55</td>
                                    <td>2010/10/14</td>
                                    <td>$327,900</td>
                                </tr>
                                <tr>
                                    <td>Colleen Hurst</td>
                                    <td>Javascript Developer</td>
                                    <td>San Francisco</td>
                                    <td>39</td>
                                    <td>2009/09/15</td>
                                    <td>$205,500</td>
                                </tr>
                                <tr>
                                    <td>Sonya Frost</td>
                                    <td>Software Engineer</td>
                                    <td>Edinburgh</td>
                                    <td>23</td>
                                    <td>2008/12/13</td>
                                    <td>$103,600</td>
                                </tr>
                                <tr>
                                    <td>Jena Gaines</td>
                                    <td>Office Manager</td>
                                    <td>London</td>
                                    <td>30</td>
                                    <td>2008/12/19</td>
                                    <td>$90,560</td>
                                </tr>
                                <tr>
                                    <td>Quinn Flynn</td>
                                    <td>Support Lead</td>
                                    <td>Edinburgh</td>
                                    <td>22</td>
                                    <td>2013/03/03</td>
                                    <td>$342,000</td>
                                </tr>
                                <tr>
                                    <td>Charde Marshall</td>
                                    <td>Regional Director</td>
                                    <td>San Francisco</td>
                                    <td>36</td>
                                    <td>2008/10/16</td>
                                    <td>$470,600</td>
                                </tr>
                                <tr>
                                    <td>Haley Kennedy</td>
                                    <td>Senior Marketing Designer</td>
                                    <td>London</td>
                                    <td>43</td>
                                    <td>2012/12/18</td>
                                    <td>$313,500</td>
                                </tr>
                                <tr>
                                    <td>Tatyana Fitzpatrick</td>
                                    <td>Regional Director</td>
                                    <td>London</td>
                                    <td>19</td>
                                    <td>2010/03/17</td>
                                    <td>$385,750</td>
                                </tr>
                                <tr>
                                    <td>Michael Silva</td>
                                    <td>Marketing Designer</td>
                                    <td>London</td>
                                    <td>66</td>
                                    <td>2012/11/27</td>
                                    <td>$198,500</td>
                                </tr>
                                <tr>
                                    <td>Paul Byrd</td>
                                    <td>Chief Financial Officer (CFO)</td>
                                    <td>New York</td>
                                    <td>64</td>
                                    <td>2010/06/09</td>
                                    <td>$725,000</td>
                                </tr>
                                <tr>
                                    <td>Gloria Little</td>
                                    <td>Systems Administrator</td>
                                    <td>New York</td>
                                    <td>59</td>
                                    <td>2009/04/10</td>
                                    <td>$237,500</td>
                                </tr>
                                <tr>
                                    <td>Bradley Greer</td>
                                    <td>Software Engineer</td>
                                    <td>London</td>
                                    <td>41</td>
                                    <td>2012/10/13</td>
                                    <td>$132,000</td>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            {/* Country Modal */}
            <div class="modal fade" id="CountryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add Country</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Name</label>
                                        <input {...register("country", { required: false, maxLength: 20 })} />
                                        {/* <input type="text" className="from-control" /> */}
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Currency</label>
                                        <input {...register("currency", { required: false, maxLength: 20 })} />

                                        {/* <input type="text" className="from-control" /> */}
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        <label className="colorblack bold">Upload Image</label>

                                        <input
                                            accept="image/*"
                                            type="file"
                                            name="country_image"
                                            onChange={imageChange}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 mt-4">
                                        {selectedImage && (

                                            <div className="col-md-12 col-lg-12 " >
                                                <button onClick={removeSelectedImage} className="btn btn-sm mr-4" style={{ float: 'right', color: 'black', fontWeight: 'bolder' }}>
                                                    X
                                                </button><br />
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="country_image"
                                                    style={{ maxWidth: '80%', minWidth: '80%', maxHeight: '130px' }}
                                                />

                                            </div>
                                        )}


                                    </div>

                                </div>
                            </div>

                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Add Country</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* City MOdal  */}
            <div class="modal fade" id="CityModal" tabindex="-1" role="dialog" aria-labelledby="CityModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title ml-auto colorblack bold" id="exampleModalLongTitle" >Add City</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={saveCityData}>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Country Name</label>
                                        <AsyncSelect
                                            cacheOptions
                                            defaultOptions
                                            value={selectedValue}
                                            getOptionLabel={e => e.country} 
                                            getOptionValue={e => e.id}
                                            loadOptions={fetchCountryData} 
                                            onInputChange={handleInputChange}
                                            onChange={handleChange}

                                        />

                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">City</label>
                                        <input className="form-control" type="text" name="city" onChange={CityhandleChange} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12">
                                        <label className="colorblack bold">Payable Tax</label>
                                        <input className="form-control" type="text" name="applicable_taxes" onChange={CityhandleChange} />
                                    </div>
                                    
                                    
                                
                                </div>
                            </div>

                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="submit" class="btn btn-primary">Add Country</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryCityPage
