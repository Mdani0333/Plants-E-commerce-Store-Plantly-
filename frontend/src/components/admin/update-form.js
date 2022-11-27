import React, { useState, useContext } from "react";
import "../../login/form.css";
import "./product-form.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../Pages/NotFound";
import { ProductsContext } from "../../context-hooks/ProductsContext";

export function UpdateForm({ admin, adminToken }) {
  const { id } = useParams();
  const products = useContext(ProductsContext);

  const view = products.find((x) => x._id == id);

  const [airfreshner, setAirfreshner] = useState(view.benefits.airFreshner);
  const [otherbenefits, setOtherbenefits] = useState(
    view.benefits.otherBenefits
  );
  const [animalFriendly, setAnimalfriendly] = useState(
    view.cautions.animalFriendly
  );
  const [poisonous, setPoisonous] = useState(view.cautions.poisonous);
  const [deathOnConsumption, setDeathOnConsumption] = useState(
    view.cautions.deathOnConsumption
  );

  //States
  const [data, setData] = useState({
    name: view.name,
    category: view.category,
    specie: view.specie,
    image: view.image,
    price: view.price,
    instock: view.instock,
    description: view.description,
    temprature: view.temprature,
    humidity: view.humidity,
    water: view.water,
    light: view.light,
    height: view.height,
    benefits: {
      airFreshner: airfreshner,
      otherBenefits: otherbenefits,
    },
    cautions: {
      animalFriendly: animalFriendly,
      poisonous: poisonous,
      deathOnConsumption: deathOnConsumption,
    },
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //Handlechange
  function handleChange({ currentTarget: input }) {
    setData({ ...data, [input.name]: input.value });
  }

  //axois request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const url = `http://localhost:8080/products/update/${id}`;
      const { data: res } = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setLoading(false);
      setSuccess(res.message);
    } catch (error) {
      if (
        (error.response && error.response.status >= 400) ||
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {adminToken ? (
        <div>
          <form className="form-container" onSubmit={handleSubmit}>
            <h3>Update Product</h3>
            <br />
            <div class="form-group required">
              <label for="exampleInputUsername1" className="control-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                placeholder="Enter name"
                value={data.name}
                onChange={handleChange}
                required
                name="name"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="category" className="control-label">
                Category
              </label>
              <input
                type="text"
                class="form-control"
                id="category"
                placeholder="Enter category"
                value={data.category}
                onChange={handleChange}
                required
                name="category"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="specie" className="control-label">
                Specie
              </label>
              <input
                type="text"
                class="form-control"
                id="specie"
                placeholder="Enter specie"
                value={data.specie}
                onChange={handleChange}
                required
                name="specie"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="image" className="control-label">
                Image link
              </label>
              <input
                type="url"
                class="form-control"
                id="image"
                placeholder="Image Link..."
                value={data.image}
                onChange={handleChange}
                required
                name="image"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="price" className="control-label">
                Price
              </label>
              <input
                type="number"
                class="form-control"
                id="price"
                placeholder="Enter product price"
                value={data.price}
                onChange={handleChange}
                required
                name="price"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="instock" className="control-label">
                InStock
              </label>
              <input
                type="number"
                class="form-control"
                id="instock"
                placeholder="InStock"
                value={data.instock}
                onChange={handleChange}
                required
                name="instock"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="des" className="control-label">
                Description
              </label>
              <textarea
                class="form-control"
                id="des"
                placeholder="Write description..."
                value={data.description}
                onChange={handleChange}
                required
                name="description"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="temp" className="control-label">
                temprature
              </label>
              <input
                type="text"
                class="form-control"
                id="temp"
                placeholder="temprature range"
                value={data.temprature}
                onChange={handleChange}
                required
                name="temprature"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="humidity" className="control-label">
                humidity
              </label>
              <input
                type="number"
                class="form-control"
                id="humidity"
                placeholder="humidity"
                value={data.humidity}
                onChange={handleChange}
                required
                name="humidity"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="water" className="control-label">
                Water
              </label>
              <input
                type="number"
                class="form-control"
                id="water"
                placeholder="water per day"
                value={data.water}
                onChange={handleChange}
                required
                name="water"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="light" className="control-label">
                Light
              </label>
              <input
                type="text"
                class="form-control"
                id="light"
                placeholder="light per day"
                value={data.light}
                onChange={handleChange}
                required
                name="light"
              />
            </div>
            <br />

            <div class="form-group required">
              <label for="height" className="control-label">
                Height
              </label>
              <input
                type="text"
                class="form-control"
                id="height"
                placeholder="Height range"
                value={data.height}
                onChange={handleChange}
                required
                name="height"
              />
            </div>
            <br />

            <div class="form-group required">
              <label className="control-label">Benefits:</label>
              <br />
              <label className="checkbox-label">Air ReFreshner</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="airfreshner"
                  id="yes"
                  defaultChecked={airfreshner}
                  onChange={() => {
                    setAirfreshner(!airfreshner);
                  }}
                />
                <label class="form-check-label" for="yes">
                  Yes
                </label>
              </div>
            </div>
            <br />

            <div class="form-group required">
              <label for="otherbenefits" className="control-label">
                Other Benefits
              </label>
              <textarea
                class="form-control"
                id="otherbenefits"
                placeholder="Write benefits..."
                value={otherbenefits}
                onChange={(e) => setOtherbenefits(e.target.value)}
                required
                name="otherBenefits"
              />
            </div>
            <br />
            <br />

            <div class="form-group required">
              <label className="control-label">Cautions:</label>
              <br />
              <label className="checkbox-label">Animal Friendly </label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="animalFriendly"
                  id="yes-animal"
                  defaultChecked={animalFriendly}
                  onChange={() => {
                    setAnimalfriendly(!animalFriendly);
                  }}
                />
                <label class="form-check-label" for="yes-animal">
                  Yes
                </label>
              </div>
              <br />

              <label className="checkbox-label">Poisonous</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="poisonous"
                  id="yes-poisonous"
                  defaultChecked={poisonous}
                  onChange={() => {
                    setPoisonous(!poisonous);
                  }}
                />
                <label class="form-check-label" for="yes-poisonous">
                  Yes
                </label>
              </div>
              <br />

              <label className="checkbox-label">Death On Consumption</label>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="death"
                  id="yes-death"
                  defaultChecked={deathOnConsumption}
                  onChange={() => {
                    setDeathOnConsumption(!deathOnConsumption);
                  }}
                />
                <label class="form-check-label" for="yes-death">
                  Yes
                </label>
                <br />
              </div>
            </div>
            <br />
            <br />
            <br />

            {!loading && (
              <button type="submit" class="btn btn-primary">
                Upload
              </button>
            )}
            {loading && (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            )}
            <br />

            {error && <div className="redSpan">{error}</div>}
            {success && <div className="greenSpan">{success}</div>}
            <br />
            <br />
          </form>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
