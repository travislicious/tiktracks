import { Link } from 'react-router-dom';
import { WifiOff } from 'lucide-react';

export default function ErrorSection() {
    return (
        <main className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
            <WifiOff className='size-28 md:size-32'/>
            <h1 className='text-xl font-bold md:text-2xl'>Something Went Wrong.</h1>
            <p className='text-center w-80 md:text-lg md:w-96'>An error occured. It may be in your device or our servers. Please check your Internet connection and try again.</p>
            <Link to="/" className='btn btn-primary'>Back to main page.</Link>
        </main> 
    )
}