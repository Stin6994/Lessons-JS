import Spinner from '../components/spinner/spinner';
import ErrorMassage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            /* break; */
        case 'loading':
            return <Skeleton />;
            /* break; */
        case 'confirmed':
            return <Component data={data} />;
            /* break; */
        case 'error':
            return <ErrorMassage />;
            /* break; */
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;