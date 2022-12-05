import React, { Component } from "react";
import Homepage from "./1. Homepage/Homepage";
import Hospitallist from "./2. Hospital List/HospitalList";
import { Routes, Route } from "react-router-dom";
import Detailshospitals from "./3. Details Hospitals/DetailsHospitals";

class Cekbedrs extends Component {
    render() {
        return (
            <div>
                {/* {this.state.menuStatus === 1 ? (
                    <Homepage onWilayahSubmit={(idProv, idKota, bedType) => this.homepageLocationSubmit(idProv, idKota, bedType)} />
                ) : (
                    <Hospitallist idProv={this.state.idProv} idKota={this.state.idKota} bedType={this.state.bedType} />
                )} */}
                <Routes>
                    <Route path="/cek-bed-rs-indonesia-react/" element={<Homepage />} />
                    <Route path="/cek-bed-rs-indonesia-react/hospitalList/idProv=:idProv/idKota=:idKota/bedType=:bedType" element={<Hospitallist />} />
                    <Route path="/cek-bed-rs-indonesia-react/hospitalDetails/idProv=:idProv/idKota=:idKota/hospitalId=:hospitalId/bedType=:bedType" element={<Detailshospitals />} />
                </Routes>
            </div>
        );
    }
}

export default Cekbedrs;
