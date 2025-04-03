// // src/features/movies/AddMovie.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addMovie } from './moviesSlice';
// import { useNavigate } from 'react-router-dom';

// const AddMovie = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: '',
//     yearOfRelease: '',
//     plot: '',
//     poster: '',
//     producer: '',
//     actors: [],
//     newProducer: null,
//     newActors: []
//   });

//   const handleChange = (e) => {
//     setMovieData({ ...movieData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(addMovie(movieData));
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Add Movie</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Movie Name:</label>
//           <input 
//             type="text" 
//             name="name" 
//             value={movieData.name} 
//             onChange={handleChange} 
//             required
//           />
//         </div>
//         <div>
//           <label>Year of Release:</label>
//           <input 
//             type="number" 
//             name="yearOfRelease" 
//             value={movieData.yearOfRelease} 
//             onChange={handleChange} 
//             required
//           />
//         </div>
//         <div>
//           <label>Plot:</label>
//           <textarea 
//             name="plot" 
//             value={movieData.plot} 
//             onChange={handleChange} 
//             required
//           />
//         </div>
//         <div>
//           <label>Poster URL:</label>
//           <input 
//             type="text" 
//             name="poster" 
//             value={movieData.poster} 
//             onChange={handleChange}
//           />
//         </div>
//         {/* 
//           Add fields or dropdowns for producer and actors if desired.
//           You can extend this form to also handle inline creation of new producers and actors.
//         */}
//         <button type="submit">Create Movie</button>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;


// src/features/movies/AddMovie.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from './moviesSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';

const AddMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Movie basic fields
  const [movieData, setMovieData] = useState({
    name: '',
    yearOfRelease: '',
    plot: '',
    poster: ''
  });

  // State for producer selection / creation
  const [useNewProducer, setUseNewProducer] = useState(false);
  const [producerId, setProducerId] = useState(''); // selected existing producer id
  const [newProducer, setNewProducer] = useState({
    name: '',
    username: '',
    gender: '',
    dob: '',
    bio: ''
  });
  const [producersList, setProducersList] = useState([]);

  // State for actors selection / creation
  const [useNewActors, setUseNewActors] = useState(false);
  const [selectedActors, setSelectedActors] = useState([]); // existing actor ids
  const [newActors, setNewActors] = useState([
    { name: '', username: '',gender: '', dob: '', bio: '' }
  ]);
  const [actorsList, setActorsList] = useState([]);

  // Fetch existing producers and actors from backend
  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const res = await axios.get('/producers');
        setProducersList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchActors = async () => {
      try {
        const res = await axios.get('/actors');
        setActorsList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducers();
    fetchActors();
  }, []);

  // Handle change for movie fields
  const handleMovieChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  // Handle new producer fields
  const handleNewProducerChange = (e) => {
    setNewProducer({ ...newProducer, [e.target.name]: e.target.value });
  };
 

  // Handle change for existing producer selection
  const handleProducerSelect = (e) => {
    setProducerId(e.target.value);
  };

  // Handle change for selected actors (existing)
  const handleActorsSelect = (e) => {
    // For multiple selection, e.target.selectedOptions is an array-like object
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedActors(values);
  };

  // Handle change for new actors fields
  const handleNewActorChange = (index, e) => {
    const updatedNewActors = newActors.map((actor, idx) => {
      if (idx === index) {
        return { ...actor, [e.target.name]: e.target.value };
      }
      return actor;
    });
    setNewActors(updatedNewActors);
  };

  // Add a new empty actor field row
  const addNewActorField = () => {
    setNewActors([...newActors, { name: '', username: '',gender: '', dob: '', bio: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the movie payload
    const payload = {
      ...movieData,
      // If using new producer, include newProducer object; otherwise, send existing producer id.
      producer: useNewProducer ? undefined : producerId,
      newProducer: useNewProducer ? newProducer : undefined,
      // For actors: if using new actors, include them; otherwise, send selected existing actor ids.
      actors: useNewActors ? [] : selectedActors,
      newActors: useNewActors ? newActors : undefined
    };

    try {
      await dispatch(addMovie(payload));
      navigate('/');
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        {/* Movie Basic Fields */}
        <div>
          <label>Movie Name:</label>
          <input 
            type="text" 
            name="name" 
            value={movieData.name} 
            onChange={handleMovieChange} 
            required
          />
        </div>
        <div>
          <label>Year of Release:</label>
          <input 
            type="number" 
            name="yearOfRelease" 
            value={movieData.yearOfRelease} 
            onChange={handleMovieChange} 
            required
          />
        </div>
        <div>
          <label>Plot:</label>
          <textarea 
            name="plot" 
            value={movieData.plot} 
            onChange={handleMovieChange} 
            required
          />
        </div>
        <div>
          <label>Poster URL:</label>
          <input 
            type="text" 
            name="poster" 
            value={movieData.poster} 
            onChange={handleMovieChange}
          />
        </div>

        {/* Producer Section */}
        <h3>Producer</h3>
        <div>
          <label>
            <input 
              type="radio" 
              checked={!useNewProducer}
              onChange={() => setUseNewProducer(false)}
            />
            Select Existing Producer
          </label>
          <label style={{ marginLeft: '1em' }}>
            <input 
              type="radio" 
              checked={useNewProducer}
              onChange={() => setUseNewProducer(true)}
            />
            Create New Producer
          </label>
        </div>

        {useNewProducer ? (
          <div>
            <input 
              type="text" 
              name="name" 
              placeholder="Producer Name" 
              value={newProducer.name} 
              onChange={handleNewProducerChange} 
              required
            />
            <input 
              type="text" 
              name="username" 
              placeholder="Producer username" 
              value={newProducer.username} 
              onChange={handleNewProducerChange} 
              required
            />
            <input 
              type="text" 
              name="gender" 
              placeholder="Gender" 
              value={newProducer.gender} 
              onChange={handleNewProducerChange} 
              required
            />
            <input 
              type="date" 
              name="dob" 
              placeholder="Date of Birth" 
              value={newProducer.dob} 
              onChange={handleNewProducerChange} 
              required
            />
            <textarea 
              name="bio" 
              placeholder="Bio" 
              value={newProducer.bio} 
              onChange={handleNewProducerChange} 
              required
            />
          </div>
        ) : (
          <div>
            <select 
              value={producerId} 
              onChange={handleProducerSelect} 
              required
            >
              <option value="">Select a Producer</option>
              {producersList.map((producer) => (
                <option key={producer._id} value={producer._id}>
                  {producer.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Actors Section */}
        <h3>Actors</h3>
        <div>
          <label>
            <input 
              type="radio" 
              checked={!useNewActors}
              onChange={() => setUseNewActors(false)}
            />
            Select Existing Actors
          </label>
          <label style={{ marginLeft: '1em' }}>
            <input 
              type="radio" 
              checked={useNewActors}
              onChange={() => setUseNewActors(true)}
            />
            Create New Actors
          </label>
        </div>

        {useNewActors ? (
          <div>
            {newActors.map((actor, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Actor Name" 
                  value={actor.name} 
                  onChange={(e) => handleNewActorChange(index, e)} 
                  required
                />
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Actor username" 
                  value={actor.username} 
                  onChange={(e) => handleNewActorChange(index, e)} 
                  required
                />
                <input 
                  type="text" 
                  name="gender" 
                  placeholder="Gender" 
                  value={actor.gender} 
                  onChange={(e) => handleNewActorChange(index, e)} 
                  required
                />
                <input 
                  type="date" 
                  name="dob" 
                  placeholder="Date of Birth" 
                  value={actor.dob} 
                  onChange={(e) => handleNewActorChange(index, e)} 
                  required
                />
                <textarea 
                  name="bio" 
                  placeholder="Bio" 
                  value={actor.bio} 
                  onChange={(e) => handleNewActorChange(index, e)} 
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addNewActorField}>
              Add Another Actor
            </button>
          </div>
        ) : (
          <div>
            <select 
              multiple 
              value={selectedActors} 
              onChange={handleActorsSelect} 
              required
            >
              {actorsList.map((actor) => (
                <option key={actor._id} value={actor._id}>
                  {actor.name}
                </option>
              ))}
            </select>
            <p>
              Hold Ctrl (or Cmd on Mac) to select multiple actors.
            </p>
          </div>
        )}

        <button type="submit">Create Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
