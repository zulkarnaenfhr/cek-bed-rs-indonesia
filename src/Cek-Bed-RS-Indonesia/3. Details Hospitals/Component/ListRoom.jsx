import React, { Component } from "react";
import "./ListRoom.css";

export default class ListRoom extends Component {
    render() {
        return (
            <div className="cardListRoom">
                <div className="cardListRoom-body row">
                    <button class="buttonDropDown" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${this.props.index}`} aria-expanded="false" aria-controls={`collapseExample${this.props.index}`}>
                        <div className="row">
                            <div className="col-11">
                                <p className="bedTitle">{this.props.bedName}</p>
                                <p className="timeUpdate">{this.props.timeUpdate}</p>
                            </div>
                        </div>
                    </button>
                    <div className="collapse" id={`collapseExample${this.props.index}`}>
                        <div className="card-body">
                            <div className="row cardDetailsCollapse">
                                <div className="col-md-4">
                                    <div className="cardBed bedTersedia">
                                        <h6 className="informationCategory">Bed Tersedia</h6>
                                        <h6>{this.props.bedAvail}</h6>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="cardBed bedKosong">
                                        <h6 className="informationCategory">Bed Kosong</h6>
                                        <h6>{this.props.bedEmpty}</h6>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="cardBed bedAntri">
                                        <h6 className="informationCategory">Antrian</h6>
                                        <h6>{this.props.bedQueue}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
