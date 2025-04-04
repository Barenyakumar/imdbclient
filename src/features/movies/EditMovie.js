// // src/features/movies/EditMovie.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchMovies, updateMovie } from './moviesSlice';

// const EditMovie = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { items: movies, status } = useSelector(state => state.movies);

//   const [movieData, setMovieData] = useState({
//     name: '',
//     yearOfRelease: '',
//     plot: '',
//     poster: '',
//     producer: '',
//     actors: []
//   });

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchMovies());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     const movie = movies.find(m => m._id === movieId);
//     if (movie) {
//       setMovieData({
//         name: movie.name,
//         yearOfRelease: movie.yearOfRelease,
//         plot: movie.plot,
//         poster: movie.poster || '',
//         producer: movie.producer?._id || '',
//         actors: movie.actors?.map(a => a._id) || []
//       });
//     }
//   }, [movies, movieId]);

//   const handleChange = (e) => {
//     setMovieData({ ...movieData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(updateMovie({ movieId, updatedData: movieData }));
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Edit Movie</h2>
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
//         {/* Additional fields for producer and actors can be added here */}
//         <button type="submit">Update Movie</button>
//       </form>
//     </div>
//   );
// };

// export default EditMovie;
// src/features/movies/EditMovie.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchMovies, updateMovie } from './moviesSlice';
// import axios from '../../api/axiosInstance';

// const EditMovie = () => {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { items: movies, status } = useSelector(state => state.movies);

//   // Basic movie fields state
//   const [movieData, setMovieData] = useState({
//     name: '',
//     yearOfRelease: '',
//     plot: '',
//     poster: ''
//   });

//   // Producer section state
//   const [useNewProducer, setUseNewProducer] = useState(false);
//   const [producerId, setProducerId] = useState('');
//   const [newProducer, setNewProducer] = useState({
//     name: '',
//     gender: '',
//     dob: '',
//     bio: ''
//   });
//   const [producersList, setProducersList] = useState([]);

//   // Actors section state
//   const [useNewActors, setUseNewActors] = useState(false);
//   const [selectedActors, setSelectedActors] = useState([]); // IDs for existing actors
//   const [newActors, setNewActors] = useState([
//     { name: '', gender: '', dob: '', bio: '' }
//   ]);
//   const [actorsList, setActorsList] = useState([]);

//   // Fetch producers and actors from backend
//   useEffect(() => {
//     const fetchProducers = async () => {
//       try {
//         const res = await axios.get('/producers');
//         setProducersList(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     const fetchActors = async () => {
//       try {
//         const res = await axios.get('/actors');
//         setActorsList(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducers();
//     fetchActors();
//   }, []);

//   // Fetch movies if status is idle
//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchMovies());
//     }
//   }, [status, dispatch]);

//   // Set initial form values from the selected movie
//   useEffect(() => {
//     const movie = movies.find(m => m._id === movieId);
//     if (movie) {
//       setMovieData({
//         name: movie.name,
//         yearOfRelease: movie.yearOfRelease,
//         plot: movie.plot,
//         poster: movie.poster || ''
//       });
//       // For producer, assume existing producer by default
//       setProducerId(movie.producer?._id || '');
//       // For actors, assume existing actors by default
//       setSelectedActors(movie.actors?.map(a => a._id) || []);
//     }
//   }, [movies, movieId]);

//   // Handlers for movie fields
//   const handleMovieChange = (e) => {
//     setMovieData({ ...movieData, [e.target.name]: e.target.value });
//   };

//   // Producer handlers
//   const handleNewProducerChange = (e) => {
//     setNewProducer({ ...newProducer, [e.target.name]: e.target.value });
//   };

//   const handleProducerSelect = (e) => {
//     setProducerId(e.target.value);
//   };

//   // Actors handlers for existing actors
//   const handleActorsSelect = (e) => {
//     const values = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedActors(values);
//   };

//   // Handlers for new actors
//   const handleNewActorChange = (index, e) => {
//     const updatedNewActors = newActors.map((actor, idx) => {
//       if (idx === index) {
//         return { ...actor, [e.target.name]: e.target.value };
//       }
//       return actor;
//     });
//     setNewActors(updatedNewActors);
//   };

