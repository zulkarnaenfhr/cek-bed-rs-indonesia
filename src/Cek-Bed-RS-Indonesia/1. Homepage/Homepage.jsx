import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import Getprov from "./Component/GetProv";
import "./Homepage.css";

export default class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idProv: null,
            dataKota: [],
            loadKota: null,
            idKota: null,
            bedType: 1,
        };
        this.handleIdProv = this.handleIdProv.bind(this);
        this.handleKotaChange = this.handleKotaChange.bind(this);
        this.handleWilayahSubmit = this.handleWilayahSubmit.bind(this);
        this.handleBedType = this.handleBedType.bind(this);

        // buat autoclick
        this.buttonTriggerLink = createRef();
    }

    // buat ngambil kota dari prov change
    handleIdProv = (value) => {
        this.setState({
            idProv: value,
        });

        this.setState({
            loadKota: true,
        });

        fetch(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${this.state.idProv}`)
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    loadKota: false,
                    dataKota: data.cities,
                })
            );
    };

    // set state buat idKOta
    handleKotaChange = (event) => {
        this.setState({
            idKota: event.target.value,
        });
    };

    // buatHandleForm submit
    // jadi ini dialihin buat bisa pake react router link pake autoClick func
    handleWilayahSubmit = (e) => {
        e.preventDefault();

        this.buttonTriggerLink.current.click();
    };

    // set bed type
    handleBedType = (event) => {
        this.setState({
            bedType: event.target.value,
        });
    };

    render() {
        const loadKota = this.state.loadKota;
        const optionKota =
            loadKota === null ? (
                ""
            ) : loadKota === true ? (
                <option value="">Sedang Mengambil Data Kota</option>
            ) : (
                this.state.dataKota.map((kota) => (
                    <option key={kota.id} value={kota.id}>
                        {kota.name}
                    </option>
                ))
            );

        return (
            <div id="GetLocation">
                <div className="container GetLocation-container">
                    <p className="GetLocation-Title">
                        Cek Ketersediaan Bed
                        <br />
                        Rumah Sakit
                    </p>
                    <div className="form-container">
                        <p className="GetLocation-Desc">Pilih Lokasi Pengecekkan Ketersediaan Bed Rumah Sakit</p>
                        <hr />
                        <div className="linkSembuynyi">
                            <Link ref={this.buttonTriggerLink} to={`/cek-bed-rs-indonesia-react/hospitalList/idProv=${this.state.idProv}/idKota=${this.state.idKota}/bedType=${this.state.bedType}`}>
                                masuk ke menu 2
                            </Link>
                        </div>
                        <form action="" onSubmit={this.handleWilayahSubmit}>
                            {/* <div className="radio-toolbar" onChange={this.handleBedType}>
                                <label className="labelForm" htmlFor="">
                                    Bed Type
                                </label>
                                <br />
                                <button className="radioButton" type="button" disabled>
                                    <input required type="radio" id="Covid-Option" name="type" value={1} />
                                    <label htmlFor="Covid-Option">Covid</label>
                                </button>

                                <button className="radioButton" type="button" disabled>
                                    <input required type="radio" id="NonCovid-Option" name="type" value={2} />
                                    <label htmlFor="NonCovid-Option">Non-Covid</label>
                                </button>
                            </div> */}
                            <div class="radio-toolbar" onChange={this.handleBedType}>
                                <input type="radio" id="Covid-Option" name="type" value={1} required="required" />
                                <label for="Covid-Option">
                                    Covid
                                    <i class="iconChecked fas fa-check"></i>
                                </label>

                                <input type="radio" id="NonCovid-Option" name="type" value={2} />
                                <label for="NonCovid-Option">
                                    Non-Covid
                                    <i class="iconChecked fas fa-check"></i>
                                </label>
                            </div>

                            <label className="labelForm" htmlFor="">
                                Pilih Provinsi
                            </label>
                            <br />
                            <Getprov onProvChange={(value) => this.handleIdProv(value)} />
                            {/* {this.state.idProv === null ? <option value="">Piih Provinsi Terlebih dahulu</option> : <GetKota idProv={this.state.idProv} />} */}
                            {/* <GetKota idProv={this.state.idProv} /> */}
                            <br />
                            <label className="labelForm" htmlFor="">
                                Pilih Kota
                            </label>
                            <br />
                            <select required onChange={this.handleKotaChange} className="selectOption" name="" id="">
                                {this.state.loadKota === null && <option value="">Pilih Provinsi Terlebih Dahulu</option>}
                                {this.state.loadKota === false && <option value={""}>Pilih Kota</option>}
                                {optionKota}
                            </select>
                            <br />
                            <button className="buttonSubmit" type="submit">
                                Cari Rumah Sakit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
