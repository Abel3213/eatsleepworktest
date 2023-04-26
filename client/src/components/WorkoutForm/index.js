import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_WORKOUT } from '../../utils/mutations';
import { QUERY_WORKOUTS } from '../../utils/queries';

const WorkoutForm = () => {
    const [formState, setFormState] = useState({
        workoutName: '',
        description: '',
        caloriesBurned: '',
        exercises: ''
    });

    const [addWorkout] = useMutation(ADD_WORKOUT, {
        update(cache, { data: { addWorkout } }) {
            // read what's currently in the cache
            const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });

            // prepend the newest thought to the front of the array
            cache.writeQuery({
                query: QUERY_WORKOUTS,
                data: { workouts: [addWorkout, ...workouts] }
            });
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addWorkout({
                variables: { ...formState },
            });


        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <input
                    className="form-input"
                    placeholder="Workout Name"
                    name="workoutName"
                    type="workoutName"
                    id="workoutName"
                    value={formState.workoutName}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="Describe your workout!"
                    name="description"
                    type="description"
                    id="description"
                    value={formState.description}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="How many calories did you burn?"
                    name="caloriesBurned"
                    type="caloriesBurned"
                    id="caloriesBurned"
                    value={formState.caloriesBurned}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="exercises"
                    name="exercises"
                    type="exercises"
                    id="exercises"
                    value={formState.exercises}
                    onChange={handleChange}
                />
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default WorkoutForm;