//   const addNewActorField = () => {
//     setNewActors([...newActors, { name: '', gender: '', dob: '', bio: '' }]);
//   };

//   // Submit handler to dispatch the update API call
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...movieData,
//       // If using new producer, send newProducer data; otherwise, send selected producer id.
//       producer: useNewProducer ? undefined : producerId,
//       newProducer: useNewProducer ? newProducer : undefined,
//       // For actors: if using new actors, send newActors; otherwise, send selected actor IDs.
//       actors: useNewActors ? [] : selectedActors,
//       newActors: useNewActors ? newActors : undefined
//     };
//     await dispatch(updateMovie({ movieId, updatedData: payload }));
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Edit Movie</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Movie Basic Fields */}
//         <div>
//           <label>Movie Name:</label>
//           <input 
//             type="text"
//             name="name"
//             value={movieData.name}
//             onChange={handleMovieChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Year of Release:</label>
//           <input
//             type="number"
//             name="yearOfRelease"
//             value={movieData.yearOfRelease}
//             onChange={handleMovieChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Plot:</label>
//           <textarea
//             name="plot"
//             value={movieData.plot}
//             onChange={handleMovieChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Poster URL:</label> 
//           <input
//             type="text"
//             name="poster"
//             value={movieData.poster}
//             onChange={handleMovieChange}
//           />
//         </div>

//         {/* Producer Section */}
//         <h3>Producer</h3>
//         <div>
//           <label>
//             <input 
//               type="radio" 
//               checked={!useNewProducer}
//               onChange={() => setUseNewProducer(false)}
//             />
//             Select Existing Producer
//           </label>
//           <label style={{ marginLeft: '1em' }}>
//             <input 
//               type="radio" 
//               checked={useNewProducer}
//               onChange={() => setUseNewProducer(true)}
//             />
//             Create New Producer
//           </label>
//         </div>
//         {useNewProducer ? (
//           <div>
//             <input 
//               type="text" 
//               name="name" 
//               placeholder="Producer Name" 
//               value={newProducer.name} 
//               onChange={handleNewProducerChange} 
//               required
//             />
//             <input 
//               type="text" 
//               name="gender" 
//               placeholder="Gender" 
//               value={newProducer.gender} 
//               onChange={handleNewProducerChange} 
//               required
//             />
//             <input 
//               type="date" 
//               name="dob" 
//               placeholder="Date of Birth" 
//               value={newProducer.dob} 
//               onChange={handleNewProducerChange} 
//               required
//             />
//             <textarea 
//               name="bio" 
//               placeholder="Bio" 
//               value={newProducer.bio} 
//               onChange={handleNewProducerChange} 
//               required
//             />
//           </div>
//         ) : (
//           <div>
//             <select 
//               value={producerId} 
//               onChange={handleProducerSelect} 
//               required
//             >
//               <option value="">Select a Producer</option>
//               {producersList.map((producer) => (
//                 <option key={producer._id} value={producer._id}>
//                   {producer.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Actors Section */}
//         <h3>Actors</h3>
//         <div>
//           <label>
//             <input 
//               type="radio" 
//               checked={!useNewActors}
//               onChange={() => setUseNewActors(false)}
//             />
//             Select Existing Actors
//           </label>
//           <label style={{ marginLeft: '1em' }}>
//             <input 
//               type="radio" 
//               checked={useNewActors}
//               onChange={() => setUseNewActors(true)}
//             />
//             Create New Actors
//           </label>
//         </div>
//         {useNewActors ? (
//           <div>
//             {newActors.map((actor, index) => (
//               <div key={index} style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}>
//                 <input 
//                   type="text" 
//                   name="name" 
//                   placeholder="Actor Name" 
//                   value={actor.name} 
//                   onChange={(e) => handleNewActorChange(index, e)} 
//                   required
//                 />
//                 <input 
//                   type="text" 
//                   name="gender" 
//                   placeholder="Gender" 
//                   value={actor.gender} 
//                   onChange={(e) => handleNewActorChange(index, e)} 
//                   required
//                 />
//                 <input 
//                   type="date" 
//                   name="dob" 
//                   placeholder="Date of Birth" 
//                   value={actor.dob} 
//                   onChange={(e) => handleNewActorChange(index, e)} 
//                   required
//                 />
//                 <textarea 
//                   name="bio" 
//                   placeholder="Bio" 
//                   value={actor.bio} 
//                   onChange={(e) => handleNewActorChange(index, e)} 
//                   required
//                 />
//               </div>
//             ))}
//             <button type="button" onClick={addNewActorField}>
//               Add Another Actor
//             </button>
//           </div>
//         ) : (
//           <div>
//             <select 
//               multiple 
//               value={selectedActors} 
//               onChange={handleActorsSelect} 
//               required
//             >
//               {actorsList.map((actor) => (
//                 <option key={actor._id} value={actor._id}>
//                   {actor.name}
//                 </option>
//               ))}
//             </select>
//             <p>Hold Ctrl (or Cmd on Mac) to select multiple actors.</p>
//           </div>
//         )}
//         <button type="submit">Update Movie</button>
//       </form>
//     </div>
//   );
// };

