import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import Hospitallistcard from "./Component/HospitalListCard";
import "./HospitalList.css";

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class Hospitallist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataRumahSakit: [],
            idProv: null,
            namaProv: null,
            idKota: null,
            namaKota: null,
            bedType: null,
            statusLoad: false,
        };
    }

    async componentDidMount() {
        let { idProv, idKota, bedType } = this.props.params;
        // let { nama } = ;
        await this.setState({
            idProv: idProv,
            idKota: idKota,
            bedType: bedType,
        });

        await fetch(`https://rs-bed-covid-api.vercel.app/api/get-provinces`)
            .then((response) => response.json())
            .then((data) => {
                data.provinces.map((dataProv) => {
                    if (dataProv.id == this.state.idProv) {
                        this.setState({
                            namaProv: dataProv.name,
                        });
                    }
                });
            });
        await fetch(`https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${this.state.idProv}`)
            .then((response) => response.json())
            .then((data) => {
                data.cities.map((dataKota) => {
                    // console.log(dataKota.name);
                    if (dataKota.id == this.state.idKota) {
                        this.setState({
                            namaKota: dataKota.name,
                        });
                    }
                });
            });

        await fetch(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${this.state.idProv}&cityid=${this.state.idKota}&type=${this.state.bedType}`)
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    dataRumahSakit: data.hospitals,
                    statusLoad: true,
                })
            );
        console.log(this.state.dataRumahSakit);
    }

    render() {
        return (
            <div id="daftarRumahSakit">
                {this.state.statusLoad === false ? (
                    <div className="container">
                        <div className="daftarRumahSakit-load">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="daftarRumahSakit-content">
                            <div className="navInformation">
                                <h1 className="daftarRumahSakit-title">Daftar Rumah Sakit</h1>
                                {this.state.bedType == 1 ? (
                                    <h6>
                                        Menampilkan Bed Covid untuk Provinsi {this.state.namaProv}, Kota {this.state.namaKota}{" "}
                                    </h6>
                                ) : (
                                    <h6 className="daftarRumahSakit-locationInfo">
                                        Menampilkan Bed Non-Covid untuk Provinsi {this.state.namaProv}, Kota {this.state.namaKota}{" "}
                                    </h6>
                                )}
                            </div>

                            <button className="buttonBacktoSearch btn btn-primary text-white">
                                <Link to={`/cek-bed-rs-indonesia-react/`}>
                                    <span className="cariLokLain">Cari lokasi lain</span>
                                </Link>
                            </button>

                            <div className="daftarRumahSakit">
                                {this.state.dataRumahSakit.map((rs) => (
                                    <Hospitallistcard
                                        key={rs.name}
                                        hospitalId={rs.id}
                                        bedType={this.state.bedType}
                                        hospitalName={rs.name}
                                        hospitalAddress={rs.address}
                                        hospitalUpdate={rs.info}
                                        bedAvail={rs.bed_availability}
                                        queue={rs.queue}
                                        hospitalPhone={rs.phone}
                                        idProv={this.state.idProv}
                                        idKota={this.state.idKota}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withParams(Hospitallist);
