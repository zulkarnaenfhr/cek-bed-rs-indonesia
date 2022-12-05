import React, { Component } from "react";
import "./DetailsHospitals.css";
import { Link, useParams } from "react-router-dom";
import ListRoom from "./Component/ListRoom";

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class Detailshospitals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detailsHospital: [],
            statusLoadDetailsHospital: false,
            idProv: null,
            idKota: null,
            bedType: null,
            hospitalId: null,
        };
    }

    async componentDidMount() {
        const { hospitalId, bedType, idProv, idKota } = this.props.params;

        this.setState({
            hospitalId: hospitalId,
            bedType: bedType,
            idProv: idProv,
            idKota: idKota,
        });

        await fetch(`https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${hospitalId}&type=${bedType}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    detailsHospital: data.data,
                    statusLoadDetailsHospital: true,
                });
            });
        console.log(this.state.detailsHospital.bedDetail);
    }

    render() {
        return (
            <div>
                {this.state.statusLoadDetailsHospital === false ? (
                    <div className="container">
                        <div className="daftarRumahSakit-load">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id="detailsHospital">
                        <div className="container">
                            <div className="detailsHospital-content row">
                                <div className="navInformation">
                                    <h1 className="detailsHospital-title">Details Rumah Sakit</h1>
                                    <h6>{this.state.detailsHospital.name}</h6>
                                    <h6>{this.state.detailsHospital.address}</h6>
                                    <div className="row rowGoto">
                                        <div className="col-xl-2 col-lg-6">
                                            <a href={`tel:${this.state.detailsHospital.phone}`}>
                                                <button className="buttonCall btn btn-primary">
                                                    <i
                                                        className="fas fa-phone"
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    ></i>
                                                    {this.state.detailsHospital.phone}
                                                </button>
                                            </a>
                                        </div>
                                        <div className="col-xl-4 col-lg-6">
                                            <a href={`https://www.google.co.id/maps/search/${this.state.detailsHospital.name}`}>
                                                <button className="buttonHospitalInformation btn btn-primary">
                                                    Maps{" "}
                                                    <i
                                                        style={{
                                                            marginLeft: "10px",
                                                        }}
                                                        className="fas fa-map-marker-alt"
                                                    ></i>
                                                </button>
                                            </a>
                                        </div>
                                        <div
                                            className="col-xl-6 col-lg-12"
                                            style={{
                                                display: "flex",
                                                justifyContent: "right",
                                            }}
                                        >
                                            <div className="buttonBacktoSearch2 btn btn-primary">
                                                <Link to={`/cek-bed-rs-indonesia-react/hospitalList/idProv=${this.state.idProv}/idKota=${this.state.idKota}/bedType=${this.state.bedType}`}>
                                                    <span className="cariRsLain">Cari Rumah Sakit Lain</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.detailsHospital.bedDetail.map((data, index) => (
                                    <ListRoom key={data.stats.title} index={index} timeUpdate={data.time} bedName={data.stats.title} bedAvail={data.stats.bed_available} bedEmpty={data.stats.bed_empty} bedQueue={data.stats.queue} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withParams(Detailshospitals);
