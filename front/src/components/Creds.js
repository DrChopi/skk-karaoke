import React from 'react'
import Utils from '../modules/utils'

export default class Creds extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login_username : "",
            login_password : "",
            subscribe_mail : "",
            subscribe_password : "",
            subscribe_username : ""
        }
    }

    componentDidMount() {
        this.render.bind(this)
        this.api = Utils.parseCookie().api_url
    }

    toggle (e) {
        e.preventDefault()
        if (e.target === window.document.querySelector('.creds') || e.target === window.document.querySelector('.head > a')) {
            let tar = window.document.querySelector('.creds')
            tar.style.display = tar.style.display === "none" ? "block" : "none"
        }
    }

    updateChange (e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    switch () {
        let list = window.document.querySelectorAll('.forms > form')
        list[0].style.display = (list[0].style.display === "none")? "block" : "none"
        list[1].style.display = (list[0].style.display === "none")? "block" : "none"
    }

    async connect (e) {
        Utils.setCookie('usr_jwt_session', (await Utils.post(this.api + '/login', {
            mail : this.state.login_username,
            password : this.state.login_password
        })).data, 3); document.location.reload()
    }

    async subscribe (e) {
        Utils.setCookie('usr_jwt_session', (await Utils.post(this.api + '/subscribe', {
            pseudo : this.state.subscribe_username,
            mail : this.state.subscribe_mail,
            password : this.state.subscribe_password
        })).data, 3); document.location.reload()
    }

    render() {
        return <a onClick={ this.toggle }>S'inscrire<div className="creds" style={{ display : "none" }}>
            <div>
                <div className="forms">
                    <form id="login" style={{ display : "none" }}>
                        <h3>Bon retour parmis nous !</h3>
                        <label>Nom d'utilisateur</label>
                        <input name="login_username" type="text" placeholder="kenat" value={ this.state.login_username } onChange={ this.updateChange.bind(this) } />
                        <label>Mot de passe</label>
                        <input name="login_password" type="password" placeholder="super_password" value={ this.state.login_password } onChange={ this.updateChange.bind(this) } />
                        <button onClick={ this.connect.bind(this) }>Se connecter</button>
                        <span onClick={ this.switch }>Pas encore de compte ? S'inscrire</span>
                    </form>
                    <form id="subscribe" style={{ display : "block" }}>
                        <h3>Bienvenue parmis nous !</h3>
                        <label>Nom d'utilisateur</label>
                        <input name="subscribe_username" type="text" placeholder="kenat" value={ this.state.subscribe_username } onChange={ this.updateChange.bind(this) } />
                        <label>Mot de passe</label>
                        <input name="subscribe_password" type="password" placeholder="super_password" value={ this.state.subscribe_password } onChange={ this.updateChange.bind(this) } />
                        <label>E-Mail</label>
                        <input name="subscribe_mail" type="text" placeholder="maximail@exemple.com" value={ this.state.subscribe_mail } onChange={ this.updateChange.bind(this) } />
                        <button onClick={ this.subscribe.bind(this) }>Continuer</button>
                        <span onClick={ this.switch }>Déjà un compte ?</span>
                    </form>
                </div>
                <span>OR</span>
                <div className="alternatif">
                    <div>
                        <button onClick={ this.subscribe.bind(this) }>Continuer avec G</button>
                        <button onClick={ this.subscribe.bind(this) }>Continuer avec F</button>
                        <button onClick={ this.subscribe.bind(this) }>Continuer avec T</button>
                    </div>
                </div>
            </div>
        </div></a>
    }
}