import React, { useEffect } from 'react';

const RedirectDashboard = () => {
    useEffect(()=>{
        window.location.href="https://portfolio-dashboard-front-end.vercel.app"
    },[])
    return (
        <div className='text-center font-semibold text-lg min-h-[70vh]'>
            Redericting ...
        </div>
    );
};

export default RedirectDashboard;