// export default EditMovie;


// src/features/movies/EditMovie.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies, updateMovie } from './moviesSlice';
import axios from '../../api/axiosInstance';

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: movies, status } = useSelector(state => state.movies);

  // Basic movie fields state
  const [movieData, setMovieData] = useState({
    name: '',
    yearOfRelease: '',
    plot: '',
    poster: ''
  });

  // Producer section state
  const [useNewProducer, setUseNewProducer] = useState(false);
  const [producerId, setProducerId] = useState('');
  const [newProducer, setNewProducer] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: ''
  });
  const [producersList, setProducersList] = useState([]);

  // Actors section state
  const [useNewActors, setUseNewActors] = useState(false);
  const [selectedActors, setSelectedActors] = useState([]); // IDs for existing actors
  const [newActors, setNewActors] = useState([
    { name: '', gender: '', dob: '', bio: '' }
  ]);
  const [actorsList, setActorsList] = useState([]);

  // Fetch producers and actors from backend
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

  // Fetch movies if status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  // Set initial form values from the selected movie
  useEffect(() => {
    const movie = movies.find(m => m._id === movieId);
    if (movie) {
      setMovieData({
        name: movie.name,
        yearOfRelease: movie.yearOfRelease,
        plot: movie.plot,
        poster: movie.poster || ''
      });
      // For producer, assume existing producer by default
      setProducerId(movie.producer?._id || '');
      // For actors, assume existing actors by default
      setSelectedActors(movie.actors?.map(a => a._id) || []);
    }
  }, [movies, movieId]);

  // Handlers for movie fields
  const handleMovieChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  // Producer handlers
  const handleNewProducerChange = (e) => {
    setNewProducer({ ...newProducer, [e.target.name]: e.target.value });
  };

  const handleProducerSelect = (e) => {
    setProducerId(e.target.value);
  };

  // Actors handlers for existing actors (using checkboxes)
  const handleActorCheckboxChange = (actorId, isChecked) => {
    if (isChecked) {
      setSelectedActors(prev => [...prev, actorId]);
    } else {
      setSelectedActors(prev => prev.filter(id => id !== actorId));
    }
  };

  // Handlers for new actors
  const handleNewActorChange = (index, e) => {
    const updatedNewActors = newActors.map((actor, idx) => {
      if (idx === index) {
        return { ...actor, [e.target.name]: e.target.value };
      }
      return actor;
    });
    setNewActors(updatedNewActors);
  };

  const addNewActorField = () => {
    setNewActors([...newActors, { name: '', gender: '', dob: '', bio: '' }]);
  };

  // Submit handler to dispatch the update API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...movieData,
      // If using new producer, send newProducer data; otherwise, send selected producer id.
      producer: useNewProducer ? undefined : producerId,
      newProducer: useNewProducer ? newProducer : undefined,
      // For actors: if using new actors, send newActors; otherwise, send selected actor IDs.
      actors: useNewActors ? [] : selectedActors,
      newActors: useNewActors ? newActors : undefined
    };
    await dispatch(updateMovie({ movieId, updatedData: payload }));
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Movie</h2>
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
            {/* Using checkboxes for selecting multiple actors */}
            {actorsList.map(actor => (
              <div key={actor._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedActors.includes(actor._id)}
                    onChange={(e) => handleActorCheckboxChange(actor._id, e.target.checked)}
                  />
                  {actor.name}
                </label>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
