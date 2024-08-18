import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

export default function ErrorPage() {
    return (
        <main className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
            <Frown className='size-28 md:size-32'/>
            <h1 className='text-xl font-bold md:text-2xl'>Something Went Wrong.</h1>
            <p className='text-center w-80 md:text-lg md:w-96'>The page you're trying to find doesn't exists or we're moved to another address.</p>
            <Link to="/" className='btn btn-primary'>Back to main page.</Link>
            <h2 className='text-base-content/70 md:mt-2'>404 Error - Not Found.</h2>
        </main> 
    )
}