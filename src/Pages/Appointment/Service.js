import React from 'react';

const Service = ({ service }) => {
    const { name, slots } = service
    return (
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title text-secondary">{name}</h2>
                <p>{slots.length > 0 ?
                    <span>{slots[0]}</span> :
                    <span className='text-red-500'>Service Unavailable.</span>

                }</p>
                <p>{slots.length > 0 ?
                    <span>{slots.length} slots available</span> :
                    <span>Try another day? </span>
                }</p>
                <div class="card-actions justify-center mt-2">
                    <button disabled={slots.length === 0} class="btn btn-primary text-white uppercase">Book Appointment</button>

                </div>
            </div>
        </div>
    );
};

export default Service;