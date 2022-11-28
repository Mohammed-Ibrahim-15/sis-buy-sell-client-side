import React from 'react';
import toast from 'react-hot-toast';

const Banner2 = () => {
    const notify = () => {
        toast.success('Thanks !! We Will Let You Know Soon')
    }
    return (
        <div>
            <div className="hero bg-base-300 bg-opacity-80">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bW9iaWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80" className="w-1/2 h-[600px] rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-4xl font-bold">Happy New Year Offer Coming Soon !!</h1>
                        <p className="py-6"></p>
                        <button onClick={() => notify()} className="btn btn-primary">Stay With Us</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner2;