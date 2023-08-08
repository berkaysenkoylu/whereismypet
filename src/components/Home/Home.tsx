import { useNavigate } from 'react-router-dom';

import CtaBanner from '../CtaBanner/CtaBanner';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <CtaBanner
                title="Let's Bring Them Back – Report a Missing stuff!"
                buttonName='<Create a post />'
                buttonClick={() => navigate('/new-poster')}
            />
        </>
    );
}

export default Home;