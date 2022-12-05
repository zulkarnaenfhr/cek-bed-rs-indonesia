import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HospitalListCard.css";

class Hospitallistcard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body row">
                    <div className="col-md-8">
                        <h5 className="hospitalName">{this.props.hospitalName}</h5>
                        <h6 className="hospitalAddress">{this.props.hospitalAddress}</h6>
                        <h6 className="infoUpdate">{this.props.hospitalUpdate}</h6>
                    </div>
                    <div className="col-md-4 row1-rightSide">
                        {this.props.bedAvail !== 0 ? (
                            <h6 className="informasiTersedia">
                                Tersedia : <span>{this.props.bedAvail}</span>
                            </h6>
                        ) : (
                            <h6 className="noAvailability">Maaf, Bed Penuh !</h6>
                        )}
                        <h6>
                            Antri : <span>{this.props.queue}</span>
                        </h6>
                        {/* <p>idHospital {this.props.hospitalId}</p>
                        <p>bedType {this.props.bedType}</p> */}
                    </div>
                </div>
                <div className="card-body row card-row2">
                    <div className="col-md-6">
                        <button className="buttonCall btn btn-primary">
                            <i className="fas fa-phone"></i>
                            <a href={`tel:${this.props.hospitalPhone}`}>{this.props.hospitalPhone}</a>
                        </button>
                    </div>
                    <div className="col-md-6">
                        <div className="row row2-rightSide">
                            <div className="col-6">
                                <a href={`https://www.google.co.id/maps/search/${this.props.hospitalName}`}>
                                    <button className="buttonHospitalInformation btn btn-primary">
                                        maps <i className="fas fa-map-marker-alt"></i>
                                    </button>
                                </a>
                            </div>
                            <div className="col-6 buttonInformasiRight">
                                <button className="buttonHospitalInformation btn btn-primary">
                                    <Link to={`/cek-bed-rs-indonesia-react/hospitalDetails/idProv=${this.props.idProv}/idKota=${this.props.idKota}/hospitalId=${this.props.hospitalId}/bedType=${this.props.bedType}`}>
                                        <span className="detailsButton">Details</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hospitallistcard;
