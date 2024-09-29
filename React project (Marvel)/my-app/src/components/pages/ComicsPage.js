import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                {/*  <CharListSecond onCharSelected={onCharSelected} /> */}
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;