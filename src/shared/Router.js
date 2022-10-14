import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Detail from '../pages/Detail';
import List from '../pages/List'
import Write from '../pages/Write'

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List />}/>
                <Route path="/write" element={<Write />}/>
                <Route path="/write/:id" element={<Write />}/>
                <Route path="/detail" element={<Detail />}/>
                <Route path="/detail/:id" element={<Detail />}/>
            </Routes>
        </BrowserRouter>
    );
};
