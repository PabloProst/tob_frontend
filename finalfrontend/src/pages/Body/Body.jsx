import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Rules } from '../Rules/Rules';
import { InGame } from '../InGame/InGame';
import { Ranking } from '../Ranking/Ranking';
import { About } from '../About/About';
import { Profile } from '../Profile/Profile';
import { Achievements } from '../Achievements/Achievements';
import { AdminPanel } from '../AdminPanel/AdminPanel';
import { AllUsers } from '../AllUsers/AllUsers';


export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />  
                <Route path="/rules" element={<Rules />} />
                <Route path="/play" element={<InGame />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/users" element={<AllUsers />} />
            </Routes>
        </>
    )
}