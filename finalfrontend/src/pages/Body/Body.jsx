import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Rules } from '../Rules/Rules';
import { InGame } from '../InGame/InGame';
import { Ranking } from '../Ranking/Ranking';


export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />  
                <Route path="/rules" element={<Rules />} />
                <Route path="/play" element={<InGame />} />
                <Route path="/ranking" element={<Ranking />} />
            </Routes>
        </>
    )
}