import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-max w-full" style={{ backgroundImage: `url('https://images.anandtech.com/doci/15246/DSC_0085_678x452.jpg')` }}>
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">This is our SIS Buy-Sell Website</h1>
                        <p className="mb-5">Welcome to our online shop. You can buy used mobile phone easily from here. Trusted shop with a lot of options. Happy Shopping !!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;