import React, { Component } from 'react'

// importando o arquivo .css
import './Conversor.css'

export default class Componente extends Component {
    // é padrão
    constructor(props){
       
        super(props);

        // armazena o valor no estado do componente
        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0        
        }

        // para poder acessar a propriedade baind
        // toda fun no js possui o bind e ela vai ser dentro da 
        // fun o this
        this.converter = this.converter.bind(this)
    }

    converter() {

        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?apiKey=do-not-use-this-key&q=${de_para}&compact=y`;
        
        fetch(url)
            .then(res => {

                return res.json();
            })
            .then(
                json => {
                    let cotacao = json[de_para].val;
                    let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao.toFixed(2))
                    // vai entender que é moedaB_valor: moedaB_valor
                    this.setState({moedaB_valor});
                }
            )
    }



    render(){
        return (
            <div className="conversor"> 
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" onChange={(event) => {
                    this.setState({moedaA_valor:event.target.value})
                    this.converter();
                    }}></input>
                {/* <input type="button" onClick={this.converter} value="Converter"></input> */}
                <h2>{this.state.moedaB_valor}</h2>
            </div>
        )
    }
}