import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ booking, setBooking }) => {
    const { user } = useContext(AuthContext)
    const { name, resale_price, img } = booking

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value
        const userEmail = form.userEmail.value
        const phoneName = form.phoneName.value
        const resalePrice = form.resalePrice.value
        const phone = form.phone.value
        const location = form.location.value

        const booking = {
            userName,
            userEmail,
            phoneName,
            img,
            resalePrice,
            phone,
            location
        }

        fetch('https://sis-buy-sell-server-side.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setBooking(null)
                    toast.success('Booking Confirm')
                }
            })
    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Device Name: {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 mt-4'>

                        <input name='userName' type="text" value={user?.displayName} disabled placeholder="Type here" className="input input-bordered input-primary w-full" />

                        <input name='userEmail' type="text" value={user?.email} disabled placeholder="Type here" className="input input-bordered input-primary w-full" />
                        <input name='phoneName' type="text" value={name} disabled placeholder="Type here" className="input input-bordered input-primary w-full" />
                        <input name='resalePrice' type="text" value={'$' + resale_price} disabled placeholder="Type here" className="input input-bordered input-primary w-full" />
                        <input name='phone' type="text" placeholder="Enter Phone Number" className="input input-bordered input-primary w-full" required />
                        <input name='location' type="text" placeholder="Enter Location" className="input input-bordered input-primary w-full" required />
                        <br />
                        <input className='w-full btn btn-primary' type="submit" value='Submit' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;