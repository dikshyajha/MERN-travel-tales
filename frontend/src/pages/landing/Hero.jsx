import React, { useState } from 'react';
import hero2 from '../../assets/images/hero2.jpg'
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import '../../index.css'

export const Hero = () => {
    return (
        <div className="hero fixed inset-0 flex">
            {/* <div className="absolute top-0 left-0 p-4">
                <Link to="/">
                    <img src={logo4} alt="Logo" className="pl-8 w-60 h-16" />

                </Link>
            </div> */}
            <div className="w-1/3 h-full flex items-center justify-center pl-12 pt-28 pb-8 mr-8">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${hero2})` }}>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-2/3 flex flex-col pt-40 pl-24 mr-96 bg-white bg-opacity-80">
                <h1 className="text-6xl mb-4 tracking-tight tenor-sans-regular" style={{ color: '#4a5e37' }} >Uncover the Unknown</h1>
                <p className="text-xl mb-6 leading-relaxed assistant-regular pt-6">
                    Discover breathtaking new destinations, connect with like-minded travel buddies, and share your adventures with our vibrant community of travelers. Whether you're an experienced explorer or new to travel, our platform helps you plan your next escape, find insider tips, and create unforgettable memories with fellow adventurers.
                </p>
                <Link to='/auth/signin'>
                    <Button
                        size="lg"
                        className="text-lg font-semibold pt-6 py-4"
                        styles={{
                            root: {
                                background: '#228b22',
                                borderRadius: '9999px',
                                transition: 'background-color 0.3s ease',

                            },
                        }}
                    >
                        Explore Now
                    </Button>
                </Link>
            </div>
        </div>
    );
};















// export const Hero = () => {
//     return (
//         <div className="hero fixed inset-0 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${seascape4})`, opacity: 0.9 }}>
//             {/* Overlay Gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-sea-green via-light-cyan to-sky-blue opacity-30"></div>

//             {/* Content Wrapper */}
//             <div className="flex h-full items-center justify-center text-center text-black">
//                 {/* Content */}
//                 <div className="p-10">
//                     <h1 className="text-6xl font-bold mb-4 tracking-tight">Uncover the Unknown</h1>
//                     <p className="text-lg mb-6 leading-relaxed">
//                         Discover new destinations, find travel buddies, and share your adventures with our vibrant community of travelers.
//                     </p>
//                     <Link to='/auth/signin'>
//                         <Button color="#22c55e" size="lg" radius="md" className="text-lg font-semibold py-8 shadow-lg">
//                             Explore Now
//                         </Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const textColor = '#ffffff'

// export const Hero = () => {
//     return (
//         <div className="hero fixed inset-0 filter overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${forest2})`, opacity: 0.9 }}>
//             <div className="absolute inset-0 bg-gradient-to-r from-lime-950 via-slate-950 to-orange-950 opacity-30"></div>

//             <div className="flex h-full">
//                 {/* Left-aligned Content */}
//                 <div className="flex flex-col justify-center text-white p-10 pl-20">
//                     <h1 className="text-7xl font-bold mb-4 tracking-tight">Uncover the Unknown</h1>
//                     <p className="text-lg mb-6 leading-relaxed ">
//                         Discover new destinations, find travel buddies, and share your adventures with our vibrant community of travelers.
//                     </p>
//                     <Link to='/auth/signin'>
//                         <Button color="#22c55e" size="lg" radius="md" className="text-lg font-semibold py-8 shadow-lg">
//                             Explore Now
//                         </Button>
//                     </Link>
//                 </div>

//                 {/* Background Image with Opacity */}
//                 <div className="bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${forest2})`, filter: 'blur(5px)' }}></div>
//             </div>
//         </div>
//     );
// };





// mountain 1 and 2

// export const Hero = () => {
//     return (
//         <div className="hero fixed inset-0 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${mountain1})` }}>
//             <div className="absolute inset-0 bg-gradient-to-b from-emerald-400 via-teal-500 to-teal-600 opacity-40"></div>

//             <div className="flex flex-col items-center justify-center h-full text-center text-white p-10">
//                 <h1 className="text-6xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>Uncover the Unknown</h1>
//                 <p className="text-lg mb-6 leading-relaxed" style={{ color: textColor }}>
//                     Discover new destinations, find travel buddies, and share your adventures with our vibrant community of travelers.
//                 </p>
//                 <Link to='/auth/signin'>
//                     <Button color="#14b8a6" size="lg" radius="md" className="text-lg font-semibold py-8 shadow-lg">
//                         Explore Now
//                     </Button>
//                 </Link>
//             </div>
//         </div>
//     );
// };



