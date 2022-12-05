import React, { Component } from "react";
import "./SelectComp.css";

class Getprov extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataKota: [],
            loadProv: null,
            idProv: null,
        };
        this.loadProvData = this.loadProvData.bind(this);
        this.handleProvChange = this.handleProvChange.bind(this);
    }

    handleProvChange = async (event) => {
        await this.setState({
            idProv: event.target.value,
        });
        this.props.onProvChange(this.state.idProv);
    };

    loadProvData = async () => {
        this.setState({
            loadProv: true,
        });

        await fetch("https://rs-bed-covid-api.vercel.app/api/get-provinces")
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    loadProv: false,
                    dataProv: data.provinces,
                })
            );
    };

    componentDidMount() {
        this.loadProvData();
    }

    render() {
        const loadProv = this.state.loadProv;
        const optionProv =
            loadProv === null ? (
                <option value="">Menunggu</option>
            ) : loadProv === true ? (
                <option value="">Sedang mengambil data</option>
            ) : (
                this.state.dataProv.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                        {prov.name}
                    </option>
                ))
            );

        return (
            <select onChange={this.handleProvChange} className="selectOption" required>
                {this.state.loadProv === false && <option value="">Pilih Provinsi Kamu</option>}
                {optionProv}
            </select>
        );
    }
}

export default Getprov;
