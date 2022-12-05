import React, { Component } from "react";
import Homepage from "./1. Homepage/Homepage";
import Hospitallist from "./2. Hospital List/HospitalList";
import { Routes, Route } from "react-router-dom";
import Detailshospitals from "./3. Details Hospitals/DetailsHospitals";

class Cekbedrs extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/hospitalList/idProv=:idProv/idKota=:idKota/bedType=:bedType" element={<Hospitallist />} />
                    <Route path="/hospitalDetails/idProv=:idProv/idKota=:idKota/hospitalId=:hospitalId/bedType=:bedType" element={<Detailshospitals />} />
                </Routes>
            </div>
        );
    }
}

export default Cekbedrs;
