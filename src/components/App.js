import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import LogoLarge from '../img/logo-large.svg'
import OpenReLogoLarge from '../img/openre-logo-white.svg'

class AppContainer extends React.Component {
  render () {
    return (
      <div className="main-wrapper home">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                    <form className="form-horizontal home-form" >
                        <div className="form-group">
                            <div className="col-xs-12 text-center">
                                <a href="" className="logo-container">
                                    <Image src={LogoLarge} width="370" alt="Logo"/>
                                </a>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-6">
                                <a href="" className="btn btn-base btn-home">Unlock with Scatter</a>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <a href="" className="btn btn-base btn-home">Create a New Account</a>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-8 col-md-9">
                                <input type="text" placeholder="Enter Private key" className="form-control input-home"/>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-3">
                                <a href="" className="btn btn-secondary btn-home">Unlock</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="fs-footer">
            <span className="badge badge-fs bold">v0.01</span> Part of the FeeSimple network.
            <span className="created-by">Crafted by <a href="" className="p-l-10"><Image src={OpenReLogoLarge} alt="logo" width="110"/></a></span>
        </div>
    </div>

    )
  }
}

function mapStateToProps ({ isLoading, eosClient }) {
  return { isLoading, eosClient }
}

export default withRouter(connect(mapStateToProps)(AppContainer))
